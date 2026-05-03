---
name: garoop-novel-content
description: garoop-data リポジトリ内で Garoop Novel 用の文庫小説コンテンツ（章ファイルとインデックス）を新規作成・更新するためのスキル。「Garoop Novel に○○の小説書いて」「文庫に新刊追加」「人物列伝の続編」などの依頼で起動する。public/novel/ 配下の JSON を直接編集し、検証してコミットするまでの一貫フローを提供する。garoop_novel（消費側）はビルド時に https://garoop-data.vercel.app/novel/ を fetch するため、ここで作って push すれば自動的に小説サイトに反映される。
---

# Garoop Novel コンテンツ ― garoop-data 側からの執筆と公開

このスキルは、**Garoop Novel に表示される小説コンテンツの実体は garoop-data リポジトリにある**という事実が前提。`garoop_novel` 側は `https://garoop-data.vercel.app/novel/...` を fetch するだけ。だから新刊を出すには、こちら（garoop-data）で書いて push すれば足りる。

## 起動条件
- 「Garoop Novel に○○の小説を書いて／追加して」
- 「人物列伝／長崎物語の続編」
- 「ガロープ文庫に新刊」
- 既存の章を修正・拡充したい時

実在の人物・企業を題材にする時は、**まず Web リサーチを並列で行ってから書く**。リサーチ作法は本スキル後半「## 実在題材を扱う時のリサーチ手順」を参照。

## ファイル構成

| 役割 | パス |
|---|---|
| 全巻のインデックス | `public/novel/novels.json` |
| 章本体 | `public/novel/chapters/<id>.json` |
| 動画一覧（参考） | `public/novel/videos.json` |

公開 URL: `https://garoop-data.vercel.app/novel/novels.json`、`https://garoop-data.vercel.app/novel/chapters/<id>.json`

## 章ファイル スキーマ

```jsonc
{
  "id": "<seriesKey>-<NNN>",        // 例: "shimizu-tax-005"
  "pages": [
    "1ページ目の本文（地の文中心、改行なし、句点で締める）",
    "..."
  ],
  "companionLines": [
    "1ページ目に対応する、ガルちゃんの一行コメント",
    "..."
  ]
}
```

**厳守事項**:
- `pages` と `companionLines` は同数（基本 **8 個ずつ**）
- 末尾に空文字列 `""` を入れない
- ファイル末尾は改行 1 つ
- JSON はビルド時に `npm run validate:public` で構文検査される（必ず構文 valid に）

## 本文の作法

- **長さ**: 1 ページあたり日本語で **400〜600 字程度**
- **構成**: 8 ページで「導入 → 展開 → 山場 → 余韻」の弧を描く
- **文体**: 明朝で読まれる前提の、句読点多めのリズム。「――」「『』」を活用。エンタメ装飾を盛らない
- **固有名詞**: 鎌倉なら由比ヶ浜・小町通り・江ノ電、長崎なら稲佐山・出島・浦上・市電など、実在の地理と整合する
- **避ける**: 絵文字、英語スラング、「！」連打、説明的すぎる解説（読者を信じる）

## companionLines の作法

- 1 行 15〜30 字程度の短いつぶやき
- ガルちゃん（シングルマザーのカンガルー、生成 AI を学んでいる）が、読者の隣で読みながらつぶやく体
- 共感、軽い驚き、感想、自己投影。ネタバレしない
- 絵文字は控えめ（最終ページに 🎉 など 1 つ程度なら可）

## 既存シリーズと世界観

| seriesKey | category | 主役 | 哲学・口癖 |
|---|---|---|---|
| `shimizu-tax` | 人物列伝 | カマクラウドの税理士・清水小綾（鎌倉） | 「数字の裏側にある物語」「税理士は人生の伴走者」 |
| `suda-sharoushi` | 人物列伝 | オール社会保険労務士・須田朋美 | 「制度は人を縛るためじゃない、守るためにある」 |
| `yamashita-garoop` | 人物列伝 | 株式会社 Garoop 代表・山下大貴（長崎） | 「教えない。鍛える」「失敗は筋肉痛」「10 歳からスタートアップ」 |
| `nagasaki-monogatari` | 長崎物語 | 街そのもの（エッセイ風） | 出島・市電・卓袱・浦上などひとつに絞って書く |

新シリーズを始める時は、新しい `seriesKey` と必要なら新カテゴリを定義する。

## novels.json への追加

`public/novel/novels.json` は配列。新巻 1 つにつき 1 エントリを末尾またはシリーズ内末尾に追加する。

```jsonc
{
  "id": "<seriesKey>-<NNN>",                 // chapters/<id>.json の id と完全一致
  "seriesKey": "<seriesKey>",
  "episodeNumber": <整数>,                    // シリーズ内通番、1 から
  "title": "○○ ― サブタイトル",
  "description": "1〜2 文の引き、140 字以内目安",
  "category": "人物列伝" | "長崎物語" | "<新カテゴリ>",
  "chapterFile": "<id>.json",                // chapters/ 配下のファイル名のみ
  "pageCount": 8,
  "animationPreset": "book-classic",
  "keywords": "カンマ区切りの SEO キーワード",
  "lang": "ja",
  "createdAt": "YYYY-MM-DD"                  // 当日。曖昧な日付は使わない
}
```

