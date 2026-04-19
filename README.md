# garoop-data

株式会社Garoopで扱うJSONデータを公開するためのNext.jsプロジェクトです。

## 方針

- トップページ `/` は説明ページ兼データカタログです
- `public/` の中でフォルダを増やすと、そのままJSON公開URLの階層になります
- JSON本体は `/<folder>/<file>.json` で直接参照します
- `public/` に置いた既存の静的アセットも通常どおり直接参照できます

## 例

`public/master/company.json` を置くと、`/master/company.json` で公開されます。

## 開発

```bash
npm install
npm run dev
```

`dev` と `build` の前に公開JSONカタログを検査します。

## Daily Update

`public/data/` の日次更新は GitHub Actions で自動実行します。

- workflow: `.github/workflows/codex-daily-plan.yml`
- schedule: 毎日 JST 02:00 (`cron: 0 17 * * *`)
- outputs:
  - `public/data/personnel.json`
  - `public/data/schedule.json`
  - `public/data/daily/tasks/YYYY-MM-DD.json`
  - `public/data/daily/schedules/YYYY-MM-DD.json`

手動実行:

```bash
chmod +x scripts/codex/run-daily-plan.sh
export GROQ_API_KEY='your-groq-api-key'
export GROQ_MODEL='llama-3.1-8b-instant'
export GROQ_MODEL_CANDIDATES='llama-3.1-8b-instant,llama-3.3-70b-versatile,gemma2-9b-it'
./scripts/codex/run-daily-plan.sh 2026-02-20
```
