import Image from "next/image";
import Link from "next/link";
import { getPublicCatalog, getExploreStats } from "@/lib/public-catalog";
import { getTopFolderDisplay, getLessonTopicMeta } from "@/lib/friendly-names";
import type { Locale } from "@/lib/friendly-names";
import { DonutChart, DonutLegend } from "@/components/donut-chart";
import { BarChart } from "@/components/bar-chart";

type ExploreProps = {
  searchParams?: Promise<{ lang?: string | string[] }>;
};

function pickLocale(lang?: string | string[]): Locale {
  const v = Array.isArray(lang) ? lang[0] : lang;
  if (v === "en" || v === "zh" || v === "ja") return v;
  return "ja";
}

const DONUT_COLORS = [
  "#f9a8d4",
  "#a5b4fc",
  "#6ee7b7",
  "#fcd34d",
  "#f97316",
  "#60a5fa",
  "#e879f9",
  "#34d399",
  "#fb7185",
];

type Dict = {
  backLabel: string;
  badge: string;
  title: string;
  description: string;
  totalFiles: string;
  totalFolders: string;
  totalSize: string;
  donutTitle: string;
  donutSub: string;
  barTitle: string;
  barSub: string;
  unitFiles: string;
  unitTopics: string;
  noData: string;
  langLabel: string;
  characterAlt: string;
  footerBack: string;
};

const dicts: Record<Locale, Dict> = {
  ja: {
    backLabel: "← トップへ",
    badge: "Data Explorer",
    title: "Garoopの\nデータを\n探検しよう",
    description:
      "Garoopがどんなデータをつかって、どんなことをしているか、グラフで楽しく見てみよう。",
    totalFiles: "ファイルの合計",
    totalFolders: "カテゴリー数",
    totalSize: "データの大きさ",
    donutTitle: "データの種類ごとの内訳",
    donutSub: "どのカテゴリーのデータが多い？",
    barTitle: "レッスンのテーマ一覧",
    barSub: "どんなテーマのコンテンツがある？",
    unitFiles: "件",
    unitTopics: "テーマ",
    noData: "データがまだありません",
    langLabel: "ことば",
    characterAlt: "Garoopの案内キャラクター、がるちゃん",
    footerBack: "トップページへ戻る",
  },
  en: {
    backLabel: "← Back to top",
    badge: "Data Explorer",
    title: "Explore\nGaroop\nData",
    description:
      "See what kinds of data Garoop uses and how, in a fun visual way.",
    totalFiles: "Total files",
    totalFolders: "Categories",
    totalSize: "Data size",
    donutTitle: "Files by category",
    donutSub: "Which category has the most data?",
    barTitle: "Lesson themes",
    barSub: "What topics are covered in lessons?",
    unitFiles: "files",
    unitTopics: "topics",
    noData: "No data yet",
    langLabel: "Language",
    characterAlt: "Garuchan, the Garoop guide character",
    footerBack: "Back to top page",
  },
  zh: {
    backLabel: "← 返回首页",
    badge: "Data Explorer",
    title: "探索\nGaroop\n的数据",
    description: "通过图表直观了解Garoop使用了哪些数据，做了什么。",
    totalFiles: "文件总数",
    totalFolders: "分类数量",
    totalSize: "数据大小",
    donutTitle: "按类别划分的文件数",
    donutSub: "哪个类别的数据最多？",
    barTitle: "课程主题一览",
    barSub: "课程涵盖哪些主题？",
    unitFiles: "个文件",
    unitTopics: "个主题",
    noData: "暂无数据",
    langLabel: "语言",
    characterAlt: "Garoop 的引导角色 Garuchan",
    footerBack: "返回首页",
  },
};

