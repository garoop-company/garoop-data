"use client";

import { useState, useDeferredValue, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DirectorySummary, PublicJsonFile } from "@/lib/public-catalog";
import { getFolderLabel, getFileLabel } from "@/lib/friendly-names";
import type { Locale } from "@/lib/friendly-names";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  locale: Locale;
};

// ─── Folder theme ─────────────────────────────────────────────────────────────

type FolderTheme = { icon: string; accent: string; badgeBg: string; badgeText: string };

const FOLDER_THEMES: Record<string, FolderTheme> = {
  "lesson-stories": { icon: "📚", accent: "#a78bfa", badgeBg: "bg-violet-100", badgeText: "text-violet-700" },
  data: { icon: "📊", accent: "#38bdf8", badgeBg: "bg-sky-100", badgeText: "text-sky-700" },
  "mission-stories": { icon: "🎯", accent: "#f97316", badgeBg: "bg-orange-100", badgeText: "text-orange-700" },
  "training-stories": { icon: "🏋️", accent: "#10b981", badgeBg: "bg-emerald-100", badgeText: "text-emerald-700" },
  master: { icon: "📋", accent: "#0ea5e9", badgeBg: "bg-sky-50", badgeText: "text-sky-600" },
  blog: { icon: "✍️", accent: "#f59e0b", badgeBg: "bg-amber-100", badgeText: "text-amber-700" },
  "garoop-tv": { icon: "🎬", accent: "#ef4444", badgeBg: "bg-red-100", badgeText: "text-red-600" },
  feeds: { icon: "📰", accent: "#8b5cf6", badgeBg: "bg-purple-100", badgeText: "text-purple-700" },
  articles: { icon: "📝", accent: "#ec4899", badgeBg: "bg-pink-100", badgeText: "text-pink-700" },
};

const DEFAULT_THEME: FolderTheme = {
  icon: "📁",
  accent: "#d75d8b",
  badgeBg: "bg-pink-50",
  badgeText: "text-pink-600",
};

