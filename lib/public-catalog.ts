import { readdir, stat } from "node:fs/promises";
import path from "node:path";

export type TopFolderStat = {
  folder: string;
  fileCount: number;
  bytes: number;
};

export type LessonTopicStat = {
  topic: string;
  fileCount: number;
};

export type ExploreStats = {
  topFolderStats: TopFolderStat[];
  lessonTopicStats: LessonTopicStat[];
};

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
) {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walkDirectory(entryPath, root, files);
      continue;
    }

    const relativePath = path.relative(root, entryPath).split(path.sep).join("/");

    if (path.extname(entry.name).toLowerCase() !== ".json") {
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

  try {
    await walkDirectory(publicDirectory, publicDirectory, files);
  } catch {
    return {
      files: [],
      directories: [],
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
    totalBytes,
  };
}

export async function getExploreStats(): Promise<ExploreStats> {
  const catalog = await getPublicCatalog();

  // Aggregate by top-level folder
  const folderMap = new Map<string, { fileCount: number; bytes: number }>();
  for (const file of catalog.files) {
    const topFolder = file.folderPath.split("/")[0] || "";
    const current = folderMap.get(topFolder) ?? { fileCount: 0, bytes: 0 };
    folderMap.set(topFolder, { fileCount: current.fileCount + 1, bytes: current.bytes + file.bytes });
  }

  const topFolderStats = Array.from(folderMap.entries())
    .map(([folder, s]) => ({ folder, ...s }))
    .sort((a, b) => b.fileCount - a.fileCount);

  // Lesson topic stats (aggregate across all language sub-folders)
  const topicMap = new Map<string, number>();
  for (const file of catalog.files) {
    if (!file.folderPath.startsWith("lesson-stories")) continue;
    const baseName = file.fileName.replace(".json", "").replace(/_\d+$/, "");
    topicMap.set(baseName, (topicMap.get(baseName) ?? 0) + 1);
  }

  const lessonTopicStats = Array.from(topicMap.entries())
    .map(([topic, fileCount]) => ({ topic, fileCount }))
    .filter(({ topic }) => !["vi", "en", "ja", "zh", "id", "ne"].includes(topic))
    .sort((a, b) => b.fileCount - a.fileCount)
    .slice(0, 16);

  return { topFolderStats, lessonTopicStats };
}
