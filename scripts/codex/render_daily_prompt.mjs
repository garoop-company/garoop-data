#!/usr/bin/env node

import fs from "fs";
import path from "path";

function getArg(name) {
    const idx = process.argv.indexOf(name);
    if (idx === -1 || idx + 1 >= process.argv.length) {
        return "";
    }
    return process.argv[idx + 1];
}

const targetDate = getArg("--date");
const outputPath = getArg("--output");

if (!targetDate || !/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
    console.error("Invalid or missing --date (expected YYYY-MM-DD)");
    process.exit(1);
}

if (!outputPath) {
    console.error("Missing --output");
    process.exit(1);
}

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const templatePath = path.join(repoRoot, "automation/codex/daily_prompt_template.md");
const personnelPath = path.join(repoRoot, "public/data/personnel.json");
const taskCatalogPath = path.join(repoRoot, "public/data/tasks.json");
const profilePath = path.join(repoRoot, "public/data/member-profiles.json");

const primaryMemberIds = [
    "representative",
    "designer",
    "engineer",
    "marketing",
    "tax_accountant",
    "labor_consultant",
    "ambassador_yui",
    "talent_uka"
];

const supportMemberIds = ["investigator", "coordinator", "negotiator", "backoffice"];

const template = fs.readFileSync(templatePath, "utf8");
const personnel = JSON.parse(fs.readFileSync(personnelPath, "utf8"));
const taskCatalog = JSON.parse(fs.readFileSync(taskCatalogPath, "utf8"));
const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));

const personnelById = new Map(personnel.map((p) => [p.id, p]));

const primaryMembers = primaryMemberIds
    .map((id) => personnelById.get(id))
    .filter(Boolean)
    .map((m) => ({ id: m.id, name: m.name, role: m.role }));

const supportMembers = supportMemberIds
    .map((id) => personnelById.get(id))
    .filter(Boolean)
    .map((m) => ({ id: m.id, name: m.name, role: m.role }));

const profileSummary = [...primaryMemberIds, ...supportMemberIds]
    .filter((id, idx, arr) => arr.indexOf(id) === idx)
    .map((id) => profiles[id])
    .filter(Boolean)
    .map((p) => ({
        id: p.id,
        name: p.name,
        role: p.role,
        skills: Array.isArray(p.skills) ? p.skills : []
    }));

const taskSummary = (taskCatalog.tasks || []).map((t) => ({
    id: t.id,
    name: t.name,
    category: t.category,
    default_duration: t.default_duration
}));

const rendered = template
    .replaceAll("{{TARGET_DATE}}", targetDate)
    .replace("{{PRIMARY_MEMBERS_JSON}}", JSON.stringify(primaryMembers, null, 2))
    .replace("{{SUPPORT_MEMBERS_JSON}}", JSON.stringify(supportMembers, null, 2))
    .replace("{{TASK_CATALOG_JSON}}", JSON.stringify(taskSummary, null, 2))
    .replace("{{PROFILE_SUMMARY_JSON}}", JSON.stringify(profileSummary, null, 2));

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, rendered);

console.log(`Prompt generated: ${outputPath}`);
