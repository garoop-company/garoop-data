import fs from "fs";
import path from "path";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const outputDirectory = path.join(process.cwd(), "public", "blog");
const thumbnailTemplatePath = path.join(process.cwd(), "public", "garoopTVcolor.webp");
const BLOG_BASE_URL = "https://garoop-data.vercel.app/blog";
const defaultLocale = "ja";
const LOCALIZED_POST_PATTERN = /^(.*)\.([a-z]{2})\.md$/i;

const themes = [
  {
    slug: "startup",
    labels: { ja: "スタートアップ", zh: "创业", ne: "स्टार्टअप" },
  },
  {
    slug: "elementary-school",
    labels: { ja: "小学生", zh: "小学生", ne: "प्राथमिक विद्यालयका बालबालिका" },
  },
  {
    slug: "entrepreneurship",
    labels: { ja: "起業", zh: "创业", ne: "उद्यमशीलता" },
  },
  { slug: "creation", labels: { ja: "創作", zh: "创作", ne: "सिर्जना" } },
  { slug: "kangaroo", labels: { ja: "カンガルー", zh: "袋鼠", ne: "कंगारु" } },
  {
    slug: "single-mother",
    labels: { ja: "シングルマザー", zh: "单亲妈妈", ne: "एकल आमा" },
  },
  { slug: "children", labels: { ja: "子供", zh: "孩子", ne: "बालबालिका" } },
  { slug: "ai", labels: { ja: "AI", zh: "AI", ne: "AI" } },
  {
    slug: "future-education",
    labels: { ja: "未来の教育", zh: "未来教育", ne: "भविष्यको शिक्षा" },
  },
];

const localeConfigs = {
  ja: {
    languageName: "日本語",
    themeLabel: (theme) => theme.labels.ja,
    prompt: ({ theme, date, thumbnail }) => `
あなたは「GaroopTV」（子供たちがスタートアップや起業、創作について学ぶサービス）の公式ブロガー「ガルちゃん」（カンガルーのキャラクター）です。

今回のテーマは「${theme.labels.ja}」です。

以下の条件でブログ記事を書いてください。
- 言語: 日本語
- 読者: 小学生とその保護者
- 口調: 親しみやすく元気で明るい話し方
- 内容: ${theme.labels.ja}に関連する、子供たちの可能性を広げるワクワクした話
- 記事の最後は、サイト内の「トレーニング」ページへ自然につながる一文で締める
- 本文は見出しを使って読みやすくする
- Markdownのみを出力する
- フロントマター（YAML形式）を先頭に含める

フロントマターの条件:
- title: 魅力的なタイトル
- date: ${date}
- description: SEO向け要約を100文字前後
- tags: 関連タグを3〜5個の配列で
- thumbnail: "${thumbnail}"

出力形式:
---
title: "..."
date: ${date}
description: "..."
tags: ["...", "..."]
thumbnail: "${thumbnail}"
---
# ...
`,
  },
  zh: {
    languageName: "简体中文",
    themeLabel: (theme) => theme.labels.zh,
    prompt: ({ theme, date, thumbnail }) => `
你是儿童创业与创作服务「GaroopTV」的官方博客角色"卡鲁酱"。

这次的主题是「${theme.labels.zh}」。

请按照以下要求撰写博客文章：
- 语言：简体中文
- 读者：小学生和家长
- 语气：亲切、活泼、容易理解
- 内容：围绕${theme.labels.zh}，讲述能激发孩子创造力与行动力的内容
- 结尾：自然引导读者去站内的"训练"页面
- 使用 Markdown，只输出文章本身
- 开头必须包含 YAML front matter

front matter 字段：
- title
- date: ${date}
- description: 约 100 字以内的摘要
- tags: 3 到 5 个标签数组
- thumbnail: "${thumbnail}"

输出格式：
---
title: "..."
date: ${date}
description: "..."
tags: ["...", "..."]
thumbnail: "${thumbnail}"
---
# ...
`,
  },
  ne: {
    languageName: "नेपाली",
    themeLabel: (theme) => theme.labels.ne,
    prompt: ({ theme, date, thumbnail }) => `
तपाईं बालबालिकाहरूलाई स्टार्टअप, उद्यमशीलता र सिर्जनाबारे सिकाउने सेवा "GaroopTV" का आधिकारिक ब्लगर पात्र "गारु-चान" हुनुहुन्छ।

यस पटकको विषय "${theme.labels.ne}" हो।

कृपया यी सर्तहरू पालना गरेर ब्लग लेख्नुहोस्।
- भाषा: नेपाली
- पाठक: प्राथमिक विद्यालयका बालबालिका र अभिभावक
- शैली: मैत्रीपूर्ण, उत्साहजनक, सजिलै बुझिने
- सामग्री: ${theme.labels.ne} सँग सम्बन्धित, बालबालिकाको सम्भावना र सिर्जनशीलता बढाउने प्रेरणादायी कुरा
- अन्त्यमा साइटको "training" पृष्ठतर्फ प्राकृतिक रूपमा मार्गदर्शन गर्नुहोस्
- Markdown मात्र दिनुहोस्
- सुरुमा YAML front matter राख्नुहोस्

front matter का फिल्डहरू:
- title
- date: ${date}
- description: करिब १०० अक्षरभित्रको सारांश
- tags: 3 देखि 5 वटा सम्बन्धित ट्यागहरूको array
- thumbnail: "${thumbnail}"

आउटपुट ढाँचा:
---
title: "..."
date: ${date}
description: "..."
tags: ["...", "..."]
thumbnail: "${thumbnail}"
---
# ...
`,
  },
};

