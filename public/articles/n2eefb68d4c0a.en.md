---
title: "Garoop's Tech Stack"
description: "An introduction to Garoop's tech stack, with details on the backend and infrastructure."
sourceUrl: "https://note.com/garoop_company/n/n2eefb68d4c0a"
publishedAt: "2026-02-14T09:24:45.000Z"
imageUrl: "https://assets.st-note.com/production/uploads/images/251692190/rectangle_large_type_2_096b80ca8b8d36dda95be5788944938a.png?fit=bounds&quality=85&width=1280"
hashtags: "Garoop,TechStack,Backend,Infrastructure,GraphQL"
faq1Question: "What is the purpose of Garoop's tech stack?"
faq1Answer: "The purpose of Garoop's tech stack is to provide the backend API for a platform for children."
faq2Question: "What technologies does Garoop's tech stack use?"
faq2Answer: "Garoop's tech stack is centered on Go + GraphQL (gqlgen), and provides authentication, project management, learning content, points, and AI integration through a single API."
---

## Garoop's Tech Stack
Garoop's tech stack is built to provide the backend API for a platform for children.

## Architecture
The architecture is designed around a clear division of roles.
* server.go: Handles starting the HTTP server, exposing the GraphQL endpoint, CORS control, and passing the session cookie.
* graph/: The GraphQL layer. schema.graphqls defines the API contract, and schema.resolvers.go handles the implementation.

Garoop's tech stack is centered on Go + GraphQL (gqlgen), and provides authentication, project management, learning content, points, and AI integration through a single API.
