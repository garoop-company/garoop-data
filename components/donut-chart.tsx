"use client";

import { motion } from "framer-motion";

export type DonutSlice = {
  label: string;
  value: number;
  color: string;
  emoji?: string;
};

type DonutChartProps = {
  data: DonutSlice[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string;
};

export function DonutChart({
  data,
  size = 220,
  strokeWidth = 34,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - strokeWidth) / 2 - 2;
  const circumference = 2 * Math.PI * r;
  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (total === 0) return null;

  let accumulatedDeg = -90;

  const segments = data.map((slice) => {
    const pct = slice.value / total;
    const arcLen = pct * circumference;
    const startDeg = accumulatedDeg;
    accumulatedDeg += pct * 360;
    return { ...slice, arcLen, startDeg };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
      aria-hidden="true"
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={strokeWidth}
      />

      {/* Segments */}
      {segments.map((seg, i) => (
        <g key={i} transform={`rotate(${seg.startDeg}, ${cx}, ${cy})`}>
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            strokeDasharray={`${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - seg.arcLen }}
            transition={{
              duration: 1.1,
              delay: 0.15 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </g>
      ))}

      {/* Center text */}
      {centerValue && (
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            className="fill-[#5a3450] font-bold"
            style={{ fontSize: size * 0.14, fontFamily: "inherit" }}
          >
            {centerValue}
          </text>
          {centerLabel && (
            <text
              x={cx}
              y={cy + size * 0.1}
              textAnchor="middle"
              className="fill-[#8a6880]"
              style={{ fontSize: size * 0.07, fontFamily: "inherit" }}
            >
              {centerLabel}
            </text>
          )}
        </motion.g>
      )}
    </svg>
  );
}

// Legend to accompany the donut chart
type LegendProps = {
  items: DonutSlice[];
  total: number;
};

export function DonutLegend({ items, total }: LegendProps) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => {
        const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
        return (
          <motion.li
            key={item.label}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ background: item.color }}
            />
            <span className="flex-1 text-sm text-[var(--ink-soft)]">
              {item.emoji && <span className="mr-1">{item.emoji}</span>}
              {item.label}
            </span>
            <span className="text-xs font-semibold text-[var(--ink-strong)]">
              {pct}%
            </span>
            <span className="w-10 text-right text-xs text-[var(--ink-faint)]">
              {item.value.toLocaleString()}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
}
