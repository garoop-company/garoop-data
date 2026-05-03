# missions/

`{locale}/{id}.json` がミッション本文の正となる。kids_api `mission` テーブルの
`data_path` カラムには `missions/{locale}/{id}.json` の相対パスが入っており、
GraphQL 経由で取得した `Mission.dataPath` を使ってフロントから直接 JSON を取得する。

## JSON スキーマ

```json
{
  "id": 123,
  "title": "string",
  "image": "string | null",
  "category": "string",
  "detailText": "string",
  "referenceUrl": "string | null",
  "locale": "ja"
}
```

## 生成方法

`kids_api` 側のスクリプトで本番DB→JSONを書き出す:

```sh
cd kids_api
DB_PASSWORD=... DB_HOST=... DB_USER=... DB_NAME=kids \
  go run ./scripts/export_missions_to_json \
    -out ../garoop-data/public \
    -table order
```

マイグレーション (`rename_order_to_mission.up.sql`) が `mission.data_path` を
locale + id から自動的に埋めるため、**スクリプトは JSON 書き出しだけ** 行う。

リリース手順:

1. **マイグレーション適用前** にこのスクリプトを `-table=order` で実行
   → `garoop-data/public/missions/{locale}/{id}.json` が生成される
2. garoop-data リポジトリにコミット & デプロイ (CDN 反映)
3. kids_api でマイグレーション適用 (`mission.data_path` が自動で埋まる)
4. kids_api / kids_web / garoop_tv をリリース

マイグレーション後にもう一度 export したい場合は `-table=mission` を指定。
