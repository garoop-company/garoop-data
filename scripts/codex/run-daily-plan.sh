#!/usr/bin/env bash
set -euo pipefail

TARGET_DATE="${1:-}"
if [[ -z "$TARGET_DATE" ]]; then
  TARGET_DATE="$(TZ=Asia/Tokyo date +%F)"
fi

if [[ ! "$TARGET_DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "Invalid target date: $TARGET_DATE (expected YYYY-MM-DD)" >&2
  exit 1
fi

WORKDIR="$(cd "$(dirname "$0")/../.." && pwd)"
TMP_DIR="$WORKDIR/tmp/codex-daily/$TARGET_DATE"
PROMPT_FILE="$TMP_DIR/prompt.md"
OUTPUT_FILE="$TMP_DIR/codex_output.json"
mkdir -p "$TMP_DIR"

node "$WORKDIR/scripts/codex/render_daily_prompt.mjs" \
  --date "$TARGET_DATE" \
  --output "$PROMPT_FILE"

echo "Running Groq for $TARGET_DATE ..."
node "$WORKDIR/scripts/codex/call_groq_chat.mjs" \
  --prompt "$PROMPT_FILE" \
  --output "$OUTPUT_FILE"

if [[ ! -s "$OUTPUT_FILE" ]]; then
  echo "Codex output file is missing or empty: $OUTPUT_FILE" >&2
  exit 1
fi

node "$WORKDIR/scripts/codex/apply_daily_plan.mjs" \
  --date "$TARGET_DATE" \
  --input "$OUTPUT_FILE"

echo "$TARGET_DATE" > "$TMP_DIR/target_date.txt"
echo "Done. target_date=$TARGET_DATE"