const langOptions: Array<{ code: Locale; label: string }> = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default async function ExplorePage({ searchParams }: ExploreProps) {
  const resolved = await searchParams;
  const locale = pickLocale(resolved?.lang);
  const t = dicts[locale];

  const [catalog, stats] = await Promise.all([getPublicCatalog(), getExploreStats()]);
  const fmt = new Intl.NumberFormat(locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "ja-JP");

  // Build donut data (top 8 folders + "other")
  const MAX_SLICES = 8;
  const topSlices = stats.topFolderStats.slice(0, MAX_SLICES);
  const otherCount = stats.topFolderStats
    .slice(MAX_SLICES)
    .reduce((s, f) => s + f.fileCount, 0);

  const donutData = [
    ...topSlices.map((f, i) => {
      const meta = getTopFolderDisplay(f.folder, locale);
      return {
        label: meta.label,
        value: f.fileCount,
        color: DONUT_COLORS[i % DONUT_COLORS.length],
        emoji: meta.emoji,
      };
    }),
    ...(otherCount > 0
      ? [{ label: locale === "ja" ? "その他" : locale === "en" ? "Other" : "其他", value: otherCount, color: "#e2e8f0", emoji: "📁" }]
      : []),
  ];

  // Build bar chart data
  const barData = stats.lessonTopicStats.map((s) => {
    const meta = getLessonTopicMeta(s.topic);
    return {
      label: meta[locale],
      value: s.fileCount,
      emoji: meta.emoji,
    };
  });

  return (
    <main className="relative isolate overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-pink-200/50 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/?lang=${locale}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-semibold text-[var(--ink-soft)] shadow-[0_8px_24px_rgba(215,93,139,0.12)] transition hover:bg-white"
          >
            {t.backLabel}
          </Link>

          <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-2 shadow-[0_8px_20px_rgba(215,93,139,0.1)]">
            <span className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
              {t.langLabel}
            </span>
            {langOptions.map((opt) => (
              <Link
                key={opt.code}
                href={`/explore?lang=${opt.code}`}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  locale === opt.code
                    ? "bg-[var(--accent-strong)] text-white shadow-[0_8px_20px_rgba(215,93,139,0.22)]"
                    : "bg-white/80 text-[var(--ink-soft)] hover:bg-white"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero */}
        <section className="panel shimmer-card overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="space-y-5 lg:flex-1">
              <div className="inline-flex rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ink-faint)]">
                {t.badge}
              </div>
              <h1 className="whitespace-pre-line font-serif text-4xl leading-tight text-[var(--ink-strong)] sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="max-w-xl text-base leading-7 text-[var(--ink-soft)]">
                {t.description}
              </p>

              {/* Stat tiles */}
              <div className="grid grid-cols-3 gap-3">
                <div className="stat-tile stat-tile-pink">
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--ink-faint)]">{t.totalFiles}</span>
                  <strong className="mt-2 block text-2xl font-bold text-[var(--ink-strong)]">
                    {fmt.format(catalog.files.length)}
                  </strong>
                </div>
                <div className="stat-tile stat-tile-cream">
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--ink-faint)]">{t.totalFolders}</span>
                  <strong className="mt-2 block text-2xl font-bold text-[var(--ink-strong)]">
                    {fmt.format(stats.topFolderStats.length)}
                  </strong>
                </div>
                <div className="stat-tile stat-tile-lilac">
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--ink-faint)]">{t.totalSize}</span>
                  <strong className="mt-2 block text-xl font-bold text-[var(--ink-strong)]">
                    {formatBytes(catalog.totalBytes)}
                  </strong>
                </div>
              </div>
            </div>

            {/* Character */}
            <div className="relative mx-auto flex w-[220px] justify-center lg:w-[260px]">
              <div className="character-glow absolute inset-x-6 inset-y-6 rounded-full" />
              <div className="sparkle-dot left-[4%] top-[16%]" />
              <div className="sparkle-dot sparkle-dot-delayed right-[6%] top-[8%]" />
              <Image
                src="/garuchan_stand.webp"
                alt={t.characterAlt}
                width={680}
                height={980}
                className="character-bounce relative z-10 h-auto w-[220px] drop-shadow-[0_20px_40px_rgba(215,93,139,0.28)]"
              />
            </div>
          </div>
        </section>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Donut chart */}
          <section className="panel relative overflow-hidden px-6 py-7 sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
            <p className="eyebrow">Data Explorer</p>
            <h2 className="mt-2 font-serif text-2xl text-[var(--ink-strong)]">{t.donutTitle}</h2>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{t.donutSub}</p>

            {donutData.length > 0 ? (
              <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                <div className="shrink-0">
                  <DonutChart
                    data={donutData}
                    size={200}
                    strokeWidth={36}
                    centerValue={fmt.format(catalog.files.length)}
                    centerLabel={t.unitFiles}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <DonutLegend
                    items={donutData}
                    total={catalog.files.length}
                  />
                </div>
              </div>
            ) : (
              <p className="mt-6 text-sm text-[var(--ink-faint)]">{t.noData}</p>
            )}
          </section>

          {/* Bar chart */}
          <section className="panel relative overflow-hidden px-6 py-7 sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
            <p className="eyebrow">Lesson Stories</p>
            <h2 className="mt-2 font-serif text-2xl text-[var(--ink-strong)]">{t.barTitle}</h2>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{t.barSub}</p>

            {barData.length > 0 ? (
              <div className="mt-6">
                <BarChart data={barData} />
                <p className="mt-4 text-xs text-[var(--ink-faint)]">
                  {fmt.format(stats.lessonTopicStats.length)} {t.unitTopics}
                </p>
              </div>
            ) : (
              <p className="mt-6 text-sm text-[var(--ink-faint)]">{t.noData}</p>
            )}
          </section>
        </div>

        {/* Category cards */}
        <section className="panel relative overflow-hidden px-6 py-7 sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
          <p className="eyebrow">Categories</p>
          <h2 className="mt-2 font-serif text-2xl text-[var(--ink-strong)]">
            {locale === "ja" ? "カテゴリー別ファイル数" : locale === "en" ? "Files by category" : "各类别文件数"}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {stats.topFolderStats.map((f, i) => {
              const meta = getTopFolderDisplay(f.folder, locale);
              return (
                <Link
                  key={f.folder}
                  href={`/?lang=${locale}#catalog`}
                  className="group relative overflow-hidden rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_14px_40px_rgba(215,93,139,0.08)] transition hover:shadow-[0_18px_48px_rgba(215,93,139,0.16)] hover:-translate-y-1"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-2xl leading-none">{meta.emoji}</span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[var(--ink-strong)]">{meta.label}</p>
                      {meta.description && (
                        <p className="mt-0.5 truncate text-xs text-[var(--ink-soft)]">{meta.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-[var(--ink-strong)]">
                      {fmt.format(f.fileCount)}
                    </span>
                    <span className="text-xs text-[var(--ink-faint)]">{t.unitFiles}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Footer nav */}
        <div className="flex justify-center pb-4">
          <Link
            href={`/?lang=${locale}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-6 py-3 text-sm font-semibold text-[var(--ink-soft)] shadow-[0_12px_30px_rgba(215,93,139,0.12)] transition hover:bg-white hover:shadow-[0_14px_36px_rgba(215,93,139,0.18)]"
          >
            ← {t.footerBack}
          </Link>
        </div>
      </div>
    </main>
  );
}