注意:
- **id の一意性**: 同シリーズ内で `episodeNumber` を連番に
- **多言語**: 当面は `lang: "ja"` のみ。garoop_novel の読込ロジックに ja → 任意ロケールのフォールバックがあるため、他言語ページでも JA 版が読める
- **`category` の新設**: 既存に収まらない時のみ

## 実在題材を扱う時のリサーチ手順

実在の人物・企業・地域を題材にする場合は、書く前に必ず Web を調べる。

### 第一層: WebSearch を並列で
- 一回のメッセージで 3〜4 本の検索を発射
- 例: `"<会社名>" 設立 事業内容` `"<人物名>" インタビュー` `<会社名> ニュース 最近` `"<Company> Japan startup"`

### 第二層: WebFetch で深掘り
- 公式サイト、note、地方紙、行政の支援機関ページ、SNS プロフィール
- プロンプトに「**原文の表現を引用しながら**」「**印象的なフレーズを抽出して**」と入れる
- 402/timeout が出たソースは粘らず捨てる

### 第三層: 事実台帳（書く前に整理）

```
■ 基本: 設立日 / 生年 / 所在地 / 事業内容
■ ミッション・哲学: 公式コピーを原文ママで
■ 具体的な出来事（時系列で 5〜10 個、YYYY/MM/DD 付き）
■ 個人的側面: 経歴・趣味・原体験
■ 使えそうな比喩・印象語
```

台帳に無い発言を、人物の直接話法（「○○さんは『...』と言った」）で書かない。

### 実在の人物の発言ルール
- 公開ソースで本人が語っているコピーは鍵かっこ付きで使える
- 一次ソースに無い発言は、本人の直接話法にしない
- 内面・地の文の解釈は「彼はこう感じた」「彼の中では、こうだった」のように **解釈であることが文体的に分かる** 書き方にする
- 政治的・宗教的・差別的な見解、競合への攻撃、私生活の詮索は書かない

## 検証 → コミット → デプロイ

新規・更新したら必ずこの順に:

```bash
cd /Users/yamashitadaiki/git_work/garoop-data
npm run validate:public      # JSON 構文検査
git status                   # 何を追加・更新したか確認
git add public/novel/...     # 追加ファイル群
git commit -m "novel: add <id> ..."  # 後述のコミット規約
git push origin main         # Vercel が自動デプロイ
```

数分後、`https://garoop-data.vercel.app/novel/novels.json` に新エントリが反映される。これで `garoop_novel` 側は次回ビルド時に新刊を取り込む。

### コミットメッセージの形

- 1 巻追加: `novel: add <seriesKey>-<NNN> "<短縮タイトル>"`
- 複数巻追加: `novel: add <seriesKey> ep.NNN-MMM (<件数>巻)`
- 既存修正: `novel: fix <seriesKey>-<NNN> ...`
- インデックスのみ修正: `novel(index): ...`

## 消費側（garoop_novel）との関係

- `garoop_novel` リポジトリ内のコードは `src/lib/data-source.ts` 経由で `https://garoop-data.vercel.app/novel/` を fetch する。
- `garoop_novel` の章 ID と garoop-data の章ファイル名は完全一致が必要。
- `garoop_novel` 側に **同じ題材で章ファイルや手書きの control を作らない**。古い `garoop_novel/src/data/chapters/` は移行済みで参照されない（残っていても無視される）。

## このスキルでやらないこと

- `garoop_novel` 側のコード変更（UI、ローダー、ロケール判定など）。それは別作業。
- 多言語翻訳。当面 ja 単独。
- `videos.json` の編集はこのスキル対象外（必要時は別途依頼）。
- 章ファイルの配置先を `public/novel/` 以外に置くこと。

## 進め方の典型

1. ユーザーから題材を受ける（「○○について」「△△の続編を」）
2. 実在題材なら **先に WebSearch + WebFetch で並列調査**、事実台帳を頭で整理
3. 既存 `public/novel/novels.json` と該当 `chapters/<seriesKey>-*.json` を読み、シリーズ・既出設定を把握
4. 章ごとのページ設計（一行サマリ）を組む
5. `public/novel/chapters/<id>.json` を Write で作成
6. `public/novel/novels.json` に新エントリを追加（同 seriesKey の末尾、`episodeNumber` 連番）
7. `npm run validate:public` で検証
8. コミット & push
9. ユーザーに、追加した巻のファイルパス（リンク）と、リサーチで使った主要ソース URL（マークダウン）を簡潔に報告。`https://garoop-data.vercel.app/novel/...` の反映確認を促す
