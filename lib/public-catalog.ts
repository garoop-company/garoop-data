import { readdir, stat } from "node:fs/promises";
import path from "node:path";

export type PublicJsonFile = {
  relativePath: string;
  urlPath: string;
  folderPath: string;
  fileName: string;
  bytes: number;
  prettySize: string;
};

export type DirectorySummary = {
  folderPath: string;
  label: string;
  fileCount: number;
};

export type PublicCatalog = {
  files: PublicJsonFile[];
  directories: DirectorySummary[];
  invalidFiles: string[];
  totalBytes: number;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function walkDirectory(
  directory: string,
  root: string,
  files: PublicJsonFile[],
  invalidFiles: string[],
) {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walkDirectory(entryPath, root, files, invalidFiles);
      continue;
    }

    const relativePath = path.relative(root, entryPath).split(path.sep).join("/");

    if (path.extname(entry.name).toLowerCase() !== ".json") {
      invalidFiles.push(relativePath);
      continue;
    }

    const fileStat = await stat(entryPath);
    const folderPath = path.posix.dirname(relativePath) === "." ? "" : path.posix.dirname(relativePath);

    files.push({
      relativePath,
      urlPath: `/${relativePath}`,
      folderPath,
      fileName: path.basename(relativePath),
      bytes: fileStat.size,
      prettySize: formatBytes(fileStat.size),
    });
  }
}

export async function getPublicCatalog(): Promise<PublicCatalog> {
  const publicDirectory = path.join(process.cwd(), "public");
  const files: PublicJsonFile[] = [];
  const invalidFiles: string[] = [];

  try {
    await walkDirectory(publicDirectory, publicDirectory, files, invalidFiles);
  } catch {
    return {
      files: [],
      directories: [],
      invalidFiles: [],
      totalBytes: 0,
    };
  }

  files.sort((left, right) => left.relativePath.localeCompare(right.relativePath));

  const directoryCounts = new Map<string, number>();

  for (const file of files) {
    const key = file.folderPath;
    directoryCounts.set(key, (directoryCounts.get(key) ?? 0) + 1);
  }

  const directories = Array.from(directoryCounts.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([folderPath, fileCount]) => ({
      folderPath,
      label: folderPath || "public",
      fileCount,
    }));

  const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);

  return {
    files,
    directories,
    invalidFiles,
    totalBytes,
  };
}
