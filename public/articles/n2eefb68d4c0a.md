---
title: "Garoopの技術スタック バックエンド＆インフラ"
description: "Garoopは、10歳からスタートアップできる力を育てる支援サービスを目指しています。kids apiは、子ども向けプラットフォームのバックエンドAPIです。Go + GraphQL（gqlgen）を中心に、認証・案件管理・学習コンテンツ・ポイント・AI連携ま..."
sourceUrl: "https://note.com/garoop_company/n/n2eefb68d4c0a"
publishedAt: "2026-02-14T09:24:45.000Z"
imageUrl: "https://assets.st-note.com/production/uploads/images/251692190/rectangle_large_type_2_096b80ca8b8d36dda95be5788944938a.png?fit=bounds&quality=85&width=1280"
hashtags: "Garoop,kids api,バックエンドAPI,GraphQL,Go"
faq1Question: "kids apiは何で構成されていますか?"
faq1Answer: "kids apiはGoとGraphQL（gqlgen）で構成されています。"
faq2Question: "kids apiはどのような機能を提供していますか?"
faq2Answer: "kids apiは認証、案件管理、学習コンテンツ、ポイント、AI連携までを提供しています。"
---

### Garoopの技術スタック

Garoopは、10歳からスタートアップできる力を育てる支援サービスを目指しています。kids apiは、子ども向けプラットフォームのバックエンドAPIです。

#### 技術スタック

* Go
* GraphQL（gqlgen）
* 認証
* 案件管理
* 学習コンテンツ
* ポイント
* AI連携

#### アーキテクチャ

* server.go: HTTPサーバ起動、GraphQLエンドポイント公開、CORS制御、セッションCookieの受け渡しを担当。
* graph/: GraphQL層。schema.graphqlsでAPI契約を定義し、schema.resolvers.goがquery、mutation、subscriptionを実装します。

#### 使い方

kids apiは、子ども向けプラットフォームのバックエンドAPIです。認証、案件管理、学習コンテンツ、ポイント、AI連携までを1つのAPIで提供しています。
