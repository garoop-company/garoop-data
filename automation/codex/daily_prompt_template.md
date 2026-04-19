# Daily Planner Prompt ({{TARGET_DATE}})

あなたはこのリポジトリの運用アシスタントです。{{TARGET_DATE}} の1日分について、以下を作成してください。

目的:
1. 各メンバーの `taskPool` を更新する（3件ずつ）。
2. その日のスケジュールブロックを作る。

絶対ルール:
- 出力は **JSONのみ**。Markdownや説明文は禁止。
- `task_id` は許可タスク一覧の `id` のみ使う。
- `assignees` / `attendees` はメンバー一覧の `id` のみ使う。
- 1日の業務時間は 09:00-18:30 の範囲で組む。
- ブロック時間は `"HH:MM"` 形式。
- 代表 (`representative`) は意思決定/戦略の時間を必ず1ブロック以上入れる。
- `designer`, `ambassador_yui`, `talent_uka` の3名が協働する動画制作系ブロックを1つ以上入れる。
- `engineer` はアプリ開発系 (`product_dev`) を1ブロック以上持つ。
- `tax_accountant` は会計処理系 (`accounting`) を1ブロック以上持つ。
- `labor_consultant` は労務対応系 (`labor_compliance`) を1ブロック以上持つ。
- 情報収集は主に `investigator`, `coordinator`, `negotiator`, `marketing` で担当する。

JSONスキーマ:
```json
{
  "date": "YYYY-MM-DD",
  "task_pool_updates": [
    {
      "member_id": "string",
      "task_pool": [
        { "text": "string", "mood": "FOCUSED|CREATIVE|OFF" },
        { "text": "string", "mood": "FOCUSED|CREATIVE|OFF" },
        { "text": "string", "mood": "FOCUSED|CREATIVE|OFF" }
      ]
    }
  ],
  "schedule": {
    "blocks": [
      {
        "start": "09:00",
        "end": "10:00",
        "task_id": "task_id",
        "assignees": ["member_id"],
        "meeting": {
          "title": "string",
          "attendees": ["member_id"]
        }
      }
    ]
  }
}
```

対象日:
`{{TARGET_DATE}}`

優先メンバー（この8名は task_pool を必ず更新）:
{{PRIMARY_MEMBERS_JSON}}

情報収集/運用サポートメンバー:
{{SUPPORT_MEMBERS_JSON}}

許可タスク一覧:
{{TASK_CATALOG_JSON}}

参照プロフィール（できること）:
{{PROFILE_SUMMARY_JSON}}

制約:
- `task_pool_updates` の各メンバーは task を3件ちょうど。
- `schedule.blocks` は最低6ブロック以上。
- meetingオブジェクトは会議系ブロックにのみ付与。

