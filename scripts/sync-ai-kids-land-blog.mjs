#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const RSS_URL = "https://note.com/garoop_company/rss";
const OUTPUT_DIR = path.join(process.cwd(), "public", "blog", "ai_kids_land");
const INDEX_PATH = path.join(OUTPUT_DIR, "index.json");
const STATE_PATH = path.join(process.cwd(), "data", "ai_kids_land-blog-rss-state.json");
const MAX_ITEMS = 20;
const SUPPORTED_LOCALES = ["ja", "en", "zh", "fr", "id", "it", "ne"];

const LOCALE_COPY = {
  ja: {
    fallbackDescription: "Garoop探校向けに整理した記事です。",
    hashtags: ["Garoop探校", "生成AI", "アウトプット", "子ども教育"],
    intro: (title) => `${title} の要点を、Garoop探校の実践学習に引き寄せて読みやすく整理しています。`,
    sections: {
      overview: "## この記事で分かること",
      points: "## ポイント",
      usage: "## Garoop探校での活かし方",
    },
    bullets: (summary) => [
      summary,
      "読んだ内容を自分の作品や発信にどうつなげるかを考えるきっかけになります。",
      "詳細や最新情報は元記事リンクから確認できます。",
    ],
    usageBody:
      "Garoop探校では、記事を読むだけで終わらず、そこから何を作るか、何を発信するかまでを実践として扱います。この記事も、その一歩を作るための導線として使える内容に整えています。",
  },
  en: {
    fallbackDescription: "An article summary adapted for Garoop School.",
    hashtags: ["Garoop School", "Generative AI", "Output", "Kids Education"],
    intro: (title) => `This article reorganizes the key points of ${title} for the practice-first learning style of Garoop School.`,
    sections: {
      overview: "## What This Article Covers",
      points: "## Key Points",
      usage: "## How It Connects To Garoop School",
    },
    bullets: (summary) => [
      summary,
      "It helps learners think about how to turn what they read into actual work or public output.",
      "For full details and the latest information, readers can move to the original article.",
    ],
    usageBody:
      "At Garoop School, reading is only the starting point. We care about what learners make next and how they publish it. This article is generated to support that next step.",
  },
  zh: {
    fallbackDescription: "为 Garoop 探校整理的文章摘要。",
    hashtags: ["Garoop探校", "生成式AI", "输出", "儿童教育"],
    intro: (title) => `本文将 ${title} 的重点整理为更适合 Garoop 探校实践学习方式的内容。`,
    sections: {
      overview: "## 这篇文章能帮助你了解什么",
      points: "## 重点",
      usage: "## 在 Garoop 探校中的应用方式",
    },
    bullets: (summary) => [
      summary,
      "帮助学习者思考如何把读到的内容转化为自己的作品或发信。",
      "如需完整内容和最新信息，可继续查看原始文章。",
    ],
    usageBody:
      "在 Garoop 探校，阅读并不是终点。更重要的是接下来做什么、发布什么。这篇文章的整理方式，就是为了支持那一步实践。",
  },
  fr: {
    fallbackDescription: "Resume d'article adapte pour Garoop.",
    hashtags: ["Garoop", "IA Generative", "Production", "Education"],
    intro: (title) => `Cet article reorganise les points essentiels de ${title} pour le style d'apprentissage pratique de Garoop.`,
    sections: {
      overview: "## Ce que cet article permet de comprendre",
      points: "## Points cles",
      usage: "## Comment l'utiliser dans Garoop",
    },
    bullets: (summary) => [
      summary,
      "Il aide les eleves a relier ce qu'ils lisent a une creation ou a une publication concrete.",
      "Pour les details complets et les informations a jour, il faut ouvrir l'article d'origine.",
    ],
    usageBody:
      "Chez Garoop, la lecture n'est qu'un point de depart. Nous mettons l'accent sur ce que l'on cree ensuite et sur la maniere de le diffuser. Cet article est structure pour soutenir cette demarche.",
  },
  id: {
    fallbackDescription: "Ringkasan artikel yang disesuaikan untuk Garoop School.",
    hashtags: ["Garoop School", "AI Generatif", "Output", "Pendidikan Anak"],
    intro: (title) => `Artikel ini merangkum poin penting dari ${title} agar lebih sesuai dengan pola belajar praktik di Garoop School.`,
    sections: {
      overview: "## Isi Utama Artikel",
      points: "## Poin Penting",
      usage: "## Hubungannya Dengan Garoop School",
    },
    bullets: (summary) => [
      summary,
      "Membantu peserta memikirkan bagaimana isi artikel bisa diubah menjadi karya atau publikasi mereka sendiri.",
      "Untuk detail lengkap dan informasi terbaru, pembaca dapat membuka artikel aslinya.",
    ],
    usageBody:
      "Di Garoop School, membaca hanyalah titik awal. Yang lebih penting adalah apa yang dibuat setelah itu dan bagaimana hasilnya dibagikan. Artikel ini disusun untuk mendukung langkah tersebut.",
  },
  it: {
    fallbackDescription: "Sintesi dell'articolo adattata per Garoop.",
    hashtags: ["Garoop", "IA Generativa", "Output", "Educazione"],
    intro: (title) => `Questo articolo riorganizza i punti principali di ${title} in modo piu adatto allo stile pratico di Garoop.`,
    sections: {
      overview: "## Cosa si puo capire da questo articolo",
      points: "## Punti chiave",
      usage: "## Come si collega a Garoop",
    },
    bullets: (summary) => [
      summary,
      "Aiuta gli studenti a pensare a come trasformare cio che leggono in lavoro concreto o pubblicazione.",
      "Per i dettagli completi e le informazioni piu recenti, e possibile aprire l'articolo originale.",
    ],
    usageBody:
      "In Garoop leggere e solo l'inizio. Conta di piu cio che si produce dopo e come lo si condivide. Questo articolo e strutturato per sostenere quel passaggio pratico.",
  },
  ne: {
    fallbackDescription: "Garoop School का लागि तयार गरिएको लेख सारांश।",
    hashtags: ["Garoop School", "Generative AI", "Output", "बाल शिक्षा"],
    intro: (title) => `यो लेखले ${title} का मुख्य बुँदाहरूलाई Garoop School को अभ्यासमुखी सिकाइसँग मिलाएर पुन: व्यवस्थित गर्छ।`,
    sections: {
      overview: "## यस लेखबाट के बुझ्न सकिन्छ",
      points: "## मुख्य बुँदाहरू",
      usage: "## Garoop School मा यसको प्रयोग",
    },
    bullets: (summary) => [
      summary,
      "यसले विद्यार्थीलाई पढेको कुरा आफ्नै सिर्जना वा सार्वजनिक आउटपुटमा कसरी बदल्ने भन्ने सोच्न मद्दत गर्छ।",
      "पूर्ण विवरण र पछिल्लो जानकारीका लागि मूल लेख हेर्न सकिन्छ।",
    ],
    usageBody:
      "Garoop School मा पढ्नु मात्र अन्त्य होइन। त्यसपछि के बनाइन्छ र कसरी बाहिर ल्याइन्छ भन्ने कुरा महत्वपूर्ण हुन्छ। यो लेख त्यही अभ्यासलाई समर्थन गर्ने गरी बनाइएको छ।",
  },
};

