import { readdir } from "node:fs/promises";
import path from "node:path";

const publicDirectory = path.join(process.cwd(), "public");
const invalidFiles = [];
let jsonCount = 0;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(entryPath);
      continue;
    }

    const relativePath = path.relative(publicDirectory, entryPath).split(path.sep).join("/");

    if (path.extname(entry.name).toLowerCase() !== ".json") {
      invalidFiles.push(relativePath);
      continue;
    }

    jsonCount += 1;
  }
}

try {
  await walk(publicDirectory);
} catch (error) {
  if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
    console.log("No public directory found. Skipping validation.");
    process.exit(0);
  }

  throw error;
}

if (invalidFiles.length > 0) {
  console.error("Only JSON files are allowed under public/.");
  for (const filePath of invalidFiles) {
    console.error(`- ${filePath}`);
  }
  process.exit(1);
}

console.log(`Validated ${jsonCount} JSON file(s) under public/.`);
