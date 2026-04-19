# garoop-data

株式会社Garoopで扱うJSONデータを公開するためのNext.jsプロジェクトです。

## 方針

- `public/` 配下にはJSONファイルだけを置きます
- `public/` の中でフォルダを増やすと、そのまま公開URLの階層になります
- トップページ `/` は説明ページ兼データカタログです
- JSON本体は `/<folder>/<file>.json` で直接参照します

## 例

`public/master/company.json` を置くと、`/master/company.json` で公開されます。

## 開発

```bash
npm install
npm run dev
```

`dev` と `build` の前に `public/` 配下を検査し、JSON以外のファイルがあれば失敗します。
