---
title: "Garoopの技術スタック バックエンド＆インフラ"
description: "Go + GraphQL（gqlgen）を中心にしたGaroopのバックエンド構成と、運用観点を含むインフラ設計の考え方を整理した記事です。"
sourceUrl: "https://note.com/garoop_company/n/n2eefb68d4c0a"
publishedAt: "2026-02-10T09:00:00+09:00"
imageUrl: "https://assets.st-note.com/production/uploads/images/251692190/rectangle_large_type_2_096b80ca8b8d36dda95be5788944938a.png?fit=bounds&quality=85&width=1280"
hashtags: "Garoop,技術スタック,Go,GraphQL,インフラ"
faq1Question: "バックエンドの中心技術は何ですか？"
faq1Answer: "GoとGraphQL（gqlgen）を軸にAPIを構築しています。"
faq2Question: "この構成の狙いは？"
faq2Answer: "機能追加の柔軟性と運用の安定性を両立し、成長に耐える基盤を作ることです。"
---
## 記事概要

- kids apiを支えるバックエンド構成の全体像を解説
- GraphQL層・認証・運用周りの責務分担を明確化
- 技術選定の背景とスケール対応の考え方を提示

本記事は、Garoopのプロダクトを支える技術基盤を俯瞰できる内容です。Go + GraphQLを中心に、認証、案件管理、学習コンテンツ、ポイント管理、AI連携までをどのように接続しているかが示されています。単なる技術紹介ではなく、実運用を前提にした設計思想が含まれている点が特徴です。

## AIO視点

- 構成要素を責務ごとに分け、AIが要点抽出しやすい記述にする
- 技術名と役割をセットで記載し、検索・要約の精度を高める
