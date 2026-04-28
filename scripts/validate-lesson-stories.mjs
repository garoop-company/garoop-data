/**
 * Validates all lesson story JSON files under public/lesson-stories/
 *
 * Required scene fields:
 *   id, type, duration, garuchanAnimation, speech, background
 *
 * Quiz scenes additionally require:
 *   quizQuestion, quizChoices (array, ≥2), quizCorrectIndex
 *
 * Run: node scripts/validate-lesson-stories.mjs
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const STORY_DIR = path.join(process.cwd(), "public", "lesson-stories");

const VALID_BACKGROUNDS = new Set([
  "space", "classroom", "forest", "city", "ocean", "candy",
  "dojo", "bamboo", "mountain", "temple", "spy", "hq", "lab", "jungle",
]);

const VALID_ANIMATIONS = new Set(["float", "bounce", "wave", "idle"]);
const VALID_TYPES = new Set(["intro", "lesson", "activity", "outro", "quiz"]);

function validateScene(scene, idx, filePath) {
  const errors = [];
  const prefix = `scene[${idx}]`;

  if (typeof scene.id !== "number") errors.push(`${prefix}.id must be a number`);
  if (!VALID_TYPES.has(scene.type)) errors.push(`${prefix}.type "${scene.type}" is not valid (${[...VALID_TYPES].join("|")})`);
  if (typeof scene.duration !== "number") errors.push(`${prefix}.duration must be a number`);
  if (!VALID_ANIMATIONS.has(scene.garuchanAnimation)) errors.push(`${prefix}.garuchanAnimation "${scene.garuchanAnimation}" is not valid`);
  if (typeof scene.speech !== "string") errors.push(`${prefix}.speech must be a string`);
  if (!VALID_BACKGROUNDS.has(scene.background)) errors.push(`${prefix}.background "${scene.background}" is not valid (${[...VALID_BACKGROUNDS].join("|")})`);

  if (scene.type === "quiz") {
    if (typeof scene.quizQuestion !== "string") errors.push(`${prefix}.quizQuestion must be a string (quiz scene)`);
    if (!Array.isArray(scene.quizChoices) || scene.quizChoices.length < 2) errors.push(`${prefix}.quizChoices must be an array with ≥2 items`);
    if (typeof scene.quizCorrectIndex !== "number") errors.push(`${prefix}.quizCorrectIndex must be a number`);
  }

  return errors;
}

function validateStory(data, filePath) {
  const errors = [];

  if (typeof data.title !== "string") errors.push("title must be a string");
  if (typeof data.description !== "string") errors.push("description must be a string");
  if (!VALID_BACKGROUNDS.has(data.bgTheme)) errors.push(`bgTheme "${data.bgTheme}" is not valid`);
  if (!Array.isArray(data.scenes) || data.scenes.length === 0) {
    errors.push("scenes must be a non-empty array");
    return errors;
  }

  for (let i = 0; i < data.scenes.length; i++) {
    const sceneErrors = validateScene(data.scenes[i], i, filePath);
    errors.push(...sceneErrors);
  }

  return errors;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else if (entry.name.endsWith(".json")) {
      files.push(full);
    }
  }
  return files;
}

let totalFiles = 0;
let totalErrors = 0;

try {
  const files = await walk(STORY_DIR);
  totalFiles = files.length;

  for (const filePath of files.sort()) {
    const rel = path.relative(process.cwd(), filePath);
    let data;
    try {
      data = JSON.parse(await readFile(filePath, "utf-8"));
    } catch (e) {
      console.error(`❌ ${rel}: JSON parse error — ${e.message}`);
      totalErrors++;
      continue;
    }

    const errors = validateStory(data, filePath);
    if (errors.length > 0) {
      console.error(`❌ ${rel}:`);
      for (const err of errors) console.error(`   • ${err}`);
      totalErrors += errors.length;
    }
  }
} catch (e) {
  if (e.code === "ENOENT") {
    console.log("No lesson-stories directory found. Skipping.");
    process.exit(0);
  }
  throw e;
}

if (totalErrors === 0) {
  console.log(`✅ ${totalFiles} lesson story file(s) validated — no issues found.`);
} else {
  console.error(`\n❌ ${totalErrors} error(s) found across ${totalFiles} file(s).`);
  process.exit(1);
}
