"use client";

import { useDeferredValue, useState } from "react";
import type { DirectorySummary, PublicJsonFile } from "@/lib/public-catalog";

type DatasetBrowserProps = {
  files: PublicJsonFile[];
  directories: DirectorySummary[];
  invalidFiles: string[];
};

export function DatasetBrowser({
  files,
  directories,
  invalidFiles,
}: DatasetBrowserProps) {
  const [query, setQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const visibleFiles = files.filter((file) => {
    const matchesFolder = activeFolder === "all" || file.folderPath === activeFolder;
    const haystack = `${file.relativePath} ${file.fileName}`.toLowerCase();
    const matchesQuery = deferredQuery.length === 0 || haystack.includes(deferredQuery);
    return matchesFolder && matchesQuery;
  });

  async function handleCopy(urlPath: string) {
    try {
      await navigator.clipboard.writeText(urlPath);
      setCopiedPath(urlPath);
      window.setTimeout(() => setCopiedPath((current) => (current === urlPath ? null : current)), 1400);
    } catch {
      setCopiedPath(null);
    }
  }

  return (
    <section className="panel relative overflow-hidden px-5 py-5 sm:px-7 sm:py-7">
      <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="eyebrow">Published Dataset Catalog</p>
            <h2 className="font-serif text-3xl leading-tight text-[var(--ink-strong)]">
              `public/` 配下のJSONをそのまま公開
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[var(--ink-soft)] sm:text-base">
              フォルダを増やすだけでURL階層が増えます。トップページでは公開済みJSONを検索でき、
              運用ミスになりやすい非JSONファイルも検知します。
            </p>
          </div>

          <label className="flex min-w-0 flex-col gap-2 text-sm text-[var(--ink-soft)] lg:w-[320px]">
            Search path
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="company, feeds, master..."
              className="rounded-2xl border border-white/60 bg-white/75 px-4 py-3 text-sm text-[var(--ink-strong)] outline-none transition focus:border-[var(--accent)] focus:bg-white"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFolder("all")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeFolder === "all"
                ? "bg-[var(--ink-strong)] text-white shadow-lg shadow-slate-900/15"
                : "bg-white/80 text-[var(--ink-soft)] hover:bg-white"
            }`}
          >
            All
          </button>
          {directories.map((directory) => (
            <button
              key={directory.folderPath || "public"}
              type="button"
              onClick={() => setActiveFolder(directory.folderPath)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeFolder === directory.folderPath
                  ? "bg-[var(--accent)] text-[var(--ink-strong)] shadow-lg shadow-cyan-500/20"
                  : "bg-white/80 text-[var(--ink-soft)] hover:bg-white"
              }`}
            >
              {directory.label}
              <span className="ml-2 text-xs opacity-70">{directory.fileCount}</span>
            </button>
          ))}
        </div>

        {invalidFiles.length > 0 ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50/95 px-5 py-4 text-sm text-rose-900">
            <p className="font-semibold">`public/` にJSON以外のファイルがあります</p>
            <p className="mt-1 text-rose-800/80">
              `npm run dev` と `npm run build` は失敗します。対象:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {invalidFiles.map((filePath) => (
                <span
                  key={filePath}
                  className="rounded-full bg-white px-3 py-1 font-mono text-xs text-rose-900"
                >
                  {filePath}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {visibleFiles.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleFiles.map((file, index) => (
              <article
                key={file.relativePath}
                className="group animate-enter rounded-[28px] border border-white/60 bg-white/82 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-[var(--ink-soft)]">
                        {file.folderPath || "public root"}
                      </span>
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-900">
                        {file.prettySize}
                      </span>
                    </div>

                    <div>
                      <h3 className="truncate text-lg font-semibold text-[var(--ink-strong)]">
                        {file.fileName}
                      </h3>
                      <p className="mt-1 break-all font-mono text-sm text-[var(--ink-soft)]">
                        {file.urlPath}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(file.urlPath)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[var(--ink-soft)] transition hover:border-[var(--accent)] hover:text-[var(--ink-strong)]"
                  >
                    {copiedPath === file.urlPath ? "Copied" : "Copy URL"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/80 bg-white/65 px-6 py-10 text-center">
            <p className="font-serif text-2xl text-[var(--ink-strong)]">まだ公開JSONがありません</p>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)] sm:text-base">
              `public/` 配下に `*.json` を追加すると、ここに自動で表示されます。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
