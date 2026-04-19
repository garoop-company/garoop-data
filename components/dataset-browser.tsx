"use client";

import { useDeferredValue, useState } from "react";
import type { DirectorySummary, PublicJsonFile } from "@/lib/public-catalog";

type DatasetBrowserMessages = {
  eyebrow: string;
  title: string;
  description: string;
  searchLabel: string;
  searchPlaceholder: string;
  allLabel: string;
  copyLabel: string;
  copiedLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  rootLabel: string;
};

type DatasetBrowserProps = {
  files: PublicJsonFile[];
  directories: DirectorySummary[];
  messages: DatasetBrowserMessages;
};

export function DatasetBrowser({
  files,
  directories,
  messages,
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,230,238,0.55),transparent_30%),radial-gradient(circle_at_left_bottom,rgba(255,244,213,0.5),transparent_26%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="eyebrow">{messages.eyebrow}</p>
            <h2 className="font-serif whitespace-pre-line text-3xl leading-tight text-[var(--ink-strong)]">
              {messages.title}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[var(--ink-soft)] sm:text-base">
              {messages.description}
            </p>
          </div>

          <label className="flex min-w-0 flex-col gap-2 text-sm text-[var(--ink-soft)] lg:w-[320px]">
            {messages.searchLabel}
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={messages.searchPlaceholder}
              className="rounded-[22px] border border-white/70 bg-white/82 px-4 py-3 text-sm text-[var(--ink-strong)] outline-none transition focus:border-[var(--accent)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,182,204,0.18)]"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFolder("all")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeFolder === "all"
                ? "bg-[var(--accent-strong)] text-white shadow-[0_14px_28px_rgba(215,93,139,0.22)]"
                : "bg-white/84 text-[var(--ink-soft)] hover:bg-white"
            }`}
          >
            {messages.allLabel}
          </button>
          {directories.map((directory) => (
            <button
              key={directory.folderPath || "public"}
              type="button"
              onClick={() => setActiveFolder(directory.folderPath)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeFolder === directory.folderPath
                  ? "bg-[var(--accent)] text-[var(--ink-strong)] shadow-[0_14px_28px_rgba(255,182,204,0.32)]"
                  : "bg-white/84 text-[var(--ink-soft)] hover:bg-white"
              }`}
            >
              {directory.label}
              <span className="ml-2 text-xs opacity-70">{directory.fileCount}</span>
            </button>
          ))}
        </div>

        {visibleFiles.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleFiles.map((file, index) => (
              <article
                key={file.relativePath}
                className="group animate-enter rounded-[30px] border border-white/70 bg-white/86 p-5 shadow-[0_24px_60px_rgba(215,93,139,0.1)] backdrop-blur"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-[var(--ink-soft)]">
                        {file.folderPath || messages.rootLabel}
                      </span>
                      <span className="rounded-full bg-[rgba(255,248,223,0.95)] px-3 py-1 text-[var(--ink-strong)]">
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
                    className="rounded-full border border-white/80 bg-[linear-gradient(180deg,rgba(255,246,249,0.95),rgba(255,255,255,0.92))] px-3 py-2 text-xs font-semibold text-[var(--ink-soft)] transition hover:border-[var(--accent)] hover:text-[var(--ink-strong)]"
                  >
                    {copiedPath === file.urlPath ? messages.copiedLabel : messages.copyLabel}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] border border-dashed border-white/80 bg-white/70 px-6 py-10 text-center">
            <p className="font-serif text-2xl text-[var(--ink-strong)]">{messages.emptyTitle}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)] sm:text-base">
              {messages.emptyDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