function getTargetLocales() {
  const envValue = process.env.TARGET_LOCALES?.trim();
  if (!envValue) return [defaultLocale];
  return envValue
    .split(",")
    .map((locale) => locale.trim())
    .filter((locale) => locale in localeConfigs);
}

function getOutputPath(baseSlug, locale) {
  if (locale === defaultLocale) {
    return path.join(outputDirectory, `${baseSlug}.md`);
  }
  return path.join(outputDirectory, `${baseSlug}.${locale}.md`);
}

function ensureThumbnailAsset(date) {
  const thumbnailFileName = `thumbnail-${date}.webp`;
  const thumbnailOutputPath = path.join(outputDirectory, thumbnailFileName);
  if (!fs.existsSync(thumbnailOutputPath)) {
    fs.copyFileSync(thumbnailTemplatePath, thumbnailOutputPath);
    console.log(`Generated thumbnail asset: ${thumbnailOutputPath}`);
  }
  return `${BLOG_BASE_URL}/${thumbnailFileName}`;
}

function regenerateIndex() {
  const fileNames = fs.readdirSync(outputDirectory).filter((f) => f.endsWith(".md"));
  const entries = {};

  for (const fileName of fileNames) {
    const localizedMatch = fileName.match(LOCALIZED_POST_PATTERN);
    const slug = localizedMatch ? localizedMatch[1] : fileName.replace(/\.md$/, "");
    const locale = localizedMatch?.[2];

    if (!entries[slug]) entries[slug] = { default: null, locales: {} };
    if (locale) {
      entries[slug].locales[locale] = fileName;
    } else {
      entries[slug].default = fileName;
    }
  }

  const indexPath = path.join(outputDirectory, "index.json");
  fs.writeFileSync(indexPath, JSON.stringify({ entries }, null, 2));
  console.log(`Updated index.json (${Object.keys(entries).length} posts)`);
}

async function generateLocalizedPost(theme, locale, date) {
  const localeConfig = localeConfigs[locale];
  const baseSlug = `${date}-${theme.slug}`;
  const thumbnail = ensureThumbnailAsset(date);

  console.log(
    `Generating ${localeConfig.languageName} blog post for theme: ${localeConfig.themeLabel(theme)}`,
  );

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You write kid-friendly educational blog posts and must return valid markdown with YAML front matter.",
      },
      {
        role: "user",
        content: localeConfig.prompt({ theme, date, thumbnail }),
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const content = chatCompletion.choices[0]?.message?.content;
  if (!content) {
    throw new Error(`No content generated for locale ${locale}`);
  }

  const cleanContent = content
    .replace(/^```markdown\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");

  const filePath = getOutputPath(baseSlug, locale);
  fs.writeFileSync(filePath, cleanContent);
  console.log(`Generated: ${filePath}`);
}

async function generateBlogPost() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set");
  }

  fs.mkdirSync(outputDirectory, { recursive: true });

  const theme = themes[Math.floor(Math.random() * themes.length)];
  const date = new Date().toISOString().split("T")[0];
  const targetLocales = getTargetLocales();

  for (const locale of targetLocales) {
    await generateLocalizedPost(theme, locale, date);
  }

  regenerateIndex();
}

generateBlogPost().catch((error) => {
  console.error("Error generating blog post:", error);
  process.exit(1);
});
