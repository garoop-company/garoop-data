import { DatasetBrowser } from "@/components/dataset-browser";
import { getPublicCatalog } from "@/lib/public-catalog";

const principles = [
  {
    title: "Folder-first publishing",
    body: "`public/` にフォルダを切るだけで、公開URLの構造をそのまま管理できます。",
  },
  {
    title: "Top page stays human",
    body: "トップページは説明と一覧だけに絞り、実データはJSONとして直接参照できる形にします。",
  },
  {
    title: "Guardrails for mistakes",
    body: "画像やメモを混ぜないように、`public/` にJSON以外があると開発とビルドを止めます。",
  },
];

const operations = [
  "JSONを置く場所: `public/<任意のフォルダ>/<任意の名前>.json`",
  "公開URL: 先頭に `/` を付けた同じパス",
  "運用ルール: `public/` にはJSON以外を置かない",
];

export default async function Home() {
  const catalog = await getPublicCatalog();
  const totalFiles = catalog.files.length;
  const totalDirectories = catalog.directories.length;

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[360px] w-[360px] rounded-full bg-amber-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section className="panel overflow-hidden px-5 py-6 sm:px-7 sm:py-7 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-white/60 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ink-soft)]">
                Garoop JSON Publishing Hub
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl font-serif text-4xl leading-tight text-[var(--ink-strong)] sm:text-5xl lg:text-6xl">
                  JSONだけを静かに公開するための、説明ページ付きデータハブ。
                </h1>
                <p className="max-w-3xl text-base leading-7 text-[var(--ink-soft)] sm:text-lg">
                  このプロジェクトは、株式会社Garoopで扱うJSONデータを `public/` 配下で整理し、
                  トップページでは公開ルールと現在の配布一覧だけを見せるためのNext.jsアプリです。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="stat-tile">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)]">JSON files</span>
                  <strong className="mt-3 block text-3xl text-[var(--ink-strong)]">{totalFiles}</strong>
                </div>
                <div className="stat-tile">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)]">Folders</span>
                  <strong className="mt-3 block text-3xl text-[var(--ink-strong)]">{totalDirectories}</strong>
                </div>
                <div className="stat-tile">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)]">Payload</span>
                  <strong className="mt-3 block text-3xl text-[var(--ink-strong)]">{catalog.totalBytes.toLocaleString()} B</strong>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.72))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p className="eyebrow">How Publishing Works</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-[var(--surface-strong)] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--ink-faint)]">Put a file here</p>
                  <p className="mt-2 font-mono text-sm text-[var(--ink-strong)]">
                    public/master/company.json
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--ink-faint)]">It becomes available at</p>
                  <p className="mt-2 font-mono text-sm text-[var(--ink-strong)]">/master/company.json</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="panel px-5 py-5 sm:px-7 sm:py-7">
            <p className="eyebrow">Design Intent</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {principles.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-white/60 bg-white/78 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
                >
                  <h2 className="text-lg font-semibold text-[var(--ink-strong)]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel px-5 py-5 sm:px-7 sm:py-7">
            <p className="eyebrow">Operation Rules</p>
            <div className="mt-4 space-y-3">
              {operations.map((operation) => (
                <div
                  key={operation}
                  className="rounded-2xl border border-white/60 bg-white/78 px-4 py-4 text-sm leading-6 text-[var(--ink-soft)]"
                >
                  {operation}
                </div>
              ))}
            </div>
          </div>
        </section>

        <DatasetBrowser
          files={catalog.files}
          directories={catalog.directories}
          invalidFiles={catalog.invalidFiles}
        />
      </div>
    </main>
  );
}
