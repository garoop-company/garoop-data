export type Locale = "ja" | "en" | "zh";

// ─── Folder labels ────────────────────────────────────────────────────────────

const FOLDER_LABELS: Record<string, Record<Locale, string>> = {
  "": { ja: "ルート", en: "Root", zh: "根目录" },
  master: { ja: "基本情報", en: "Master Data", zh: "基础数据" },
  data: { ja: "社内データ", en: "Team Data", zh: "团队数据" },
  "data/daily": { ja: "日次データ", en: "Daily Data", zh: "日常数据" },
  "data/daily/schedules": { ja: "日次スケジュール", en: "Daily Schedules", zh: "日程表" },
  "data/daily/tasks": { ja: "日次タスク", en: "Daily Tasks", zh: "日常任务" },
  "data/i18n": { ja: "多言語データ", en: "i18n Data", zh: "多语言数据" },
  "data/i18n/en": { ja: "英語テキスト", en: "English Texts", zh: "英文文本" },
  "data/rag": { ja: "AIナレッジ", en: "AI Knowledge", zh: "AI知识库" },
  "lesson-stories": { ja: "レッスンストーリー", en: "Lesson Stories", zh: "课程故事" },
  "lesson-stories/ja": { ja: "レッスン（日本語）", en: "Lessons (Japanese)", zh: "课程（日语）" },
  "lesson-stories/en": { ja: "レッスン（英語）", en: "Lessons (English)", zh: "课程（英语）" },
  "lesson-stories/vi": { ja: "レッスン（ベトナム語）", en: "Lessons (Vietnamese)", zh: "课程（越南语）" },
  "lesson-stories/zh": { ja: "レッスン（中国語）", en: "Lessons (Chinese)", zh: "课程（中文）" },
  "lesson-stories/id": { ja: "レッスン（インドネシア語）", en: "Lessons (Indonesian)", zh: "课程（印尼语）" },
  "lesson-stories/ne": { ja: "レッスン（ネパール語）", en: "Lessons (Nepali)", zh: "课程（尼泊尔语）" },
  "mission-stories": { ja: "ミッションストーリー", en: "Mission Stories", zh: "使命故事" },
  "training-stories": { ja: "トレーニング教材", en: "Training Materials", zh: "培训教材" },
  "garoop-tv": { ja: "GaroopTV チャンネル", en: "GaroopTV Channels", zh: "GaroopTV 频道" },
  feeds: { ja: "お知らせ", en: "News Feed", zh: "新闻动态" },
  articles: { ja: "記事", en: "Articles", zh: "文章" },
  blog: { ja: "ブログ", en: "Blog", zh: "博客" },
  "blog/ai_kids_land": { ja: "AI Kids Land ブログ", en: "AI Kids Land Blog", zh: "AI Kids Land 博客" },
  plan: { ja: "プラン情報", en: "Plans", zh: "方案信息" },
  presentation: { ja: "プレゼン資料", en: "Presentations", zh: "演示资料" },
  catalog: { ja: "カタログ", en: "Catalog", zh: "目录" },
  training: { ja: "トレーニング", en: "Training", zh: "培训" },
  land: { ja: "ランドページ", en: "Landing Pages", zh: "落地页" },
};

export function getFolderLabel(folderPath: string, locale: Locale): string {
  if (FOLDER_LABELS[folderPath]) return FOLDER_LABELS[folderPath][locale];
  return folderPath
    .split("/")
    .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(" / ");
}

// ─── Top-level folder display names (for aggregated stats) ───────────────────

export const TOP_FOLDER_DISPLAY: Record<string, Record<Locale, { label: string; emoji: string; description: string }>> = {
  "lesson-stories": {
    ja: { label: "レッスンストーリー", emoji: "📚", description: "多言語のAI教育コンテンツ" },
    en: { label: "Lesson Stories", emoji: "📚", description: "AI edu content in multiple languages" },
    zh: { label: "课程故事", emoji: "📚", description: "多语言AI教育内容" },
  },
  data: {
    ja: { label: "社内データ", emoji: "📊", description: "スケジュール・タスク・メンバー情報" },
    en: { label: "Team Data", emoji: "📊", description: "Schedules, tasks, member info" },
    zh: { label: "团队数据", emoji: "📊", description: "日程、任务、成员信息" },
  },
  "mission-stories": {
    ja: { label: "ミッションストーリー", emoji: "🎯", description: "目標と使命のストーリー" },
    en: { label: "Mission Stories", emoji: "🎯", description: "Stories about goals and missions" },
    zh: { label: "使命故事", emoji: "🎯", description: "关于目标与使命的故事" },
  },
  "training-stories": {
    ja: { label: "トレーニング教材", emoji: "🏋️", description: "学習・研修用コンテンツ" },
    en: { label: "Training Materials", emoji: "🏋️", description: "Learning and training content" },
    zh: { label: "培训教材", emoji: "🏋️", description: "学习与培训内容" },
  },
  master: {
    ja: { label: "基本情報", emoji: "📋", description: "会社・サービスのマスターデータ" },
    en: { label: "Master Data", emoji: "📋", description: "Company and service master records" },
    zh: { label: "基础数据", emoji: "📋", description: "公司与服务基础数据" },
  },
  blog: {
    ja: { label: "ブログ", emoji: "✍️", description: "ブログ記事の情報" },
    en: { label: "Blog", emoji: "✍️", description: "Blog post data" },
    zh: { label: "博客", emoji: "✍️", description: "博客文章数据" },
  },
  "garoop-tv": {
    ja: { label: "GaroopTV", emoji: "🎬", description: "動画チャンネル情報" },
    en: { label: "GaroopTV", emoji: "🎬", description: "Video channel info" },
    zh: { label: "GaroopTV", emoji: "🎬", description: "视频频道信息" },
  },
  feeds: {
    ja: { label: "お知らせ", emoji: "📰", description: "リリース・アップデート情報" },
    en: { label: "News Feed", emoji: "📰", description: "Release and update notices" },
    zh: { label: "新闻动态", emoji: "📰", description: "发布与更新通知" },
  },
  articles: {
    ja: { label: "記事", emoji: "📝", description: "公開記事のデータ" },
    en: { label: "Articles", emoji: "📝", description: "Published article data" },
    zh: { label: "文章", emoji: "📝", description: "已发布文章数据" },
  },
};