const decodeEntities = (value) =>
  String(value || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getTagContent = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
  return match?.[1] ?? "";
};

const normalizeDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString();
};

const sanitizeSlug = (value, index) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || `note-${index + 1}`;

const summarize = (value, limit = 120) => {
  const text = decodeEntities(value);
  if (!text) {
    return "";
  }
  return text.length <= limit ? text : `${text.slice(0, limit)}...`;
};

const yamlEscape = (value) => String(value || "").replace(/"/g, '\\"');

const extractOgMeta = (html) => {
  const read = (property) => {
    const pattern = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i");
    return decodeEntities(html.match(pattern)?.[1] || "");
  };
  return {
    title: read("og:title"),
    description: read("og:description"),
    imageUrl: read("og:image"),
  };
};

async function readState() {
  try {
    return JSON.parse(await fs.readFile(STATE_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "ai-kids-land-note-sync/1.0 (+https://www.ai-garoop-school.com)",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  return res.text();
}

function parseRssItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map((match, index) => {
      const itemXml = match[1];
      const link = decodeEntities(getTagContent(itemXml, "link"));
      const title = decodeEntities(getTagContent(itemXml, "title"));
      const description = decodeEntities(getTagContent(itemXml, "description"));
      const publishedAt = normalizeDate(decodeEntities(getTagContent(itemXml, "pubDate")));
      const sourceSlug = (() => {
        try {
          return new URL(link).pathname.split("/").filter(Boolean).pop() || "";
        } catch {
          return "";
        }
      })();

      return {
        slug: sanitizeSlug(sourceSlug || title, index),
        title,
        description,
        sourceUrl: link,
        publishedAt,
      };
    })
    .filter((item) => item.title && item.sourceUrl)
    .slice(0, MAX_ITEMS);
}

function buildBody(locale, title, description, ogDescription) {
  const copy = LOCALE_COPY[locale];
  const summary = summarize(ogDescription || description, 180) || copy.fallbackDescription;
  const bulletLines = copy.bullets(summary).map((line) => `* ${line}`).join("\n");

  return `${copy.sections.overview}

${copy.intro(title)}

${copy.sections.points}

${bulletLines}

${copy.sections.usage}

${copy.usageBody}`;
}

async function writeMarkdownFile(item, og, locale) {
  const copy = LOCALE_COPY[locale];
  const hashtags = copy.hashtags;
  const dateFolder = item.publishedAt ? item.publishedAt.slice(0, 10) : "undated";
  const targetDir = path.join(OUTPUT_DIR, locale, dateFolder);
  const description = summarize(og.description || item.description, 140) || copy.fallbackDescription;
  const markdown = `---
title: "${yamlEscape(og.title || item.title)}"
description: "${yamlEscape(description)}"
sourceUrl: "${yamlEscape(item.sourceUrl)}"
publishedAt: "${yamlEscape(item.publishedAt)}"
imageUrl: "${yamlEscape(og.imageUrl)}"
hashtags: "${yamlEscape(hashtags.join(","))}"
---

${buildBody(locale, og.title || item.title, item.description, og.description)}
`;

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(path.join(targetDir, `${item.slug}.md`), markdown, "utf8");

  return {
    locale,
    datePath: dateFolder,
    slug: item.slug,
    title: og.title || item.title,
    sourceUrl: item.sourceUrl,
    publishedAt: item.publishedAt,
    description,
    imageUrl: og.imageUrl,
    hashtags,
  };
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(STATE_PATH), { recursive: true });

  const rss = await fetchText(RSS_URL);
  const rssHash = crypto.createHash("sha256").update(rss).digest("hex");
  const state = await readState();

  if (state.rssHash === rssHash) {
    console.log("No RSS updates detected.");
    return;
  }

  const items = parseRssItems(rss);
  const generated = [];

  for (const item of items) {
    const html = await fetchText(item.sourceUrl);
    const og = extractOgMeta(html);
    for (const locale of SUPPORTED_LOCALES) {
      generated.push(await writeMarkdownFile(item, og, locale));
    }
  }

  await fs.writeFile(
    INDEX_PATH,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), sourceUrl: RSS_URL, items: generated }, null, 2)}\n`,
    "utf8",
  );
  await fs.writeFile(
    STATE_PATH,
    `${JSON.stringify({ rssHash, updatedAt: new Date().toISOString() }, null, 2)}\n`,
    "utf8",
  );

  console.log(`Updated ${generated.length} markdown blog articles.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
