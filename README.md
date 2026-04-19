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
