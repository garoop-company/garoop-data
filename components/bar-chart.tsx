"use client";

import { motion } from "framer-motion";

export type BarItem = {
  label: string;
  value: number;
  emoji?: string;
  color?: string;
};

type BarChartProps = {
  data: BarItem[];
  maxLabel?: string;
};

const DEFAULT_COLORS = [
  "#f9a8d4",
  "#c4b5fd",
  "#93c5fd",
  "#6ee7b7",
  "#fcd34d",
  "#fca5a5",
  "#a5f3fc",
  "#d9f99d",
];

export function BarChart({ data, maxLabel }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex flex-col gap-2.5" role="list">
      {data.map((item, i) => {
        const pct = (item.value / max) * 100;
        const color = item.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];

        return (
          <motion.div
            key={item.label}
            role="listitem"
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: "easeOut" }}
          >
            {/* Emoji + label */}
            <div className="flex w-36 shrink-0 items-center gap-2 sm:w-44">
              {item.emoji && (
                <span className="text-base leading-none">{item.emoji}</span>
              )}
              <span className="truncate text-sm text-[var(--ink-soft)]">
                {item.label}
              </span>
            </div>

            {/* Bar */}
            <div className="relative flex-1 overflow-hidden rounded-full bg-white/60">
              <motion.div
                className="h-5 rounded-full"
                style={{ background: color }}
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{
                  delay: 0.2 + i * 0.05,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>

            {/* Value */}
            <motion.span
              className="w-10 shrink-0 text-right text-xs font-semibold text-[var(--ink-strong)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              {item.value.toLocaleString()}
              {maxLabel && i === 0 && (
                <span className="ml-0.5 text-[var(--ink-faint)]">{maxLabel}</span>
              )}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
