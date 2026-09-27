import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const runsRoot = path.join(root, "hatch-pet-runs");
const publicRoot = path.join(root, "public", "hatch-pets");

const atlas = {
  columns: 8,
  rows: 9,
  cellWidth: 192,
  cellHeight: 208,
  width: 1536,
  height: 1872,
};

const rowPurposes = {
  idle: "calm resting, breathing, and blinking loop",
  "running-right": "rightward drag movement loop",
  "running-left": "leftward drag movement loop",
  waving: "greeting or attention gesture",
  jumping: "hover or playful jump",
  failed: "blocked, failed, or cancelled reaction",
  waiting: "waiting for approval, help, or user input",
  running: "active task work or processing",
  review: "ready or completed output review",
};

// 小さく表示する用途（グラフのアイコンなど）の軽量スプライト。
// 元のセル 192x208 を 128x139 に縮める（64px 表示なら Retina でもくっきり）。
// 並びは元と同じなので、pet.json の atlas・rows をそのまま使え、CSS の background-size も元の寸法で指定すればよい。
// 元の約 2MB → 約 300KB。
const miniCell = { width: 128, height: 139 };
const miniFileName = "spritesheet-mini.webp";

async function writeMiniSpritesheet(source, destination, petAtlas) {
  const width = petAtlas.columns * miniCell.width;
  const height = petAtlas.rows * miniCell.height;
  await sharp(source)
    .resize(width, height, { fit: "fill", kernel: "lanczos3" })
    .webp({ quality: 75, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(destination);
}

function toPublicPath(...parts) {
  return `/${path.posix.join("hatch-pets", ...parts)}`;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkDirectories(directory) {
  const result = [];
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const entryPath = path.join(directory, entry.name);
    result.push(entryPath);
    result.push(...await walkDirectories(entryPath));
  }

  return result;
}

function rowsFromValidation(validation) {
  const grouped = new Map();

  for (const cell of validation.cells ?? []) {
    if (!cell.used) {
      continue;
    }

    const current = grouped.get(cell.state) ?? {
      state: cell.state,
      row: cell.row,
      frames: 0,
      purpose: rowPurposes[cell.state] ?? "",
    };

    current.frames = Math.max(current.frames, cell.column + 1);
    grouped.set(cell.state, current);
  }

  return Array.from(grouped.values()).sort((left, right) => left.row - right.row);
}

function normalizePetRequest(request, id, validation) {
  const sourceAtlas = request.atlas ?? {};
  const sourceRows = request.rows ?? [];
  const description = cleanDescription(request.description ?? "");
  const japaneseName = description.includes(":") ? description.split(":")[0] : undefined;

  return {
    id,
    displayName: request.displayName ?? request.display_name ?? id,
    japaneseName,
    description,
    spritesheetPath: "spritesheet.webp",
    spritesheetUrl: toPublicPath(id, "spritesheet.webp"),
    contactSheetPath: undefined,
    contactSheetUrl: undefined,
    validationPath: "validation.json",
    validationUrl: toPublicPath(id, "validation.json"),
    atlas: {
      columns: sourceAtlas.columns ?? atlas.columns,
      rows: sourceAtlas.rows ?? atlas.rows,
      cellWidth: sourceAtlas.cell_width ?? sourceAtlas.cellWidth ?? atlas.cellWidth,
      cellHeight: sourceAtlas.cell_height ?? sourceAtlas.cellHeight ?? atlas.cellHeight,
      width: sourceAtlas.width ?? validation.width ?? atlas.width,
      height: sourceAtlas.height ?? validation.height ?? atlas.height,
    },
    rows: sourceRows.map((row) => ({
      state: row.state,
      row: row.row,
      frames: row.frames,
      purpose: row.purpose ?? rowPurposes[row.state] ?? "",
    })),
  };
}

function cleanDescription(description) {
  return description.replace(/([。！？])\.+$/u, "$1").trim();
}

async function collectPublishablePets() {
  const directories = await walkDirectories(runsRoot);
  const pets = [];

  for (const directory of directories) {
    const id = path.basename(directory);
    const spritesheetPath = path.join(directory, "final", "spritesheet.webp");
    const validationPath = path.join(directory, "final", "validation.json");

    if (!await pathExists(spritesheetPath) || !await pathExists(validationPath)) {
      continue;
    }

    const validation = await readJson(validationPath);
    if (!validation.ok) {
      continue;
    }

    const requestPath = path.join(directory, "pet_request.json");
    const finalPetPath = path.join(directory, "final", "pet.json");
    let pet;

    if (await pathExists(requestPath)) {
      pet = normalizePetRequest(await readJson(requestPath), id, validation);
    } else if (await pathExists(finalPetPath)) {
      pet = await readJson(finalPetPath);
    } else {
      pet = {
        id,
        displayName: id,
        description: "",
        spritesheetPath: "spritesheet.webp",
        spritesheetUrl: toPublicPath(id, "spritesheet.webp"),
      };
    }

    pet.id = pet.id ?? id;
    pet.description = cleanDescription(pet.description ?? "");
    pet.spritesheetPath = "spritesheet.webp";
    pet.spritesheetUrl = toPublicPath(id, "spritesheet.webp");
    pet.validationPath = "validation.json";
    pet.validationUrl = toPublicPath(id, "validation.json");
    pet.atlas = pet.atlas ?? {
      columns: atlas.columns,
      rows: atlas.rows,
      cellWidth: atlas.cellWidth,
      cellHeight: atlas.cellHeight,
      width: validation.width ?? atlas.width,
      height: validation.height ?? atlas.height,
    };
    pet.rows = pet.rows?.length ? pet.rows : rowsFromValidation(validation);

    const contactSheetWebp = path.join(directory, "qa", "contact-sheet.webp");
    const contactSheetPng = path.join(directory, "qa", "contact-sheet.png");
    const contactSheetPath = await pathExists(contactSheetWebp) ? contactSheetWebp : await pathExists(contactSheetPng) ? contactSheetPng : undefined;

    if (contactSheetPath) {
      const fileName = `contact-sheet${path.extname(contactSheetPath)}`;
      pet.contactSheetPath = fileName;
      pet.contactSheetUrl = toPublicPath(id, fileName);
    }

    pets.push({
      id,
      sourceDirectory: path.relative(root, directory).split(path.sep).join("/"),
      spritesheetPath,
      validationPath,
      contactSheetPath,
      pet,
    });
  }

  pets.sort((left, right) => left.id.localeCompare(right.id));
  return pets;
}

async function main() {
  const pets = await collectPublishablePets();

  await rm(publicRoot, { recursive: true, force: true });
  await mkdir(publicRoot, { recursive: true });

  const index = {
    count: pets.length,
    pets: [],
  };

  for (const item of pets) {
    const destination = path.join(publicRoot, item.id);
    await mkdir(destination, { recursive: true });

    await cp(item.spritesheetPath, path.join(destination, "spritesheet.webp"));
    await writeMiniSpritesheet(item.spritesheetPath, path.join(destination, miniFileName), item.pet.atlas);
    await cp(item.validationPath, path.join(destination, "validation.json"));

    if (item.contactSheetPath) {
      await cp(item.contactSheetPath, path.join(destination, item.pet.contactSheetPath));
    }

    const publicPet = {
      ...item.pet,
      spritesheetMiniPath: miniFileName,
      spritesheetMiniUrl: toPublicPath(item.id, miniFileName),
      sourceRun: item.sourceDirectory,
    };

    await writeFile(path.join(destination, "pet.json"), `${JSON.stringify(publicPet, null, 2)}\n`);

    index.pets.push({
      id: publicPet.id,
      displayName: publicPet.displayName,
      japaneseName: publicPet.japaneseName,
      description: publicPet.description,
      petUrl: toPublicPath(item.id, "pet.json"),
      spritesheetUrl: publicPet.spritesheetUrl,
      spritesheetMiniUrl: publicPet.spritesheetMiniUrl,
      contactSheetUrl: publicPet.contactSheetUrl,
      validationUrl: publicPet.validationUrl,
      sourceRun: item.sourceDirectory,
    });
  }

  await writeFile(path.join(publicRoot, "index.json"), `${JSON.stringify(index, null, 2)}\n`);
  console.log(`Published ${pets.length} hatch pets to ${path.relative(root, publicRoot)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
