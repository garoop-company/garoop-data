---
title: "Garoopの技術スタック"
description: "Garoopの技術スタックを紹介します。バックエンド＆インフラの詳細について解説します。"
sourceUrl: "https://note.com/garoop_company/n/n2eefb68d4c0a"
publishedAt: "2026-02-14T09:24:45.000Z"
imageUrl: "https://assets.st-note.com/production/uploads/images/251692190/rectangle_large_type_2_096b80ca8b8d36dda95be5788944938a.png?fit=bounds&quality=85&width=1280"
hashtags: "Garoop,技術スタック,バックエンド,インフラ,GraphQL"
faq1Question: "Garoopの技術スタックの目的は何ですか？"
faq1Answer: "Garoopの技術スタックの目的は、子ども向けプラットフォームのバックエンドAPIを提供することです。"
faq2Question: "Garoopの技術スタックはどのような技術を使用していますか？"
faq2Answer: "Garoopの技術スタックは、Go + GraphQL（gqlgen）を中心に、認証・案件管理・学習コンテンツ・ポイント・AI連携までを1つのAPIで提供しています。"
---

## Garoopの技術スタック
Garoopの技術スタックは、子ども向けプラットフォームのバックエンドAPIを提供するために構築されています。

## アーキテクチャ
アーキテクチャは、役割分担に基づいて設計されています。
* server.go: HTTPサーバ起動、GraphQLエンドポイント公開、CORS制御、セッションCookieの受け渡しを担当します。
* graph/: GraphQL層。schema.graphqls でAPI契約を定義し、schema.resolvers.go が実装を担当します。

Garoopの技術スタックは、Go + GraphQL（gqlgen）を中心に、認証・案件管理・学習コンテンツ・ポイント・AI連携までを1つのAPIで提供しています。