export function getTopFolderDisplay(folder: string, locale: Locale) {
  const def = TOP_FOLDER_DISPLAY[folder];
  if (def) return def[locale];
  const label = folder.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { label, emoji: "📁", description: "" };
}

// ─── Specific file labels ─────────────────────────────────────────────────────

const FILE_LABELS: Record<string, Record<Locale, string>> = {
  "data/activity_log.json": { ja: "チームの活動ログ", en: "Team Activity Log", zh: "团队活动日志" },
  "data/member-profiles.json": { ja: "メンバーのプロフィール", en: "Member Profiles", zh: "成员简介" },
  "data/personnel.json": { ja: "スタッフ一覧", en: "Staff List", zh: "员工列表" },
  "data/schedule.json": { ja: "スケジュール", en: "Schedule", zh: "日程安排" },
  "data/tasks.json": { ja: "タスク定義", en: "Task Definitions", zh: "任务定义" },
  "master/company.json": { ja: "会社情報", en: "Company Info", zh: "公司信息" },
  "master/services.json": { ja: "サービス一覧", en: "Service List", zh: "服务列表" },
  "garoop-tv/channels.json": { ja: "TVチャンネル一覧", en: "TV Channels", zh: "电视频道列表" },
  "feeds/releases.json": { ja: "リリース情報", en: "Release Notes", zh: "发布信息" },
  "articles/index.json": { ja: "記事インデックス", en: "Article Index", zh: "文章索引" },
  "blog/index.json": { ja: "ブログ記事一覧", en: "Blog Posts", zh: "博客文章列表" },
  "blog/ai_kids_land/index.json": { ja: "AI Kids Land ブログ", en: "AI Kids Land Blog", zh: "AI Kids Land 博客" },
};

// ─── Lesson topic labels ──────────────────────────────────────────────────────

export const LESSON_TOPIC_META: Record<string, { ja: string; en: string; zh: string; emoji: string }> = {
  ai: { ja: "AI入門", en: "Intro to AI", zh: "AI入门", emoji: "🤖" },
  applied_ai: { ja: "応用AI", en: "Applied AI", zh: "应用AI", emoji: "🧠" },
  branding: { ja: "ブランディング", en: "Branding", zh: "品牌策略", emoji: "🎨" },
  chiho_sosei: { ja: "地方創生", en: "Community Dev", zh: "地方创生", emoji: "🏘️" },
  cybersecurity: { ja: "サイバーセキュリティ", en: "Cybersecurity", zh: "网络安全", emoji: "🔐" },
  finance: { ja: "ファイナンス", en: "Finance", zh: "金融", emoji: "💰" },
  game: { ja: "ゲーム開発", en: "Game Dev", zh: "游戏开发", emoji: "🎮" },
  go: { ja: "Go言語", en: "Go Language", zh: "Go语言", emoji: "🐹" },
  javascript: { ja: "JavaScript", en: "JavaScript", zh: "JavaScript", emoji: "🟨" },
  kosodate: { ja: "子育て", en: "Parenting", zh: "育儿", emoji: "👶" },
  math: { ja: "数学", en: "Mathematics", zh: "数学", emoji: "📐" },
  picturebook: { ja: "絵本", en: "Picture Books", zh: "绘本", emoji: "📖" },
  python: { ja: "Python", en: "Python", zh: "Python", emoji: "🐍" },
  software: { ja: "ソフトウェア開発", en: "Software Dev", zh: "软件开发", emoji: "💻" },
  startup: { ja: "スタートアップ", en: "Startup", zh: "创业", emoji: "🚀" },
  technology: { ja: "テクノロジー", en: "Technology", zh: "技术", emoji: "⚡" },
  nagasaki: { ja: "長崎", en: "Nagasaki", zh: "长崎", emoji: "🏯" },
  default: { ja: "その他", en: "Other", zh: "其他", emoji: "📄" },
};

export function getLessonTopicMeta(topic: string) {
  return LESSON_TOPIC_META[topic] ?? { ja: topic, en: topic, zh: topic, emoji: "📄" };
}

// ─── File display name ────────────────────────────────────────────────────────

export function getFileLabel(relativePath: string, locale: Locale): string {
  if (FILE_LABELS[relativePath]) return FILE_LABELS[relativePath][locale];

  // Lesson stories: derive from topic
  if (relativePath.startsWith("lesson-stories/")) {
    const fileName = relativePath.split("/").pop()?.replace(".json", "") ?? "";
    const topicKey = fileName.replace(/_\d+$/, "");
    const meta = getLessonTopicMeta(topicKey);
    // Include episode number if present
    const epMatch = fileName.match(/_(\d+)$/);
    const ep = epMatch ? ` #${parseInt(epMatch[1], 10)}` : "";
    return meta[locale] + ep;
  }

  // Fallback: clean up the file name
  const fileName = relativePath.split("/").pop()?.replace(".json", "") ?? "";
  return fileName
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