function getFolderTheme(folderPath: string): FolderTheme {
  const topKey = folderPath.split("/")[0];
  return FOLDER_THEMES[topKey] ?? FOLDER_THEMES[folderPath] ?? DEFAULT_THEME;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 30;

// ─── Subcomponents ────────────────────────────────────────────────────────────

function CopyButton({
  urlPath,
  copyLabel,
  copiedLabel,
}: {
  urlPath: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(urlPath);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileTap={{ scale: 0.88 }}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
        copied
          ? "border-pink-300 bg-pink-400 text-white"
          : "border-white/80 bg-white/90 text-[var(--ink-soft)] hover:border-pink-200 hover:text-[var(--ink-strong)]"
      }`}
    >
      {copied ? `✓ ${copiedLabel}` : copyLabel}
    </motion.button>
  );
}

type PaginationProps = {
  total: number;
  page: number;
  pageSize: number;
  onPage: (p: number) => void;
  prevLabel: string;
  nextLabel: string;
};

function Pagination({ total, page, pageSize, onPage, prevLabel, nextLabel }: PaginationProps) {
  const pageCount = Math.ceil(total / pageSize);
  if (pageCount <= 1) return null;
  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, total);

  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/50 px-4 py-3">
      <span className="text-xs text-[var(--ink-faint)]">
        {start}–{end} / {total}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => onPage(page - 1)}
          className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--ink-soft)] transition disabled:opacity-30 hover:not-disabled:bg-white"
        >
          {prevLabel}
        </button>
        {/* Page pills: show max 7 */}
        {Array.from({ length: pageCount }, (_, i) => {
          const show =
            i === 0 ||
            i === pageCount - 1 ||
            Math.abs(i - page) <= 2;
          const ellipsisBefore = i === page - 3 && page - 3 > 1;
          const ellipsisAfter = i === page + 3 && page + 3 < pageCount - 2;
          if (!show && !ellipsisBefore && !ellipsisAfter) return null;
          if (ellipsisBefore || ellipsisAfter)
            return (
              <span key={`e-${i}`} className="px-1 text-xs text-[var(--ink-faint)]">
                …
              </span>
            );
          return (
            <button
              key={i}
              type="button"
              onClick={() => onPage(i)}
              className={`h-7 w-7 rounded-full text-xs font-semibold transition ${
                i === page
                  ? "bg-[var(--accent-strong)] text-white"
                  : "bg-white/80 text-[var(--ink-soft)] hover:bg-white"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          type="button"
          disabled={page === pageCount - 1}
          onClick={() => onPage(page + 1)}
          className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--ink-soft)] transition disabled:opacity-30 hover:not-disabled:bg-white"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

type FolderPanelProps = {
  folderPath: string;
  totalFiles: number;
  files: PublicJsonFile[];
  isOpen: boolean;
  onToggle: () => void;
  locale: Locale;
  copyLabel: string;
  copiedLabel: string;
  rootLabel: string;
};

function FolderPanel({
  folderPath,
  totalFiles,
  files,
  isOpen,
  onToggle,
  locale,
  copyLabel,
  copiedLabel,
}: FolderPanelProps) {
  const [page, setPage] = useState(0);
  const theme = getFolderTheme(folderPath);
  const friendlyLabel = getFolderLabel(folderPath, locale);
  const pageCount = Math.ceil(files.length / PAGE_SIZE);
  const pageFiles = files.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Reset page when file list changes (search filter)
  useEffect(() => {
    setPage(0);
  }, [files.length]);

  const prevLabel = locale === "zh" ? "上一页" : locale === "en" ? "Prev" : "前へ";
  const nextLabel = locale === "zh" ? "下一页" : locale === "en" ? "Next" : "次へ";
  const colName = locale === "zh" ? "名称" : locale === "en" ? "Name" : "なまえ";
  const colSize = locale === "zh" ? "大小" : locale === "en" ? "Size" : "サイズ";
  const colPath = locale === "zh" ? "路径" : locale === "en" ? "URL" : "URL";

  return (
    <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white/70 backdrop-blur shadow-[0_8px_32px_rgba(215,93,139,0.08)]">
      {/* Panel header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-white/60"
      >
        <span className="text-2xl leading-none">{theme.icon}</span>
        <div className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-[var(--ink-strong)]">
            {friendlyLabel}
          </span>
          <span className="block text-xs text-[var(--ink-faint)] font-mono mt-0.5">
            {folderPath || "/"}
          </span>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
        >
          {totalFiles}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="shrink-0 text-[var(--ink-faint)] text-sm"
        >
          ▼
        </motion.span>
      </button>

      {/* Animated body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-white/50">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/50 bg-white/40">
                      <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)]">
                        {colName}
                      </th>
                      <th className="hidden px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)] sm:table-cell">
                        {colPath}
                      </th>
                      <th className="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)]">
                        {colSize}
                      </th>
                      <th className="px-4 py-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {pageFiles.map((file, i) => {
                      const name = getFileLabel(file.relativePath, locale);
                      const isEven = i % 2 === 0;
                      return (
                        <tr
                          key={file.relativePath}
                          className={`border-b border-white/30 transition hover:bg-white/50 ${
                            isEven ? "bg-transparent" : "bg-white/20"
                          }`}
                        >
                          <td className="px-5 py-3">
                            <span className="block font-medium text-[var(--ink-strong)] leading-snug">
                              {name}
                            </span>
                            <span className="mt-0.5 block font-mono text-[11px] text-[var(--ink-faint)] sm:hidden truncate max-w-[200px]">
                              {file.urlPath}
                            </span>
                          </td>
                          <td className="hidden px-3 py-3 sm:table-cell">
                            <span className="font-mono text-xs text-[var(--ink-soft)] break-all">
                              {file.urlPath}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-right">
                            <span className="whitespace-nowrap text-xs text-[var(--ink-faint)]">
                              {file.prettySize}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <CopyButton
                              urlPath={file.urlPath}
                              copyLabel={copyLabel}
                              copiedLabel={copiedLabel}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pageCount > 1 && (
                <Pagination
                  total={files.length}
                  page={page}
                  pageSize={PAGE_SIZE}
                  onPage={setPage}
                  prevLabel={prevLabel}
                  nextLabel={nextLabel}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DatasetBrowser({
  files,
  directories,
  messages,
  locale,
}: DatasetBrowserProps) {
  const [query, setQuery] = useState("");
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  // Group all files by folderPath
  const filesByFolder = useMemo(() => {
    const map = new Map<string, PublicJsonFile[]>();
    for (const file of files) {
      const arr = map.get(file.folderPath) ?? [];
      arr.push(file);
      map.set(file.folderPath, arr);
    }
    return map;
  }, [files]);

  // Apply search filter
  const filtered = useMemo(() => {
    if (!deferredQuery) return filesByFolder;
    const result = new Map<string, PublicJsonFile[]>();
    for (const [folder, folderFiles] of filesByFolder) {
      const matches = folderFiles.filter((f) => {
        const label = getFileLabel(f.relativePath, locale).toLowerCase();
        return (
          f.relativePath.toLowerCase().includes(deferredQuery) ||
          label.includes(deferredQuery)
        );
      });
      if (matches.length > 0) result.set(folder, matches);
    }
    return result;
  }, [filesByFolder, deferredQuery, locale]);

  // Auto-open matching folders when searching
  useEffect(() => {
    if (deferredQuery) {
      setOpenFolders(new Set(filtered.keys()));
    }
  }, [deferredQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleFolder(fp: string) {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      next.has(fp) ? next.delete(fp) : next.add(fp);
      return next;
    });
  }

  // Sort directories: file count desc
  const sortedDirs = useMemo(
    () => [...directories].sort((a, b) => b.fileCount - a.fileCount),
    [directories],
  );

  const visibleDirs = sortedDirs.filter((d) => filtered.has(d.folderPath));
  const totalVisible = visibleDirs.reduce(
    (s, d) => s + (filtered.get(d.folderPath)?.length ?? 0),
    0,
  );

  const expandAll = locale === "zh" ? "全部展开" : locale === "en" ? "Expand all" : "すべて開く";
  const collapseAll = locale === "zh" ? "全部折叠" : locale === "en" ? "Collapse all" : "すべて閉じる";
  const countLabel =
    locale === "zh"
      ? `${totalVisible} 件`
      : locale === "en"
        ? `${totalVisible} files`
        : `${totalVisible} 件`;

  const allOpen = visibleDirs.every((d) => openFolders.has(d.folderPath));

  return (
    <section
      id="catalog"
      className="panel relative overflow-hidden px-5 py-6 sm:px-7 sm:py-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,230,238,0.45),transparent_28%),radial-gradient(circle_at_left_bottom,rgba(255,244,213,0.4),transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/60" />

      <div className="relative flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">{messages.eyebrow}</p>
            <h2 className="mt-1 whitespace-pre-line font-serif text-2xl leading-tight text-[var(--ink-strong)] sm:text-3xl">
              {messages.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
              {messages.description}
            </p>
          </div>

          {/* Search */}
          <label className="flex min-w-0 flex-col gap-1.5 text-sm text-[var(--ink-soft)] lg:w-[300px]">
            <span className="flex items-center gap-1.5">
              <span>🔍</span>
              {messages.searchLabel}
            </span>
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={messages.searchPlaceholder}
                className="w-full rounded-[20px] border border-white/70 bg-white/82 px-4 py-2.5 pr-9 text-sm text-[var(--ink-strong)] outline-none transition focus:border-[var(--accent)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,182,204,0.2)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--ink-faint)] hover:text-[var(--ink-soft)]"
                >
                  ✕
                </button>
              )}
            </div>
          </label>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-[var(--ink-faint)]">
            {countLabel}
          </span>
          {visibleDirs.length > 0 && (
            <button
              type="button"
              onClick={() =>
                allOpen
                  ? setOpenFolders(new Set())
                  : setOpenFolders(new Set(visibleDirs.map((d) => d.folderPath)))
              }
              className="rounded-full border border-white/70 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[var(--ink-soft)] transition hover:bg-white"
            >
              {allOpen ? collapseAll : expandAll}
            </button>
          )}
        </div>

        {/* Folder panels */}
        {visibleDirs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {visibleDirs.map((dir) => (
              <FolderPanel
                key={dir.folderPath}
                folderPath={dir.folderPath}
                totalFiles={dir.fileCount}
                files={filtered.get(dir.folderPath) ?? []}
                isOpen={openFolders.has(dir.folderPath)}
                onToggle={() => toggleFolder(dir.folderPath)}
                locale={locale}
                copyLabel={messages.copyLabel}
                copiedLabel={messages.copiedLabel}
                rootLabel={messages.rootLabel}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/80 bg-white/60 px-6 py-12 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 font-serif text-xl text-[var(--ink-strong)]">
              {messages.emptyTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
              {messages.emptyDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
