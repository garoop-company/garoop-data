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

function fail(message) {
    console.error(message);
    process.exit(1);
}

function loadJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseJsonFromResponse(raw) {
    const trimmed = raw.trim();
    if (!trimmed) {
        fail("Codex response is empty.");
    }

    try {
        return JSON.parse(trimmed);
    } catch {
        const block = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
        if (!block) {
            fail("Failed to parse Codex response as JSON.");
        }
        try {
            return JSON.parse(block[1].trim());
        } catch {
            fail("Failed to parse fenced JSON from Codex response.");
        }
    }
}

function toMinutes(hhmm) {
    const m = hhmm.match(/^(\d{2}):(\d{2})$/);
    if (!m) {
        return -1;
    }
    return Number(m[1]) * 60 + Number(m[2]);
}

const targetDate = getArg("--date");
const inputPath = getArg("--input");

if (!targetDate || !/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
    fail("Invalid or missing --date (expected YYYY-MM-DD)");
}
if (!inputPath) {
    fail("Missing --input path");
}
if (!fs.existsSync(inputPath)) {
    fail(`Input file not found: ${inputPath}`);
}

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const personnelPath = path.join(repoRoot, "public/data/personnel.json");
const tasksPath = path.join(repoRoot, "public/data/tasks.json");
const scheduleIndexPath = path.join(repoRoot, "public/data/schedule.json");
const dailyTasksPath = path.join(repoRoot, `public/data/daily/tasks/${targetDate}.json`);
const dailySchedulePath = path.join(repoRoot, `public/data/daily/schedules/${targetDate}.json`);

const personnel = loadJson(personnelPath);
const taskCatalog = loadJson(tasksPath);
const scheduleIndex = loadJson(scheduleIndexPath);
const responseRaw = fs.readFileSync(inputPath, "utf8");
const plan = parseJsonFromResponse(responseRaw);

if (plan.date !== targetDate) {
    fail(`Plan date mismatch. expected=${targetDate} actual=${plan.date}`);
}
if (!Array.isArray(plan.task_pool_updates)) {
    fail("task_pool_updates must be an array");
}
if (!plan.schedule || !Array.isArray(plan.schedule.blocks)) {
    fail("schedule.blocks must be an array");
}

const memberIds = new Set(personnel.map((p) => p.id));
const taskIds = new Set((taskCatalog.tasks || []).map((t) => t.id));
const moods = new Set(["FOCUSED", "CREATIVE", "OFF"]);

for (const update of plan.task_pool_updates) {
    if (!memberIds.has(update.member_id)) {
        fail(`Unknown member_id in task_pool_updates: ${update.member_id}`);
    }
    if (!Array.isArray(update.task_pool) || update.task_pool.length !== 3) {
        fail(`task_pool must contain exactly 3 items: ${update.member_id}`);
    }
    for (const task of update.task_pool) {
        if (typeof task.text !== "string" || !task.text.trim()) {
            fail(`task_pool.text must be non-empty: ${update.member_id}`);
        }
        if (!moods.has(task.mood)) {
            fail(`Invalid mood for ${update.member_id}: ${task.mood}`);
        }
    }
}

for (const block of plan.schedule.blocks) {
    if (toMinutes(block.start) < 0 || toMinutes(block.end) < 0) {
        fail(`Invalid time format in block: ${JSON.stringify(block)}`);
    }
    if (toMinutes(block.start) >= toMinutes(block.end)) {
        fail(`start must be before end: ${JSON.stringify(block)}`);
    }
    if (!taskIds.has(block.task_id)) {
        fail(`Unknown task_id in schedule: ${block.task_id}`);
    }
    if (!Array.isArray(block.assignees) || block.assignees.length === 0) {
        fail(`assignees must be non-empty: ${JSON.stringify(block)}`);
    }
    for (const id of block.assignees) {
        if (!memberIds.has(id)) {
            fail(`Unknown assignee id: ${id}`);
        }
    }
    if (block.meeting) {
        if (typeof block.meeting.title !== "string" || !block.meeting.title.trim()) {
            fail(`meeting.title must be non-empty: ${JSON.stringify(block)}`);
        }
        if (!Array.isArray(block.meeting.attendees) || block.meeting.attendees.length === 0) {
            fail(`meeting.attendees must be non-empty: ${JSON.stringify(block)}`);
        }
        for (const id of block.meeting.attendees) {
            if (!memberIds.has(id)) {
                fail(`Unknown attendee id: ${id}`);
            }
        }
    }
}

const updatesByMember = new Map(plan.task_pool_updates.map((u) => [u.member_id, u.task_pool]));
const updatedPersonnel = personnel.map((p) => {
    if (!updatesByMember.has(p.id)) {
        return p;
    }
    return {
        ...p,
        taskPool: updatesByMember.get(p.id)
    };
});

scheduleIndex[targetDate] = {
    blocks: plan.schedule.blocks
};
const sortedScheduleIndex = Object.fromEntries(
    Object.entries(scheduleIndex).sort(([a], [b]) => a.localeCompare(b))
);

const dailyTaskFile = {
    date: targetDate,
    generated_at: new Date().toISOString(),
    task_pool_updates: plan.task_pool_updates
};
const dailyScheduleFile = {
    date: targetDate,
    blocks: plan.schedule.blocks
};

fs.mkdirSync(path.dirname(dailyTasksPath), { recursive: true });
fs.mkdirSync(path.dirname(dailySchedulePath), { recursive: true });
fs.writeFileSync(personnelPath, `${JSON.stringify(updatedPersonnel, null, 4)}\n`);
fs.writeFileSync(scheduleIndexPath, `${JSON.stringify(sortedScheduleIndex, null, 4)}\n`);
fs.writeFileSync(dailyTasksPath, `${JSON.stringify(dailyTaskFile, null, 4)}\n`);
fs.writeFileSync(dailySchedulePath, `${JSON.stringify(dailyScheduleFile, null, 4)}\n`);

console.log(`Applied daily plan for ${targetDate}`);
console.log(`Updated: ${personnelPath}`);
console.log(`Updated: ${scheduleIndexPath}`);
console.log(`Created: ${dailyTasksPath}`);
console.log(`Created: ${dailySchedulePath}`);
