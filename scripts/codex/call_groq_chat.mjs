#!/usr/bin/env node

import fs from "fs";

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

const promptPath = getArg("--prompt");
const outputPath = getArg("--output");

if (!promptPath) {
    fail("Missing --prompt");
}
if (!outputPath) {
    fail("Missing --output");
}

const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const modelCandidates = [...new Set((process.env.GROQ_MODEL_CANDIDATES || model).split(",").map((value) => value.trim()).filter(Boolean))];
const endpoint = process.env.GROQ_API_BASE || "https://api.groq.com/openai/v1/chat/completions";
const prompt = fs.readFileSync(promptPath, "utf8");

if (!apiKey) {
    fail("Missing GROQ_API_KEY");
}

function isRateLimit(status, body) {
    return status === 429 || /rate limit|too many requests|rate_limit/i.test(body);
}

let lastError = "";

for (const candidate of modelCandidates) {
    const payload = {
        model: candidate,
        temperature: 0,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    };

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const body = await response.text();
        lastError = `Groq API error for ${candidate} (${response.status}): ${body}`;
        if (isRateLimit(response.status, body) && candidate !== modelCandidates[modelCandidates.length - 1]) {
            console.warn(`Groq rate limit hit for ${candidate}. Trying next model.`);
            continue;
        }
        fail(lastError);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content.trim()) {
        fail(`Groq response did not contain message content for ${candidate}`);
    }

    fs.writeFileSync(outputPath, content);
    console.log(`Groq output written with ${candidate}: ${outputPath}`);
    process.exit(0);
}

fail(lastError || "All Groq model candidates failed");
