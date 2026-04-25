import Image from "next/image";
import Link from "next/link";
import { DatasetBrowser } from "@/components/dataset-browser";
import { getPublicCatalog } from "@/lib/public-catalog";
import type { Locale } from "@/lib/friendly-names";

type HomeProps = {
  searchParams?: Promise<{
    lang?: string | string[];
  }>;
};

type CatalogMessages = {
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

type Dictionary = {
  lang: string;
  badge: string;
  bubbleBadge: string;
  title: string;
  description: string;
  heroMessageTitle: string;
  heroMessageBody: string;
  heroExampleLabel: string;
  heroExamplePath: string;
  heroExampleResult: string;
  highlights: string[];
  stats: {
    jsonFiles: string;
    folders: string;
    payload: string;
  };
  steps: Array<{
    title: string;
    body: string;
  }>;
  whyEyebrow: string;
  whyCards: Array<{
    title: string;
    body: string;
  }>;
  memoEyebrow: string;
  memoCards: Array<{
    title: string;
    body: string;
  }>;
  languageLabel: string;
  characterAlt: string;
  catalog: CatalogMessages;
  exploreCard: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  ja: {
    lang: "ja",
    badge: "Garuchan's Guide",
    bubbleBadge: "がるちゃんのひとこと",
    title: "がるちゃんと いっしょに、\nデータの ばしょを\nすぐ 見つけよう。",
    description:
      "ここは Garoop のデータを みつけるためのページです。`public/` にファイルを 入れると、みるための アドレスが できて、このページでも さがしやすく なります。",
    heroMessageTitle: "JSONは、コンピューターが 読みやすい データのメモだよ。",
    heroMessageBody:
      "どこに置けばいいか、どうやって見るかを、このページで やさしく 案内します。",
    heroExampleLabel: "たとえば",
    heroExamplePath: "public/master/company.json",
    heroExampleResult: "/master/company.json で見られるよ",
    highlights: [
      "どのJSONがあるか すぐわかる",
      "フォルダごとに きれいに整理できる",
      "画像や資料も そのまま見られる",
    ],
    stats: {
      jsonFiles: "JSONのかず",
      folders: "フォルダのかず",
      payload: "データのおおきさ",
    },
    steps: [
      {
        title: "1. ファイルを入れる",
        body: "`public/` の中に、JSONファイルを入れます。",
      },
      {
        title: "2. アドレスができる",
        body: "入れた場所と同じ形で、見るためのアドレスができます。",
      },
      {
        title: "3. このページでさがす",
        body: "公開中のJSONを一覧で見て、使いたいものをすぐ見つけられます。",
      },
    ],
    whyEyebrow: "このページで できること",
    whyCards: [
      {
        title: "しまう場所が わかりやすい",
        body: "フォルダをつくって入れるだけなので、どこに何があるか見失いにくいです。",
      },
      {
        title: "はじめてでも 迷いにくい",
        body: "トップページに使い方が書いてあるので、見に来た人が困りません。",
      },
      {
        title: "リンクを そのまま使える",
        body: "ファイルを置くと、そのまま固定のアドレスで見られます。",
      },
    ],
    memoEyebrow: "かんたんメモ",
    memoCards: [
      {
        title: "JSONを置く場所",
        body: "public/<folder>/<name>.json",
      },
      {
        title: "見るためのアドレス",
        body: "/<folder>/<name>.json",
      },
      {
        title: "画像や資料もOK",
        body: "`public/` に入れた画像や資料も、そのまま表示できます。",
      },
    ],
    languageLabel: "ことば",
    characterAlt: "Garoopの案内キャラクター、がるちゃん",
    catalog: {
      eyebrow: "こうかいちゅうのJSON",
      title: "公開しているデータを\nここで さがせるよ。",
      description:
        "名前でさがしたり、カテゴリーでしぼったりできます。見つけたら、アドレスをコピーして使えます。",
      searchLabel: "なまえでさがす",
      searchPlaceholder: "会社, レッスン, スケジュール...",
      allLabel: "ぜんぶ",
      copyLabel: "コピー",
      copiedLabel: "コピーしたよ",
      emptyTitle: "まだJSONがないよ",
      emptyDescription: "`public/` に `*.json` を入れると、ここに出てきます。",
      rootLabel: "トップレベル",
    },
    exploreCard: {
      eyebrow: "Data Explorer",
      title: "グラフで見てみよう",
      body: "Garoopのデータをグラフやチャートで楽しく確認できます。どんなテーマが多い？どのカテゴリーが大きい？",
      cta: "グラフページへ ✨",
    },
  },
  en: {
    lang: "en",
    badge: "Garuchan's Guide",
    bubbleBadge: "Garuchan says",
    title: "Find your data\nwith Garuchan,\nright away.",
    description:
      "This is a friendly guide page for Garoop data. When you put a file inside `public/`, it gets an address you can open, and this page helps everyone find it easily.",
    heroMessageTitle: "JSON is a small data note that computers can read easily.",
    heroMessageBody:
      "This page shows where to put it and how to open it, using short and simple words.",
    heroExampleLabel: "Example",
    heroExamplePath: "public/master/company.json",
    heroExampleResult: "You can open it at /master/company.json",
    highlights: [
      "See all JSON files quickly",
      "Keep files tidy by folder",
      "Images and docs can stay public too",
    ],
    stats: {
      jsonFiles: "JSON files",
      folders: "Folders",
      payload: "Data size",
    },
    steps: [
      {
        title: "1. Put in a file",
        body: "Place your JSON file inside the `public/` folder.",
      },
      {
        title: "2. It gets an address",
        body: "The file path becomes the web address you can open.",
      },
      {
        title: "3. Find it here",
        body: "This page lists your JSON files so people can find them fast.",
      },
    ],
    whyEyebrow: "What this page helps with",
    whyCards: [
      {
        title: "Easy place to organize",
        body: "Folders make it easy to see where each file belongs.",
      },
      {
        title: "Easy for first-time users",
        body: "The top page explains what to do, so new visitors do not feel lost.",
      },
      {
        title: "Simple links",
        body: "Once a file is added, it keeps a simple fixed address.",
      },
    ],
    memoEyebrow: "Quick note",
    memoCards: [
      {
        title: "Where to put JSON",
        body: "public/<folder>/<name>.json",
      },
      {
        title: "Where to open it",
        body: "/<folder>/<name>.json",
      },
      {
        title: "Images and docs too",
        body: "Images and documents inside `public/` can also be opened directly.",
      },
    ],
    languageLabel: "Language",
    characterAlt: "Garuchan, the Garoop guide character",
    catalog: {
      eyebrow: "Published Data",
      title: "Browse and search\nshared data here.",
      description:
        "Search by name or filter by category. Copy the link and use it anywhere.",
      searchLabel: "Search by name",
      searchPlaceholder: "company, lesson, schedule...",
      allLabel: "All",
      copyLabel: "Copy link",
      copiedLabel: "Copied",
      emptyTitle: "No files yet",
      emptyDescription: "Add a `*.json` file inside `public/` and it will show up here.",
      rootLabel: "Top level",
    },
    exploreCard: {
      eyebrow: "Data Explorer",
      title: "View as charts",
      body: "See Garoop's data visually — which categories have the most files? What lesson topics are covered?",
      cta: "Open explorer ✨",
    },
  },
  zh: {
    lang: "zh-CN",
    badge: "Garuchan's Guide",
    bubbleBadge: "Garuchan 提示",
    title: "和 Garuchan 一起，\n马上找到\n想看的数据。",
    description:
      "这里是 Garoop 数据的说明页面。把文件放进 `public/` 以后，就会得到可以打开的地址，这个页面也会帮大家更容易找到它。",
    heroMessageTitle: "JSON 就像一张让电脑容易读懂的数据小纸条。",
    heroMessageBody: "这个页面会用简单的话说明文件该放哪里、要怎么打开。",
    heroExampleLabel: "例子",
    heroExamplePath: "public/master/company.json",
    heroExampleResult: "可以在 /master/company.json 打开",
    highlights: [
      "马上看到有哪些 JSON",
      "按文件夹整理更清楚",
      "图片和资料也能直接打开",
    ],
    stats: {
      jsonFiles: "JSON 数量",
      folders: "文件夹数量",
      payload: "数据大小",
    },
    steps: [
      {
        title: "1. 放入文件",
        body: "把 JSON 文件放进 `public/` 文件夹里。",
      },
      {
        title: "2. 自动生成地址",
        body: "文件路径会直接变成可以打开的网址。",
      },
      {
        title: "3. 在这里查找",
        body: "这个页面会列出已公开的 JSON，方便大家快速找到。",
      },
    ],
    whyEyebrow: "这个页面能帮你什么",
    whyCards: [
      {
        title: "整理起来很简单",
        body: "用文件夹分类后，很容易知道每个文件放在哪里。",
      },
      {
        title: "第一次看也不容易迷路",
        body: "首页会先说明怎么使用，新来的用户也能马上看懂。",
      },
      {
        title: "链接很简单",
        body: "文件放进去以后，就会一直有一个固定地址可以打开。",
      },
    ],
    memoEyebrow: "快速说明",
    memoCards: [
      {
        title: "JSON 放哪里",
        body: "public/<folder>/<name>.json",
      },
      {
        title: "打开地址",
        body: "/<folder>/<name>.json",
      },
      {
        title: "图片和资料也可以",
        body: "放在 `public/` 里的图片和资料，也能直接打开。",
      },
    ],
    languageLabel: "语言",
    characterAlt: "Garoop 的引导角色 Garuchan",
    catalog: {
      eyebrow: "已公开的数据",
      title: "在这里查找\n已分享的数据。",
      description: "按名字搜索，或按类别筛选。找到后复制链接即可使用。",
      searchLabel: "按名字搜索",
      searchPlaceholder: "公司, 课程, 日程...",
      allLabel: "全部",
      copyLabel: "复制链接",
      copiedLabel: "已复制",
      emptyTitle: "暂无文件",
      emptyDescription: "把 `*.json` 放进 `public/` 后，这里就会显示出来。",
      rootLabel: "顶级目录",
    },
    exploreCard: {
      eyebrow: "Data Explorer",
      title: "用图表查看",
      body: "通过图表直观了解Garoop的数据——哪些类别文件最多？课程涵盖哪些主题？",
      cta: "打开探索页 ✨",
    },
  },
};

const languageOptions: Array<{ code: Locale; label: string }> = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

function pickLocale(lang?: string | string[]): Locale {
  const value = Array.isArray(lang) ? lang[0] : lang;

  if (value === "en" || value === "zh" || value === "ja") {
    return value;
  }

  return "ja";
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const locale = pickLocale(resolvedSearchParams?.lang);
  const t = dictionaries[locale];
  const catalog = await getPublicCatalog();
  const totalFiles = catalog.files.length;
  const totalDirectories = catalog.directories.length;
  const numberFormatter = new Intl.NumberFormat(t.lang);

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-pink-200/60 blur-3xl" />
        <div className="absolute -left-10 top-28 h-[280px] w-[280px] rounded-full bg-rose-100/80 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[360px] w-[360px] rounded-full bg-amber-100/70 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[340px] w-[340px] rounded-full bg-fuchsia-100/70 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.8),transparent_18%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.75),transparent_16%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.65),transparent_14%)] opacity-70" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section className="panel shimmer-card overflow-hidden px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ink-soft)] shadow-[0_12px_30px_rgba(205,92,122,0.12)]">
              {t.badge}
            </div>
            <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-2 shadow-[0_12px_30px_rgba(205,92,122,0.1)]">
              <span className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                {t.languageLabel}
              </span>
              {languageOptions.map((option) => (
                <Link
                  key={option.code}
                  href={`/?lang=${option.code}`}
                  className={`rounded-full px-3 py-2 text-sm transition ${
                    locale === option.code
                      ? "bg-[var(--accent-strong)] text-white shadow-[0_12px_24px_rgba(215,93,139,0.22)]"
                      : "bg-white/80 text-[var(--ink-soft)] hover:bg-white"
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div className="order-1 flex flex-col items-center justify-center">
              <div className="relative flex w-full max-w-[360px] justify-center sm:max-w-[420px]">
                <div className="character-glow absolute inset-x-6 inset-y-8 rounded-full" />
                <div className="sparkle-dot left-[6%] top-[18%]" />
                <div className="sparkle-dot sparkle-dot-delayed right-[12%] top-[10%]" />
                <div className="sparkle-dot left-[18%] bottom-[18%]" />
                <Image
                  src="/garuchan_stand.webp"
                  alt={t.characterAlt}
                  width={680}
                  height={980}
                  priority
                  className="character-bounce relative z-10 h-auto w-[250px] drop-shadow-[0_28px_52px_rgba(205,92,122,0.24)] sm:w-[310px] lg:w-[340px]"
                />
              </div>
            </div>

            <div className="order-2 space-y-6">
              <div className="space-y-4">
                <h1 className="max-w-4xl whitespace-pre-line font-serif text-4xl leading-tight text-[var(--ink-strong)] sm:text-5xl lg:text-6xl">
                  {t.title}
                </h1>
                <p className="max-w-3xl text-base leading-7 text-[var(--ink-soft)] sm:text-lg">
                  {t.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {t.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm text-[var(--ink-soft)] shadow-[0_12px_26px_rgba(205,92,122,0.12)]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="speech-card relative rounded-[36px] p-6 sm:p-8">
                <p className="eyebrow">{t.bubbleBadge}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-[var(--ink-strong)]">
                  {t.heroMessageTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)] sm:text-base">
                  {t.heroMessageBody}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {t.steps.map((step) => (
                    <div
                      key={step.title}
                      className="rounded-[24px] border border-white/75 bg-white/82 px-4 py-4 shadow-[0_18px_34px_rgba(205,92,122,0.08)]"
                    >
                      <p className="text-sm font-semibold text-[var(--ink-strong)]">{step.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{step.body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[26px] bg-[linear-gradient(135deg,rgba(255,240,244,0.95),rgba(255,251,240,0.95))] px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                    {t.heroExampleLabel}
                  </p>
                  <p className="mt-2 font-mono text-sm text-[var(--ink-strong)]">{t.heroExamplePath}</p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">{t.heroExampleResult}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="stat-tile stat-tile-pink">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)]">{t.stats.jsonFiles}</span>
                  <strong className="mt-3 block text-3xl text-[var(--ink-strong)]">
                    {numberFormatter.format(totalFiles)}
                  </strong>
                </div>
                <div className="stat-tile stat-tile-cream">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)]">{t.stats.folders}</span>
                  <strong className="mt-3 block text-3xl text-[var(--ink-strong)]">
                    {numberFormatter.format(totalDirectories)}
                  </strong>
                </div>
                <div className="stat-tile stat-tile-lilac">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)]">{t.stats.payload}</span>
                  <strong className="mt-3 block text-3xl text-[var(--ink-strong)]">
                    {numberFormatter.format(catalog.totalBytes)} B
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel px-5 py-5 sm:px-7 sm:py-7">
            <p className="eyebrow">{t.whyEyebrow}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {t.whyCards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_44px_rgba(205,92,122,0.08)]"
                >
                  <div className="mb-4 h-10 w-10 rounded-full bg-[linear-gradient(135deg,rgba(255,214,224,0.9),rgba(255,241,212,0.95))]" />
                  <h2 className="text-lg font-semibold text-[var(--ink-strong)]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel px-5 py-5 sm:px-7 sm:py-7">
            <p className="eyebrow">{t.memoEyebrow}</p>
            <div className="mt-4 rounded-[30px] bg-[linear-gradient(180deg,rgba(255,247,249,0.96),rgba(255,252,247,0.94))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              {t.memoCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`${index === 0 ? "" : "mt-3"} rounded-[24px] border border-white/70 bg-white/84 p-4`}
                >
                  <p className="text-sm font-semibold text-[var(--ink-strong)]">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore card */}
        <section className="panel shimmer-card relative overflow-hidden px-6 py-8 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(192,132,252,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.18),transparent_40%)]" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="eyebrow">{t.exploreCard.eyebrow}</p>
              <h2 className="font-serif text-2xl text-(--ink-strong) sm:text-3xl">
                {t.exploreCard.title}
              </h2>
              <p className="max-w-lg text-sm leading-6 text-(--ink-soft)">
                {t.exploreCard.body}
              </p>
            </div>
            <Link
              href={`/explore?lang=${locale}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-(--accent-strong) px-6 py-3 text-sm font-bold text-white shadow-[0_14px_32px_rgba(215,93,139,0.3)] transition hover:shadow-[0_18px_40px_rgba(215,93,139,0.4)] hover:-translate-y-0.5"
            >
              {t.exploreCard.cta}
            </Link>
          </div>
        </section>

        <DatasetBrowser
          files={catalog.files}
          directories={catalog.directories}
          messages={t.catalog}
          locale={locale}
        />
      </div>
    </main>
  );
}
