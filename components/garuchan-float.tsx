"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const messagesJa = [
  "ここにあるデータ、\nつかってみてね！",
  "フォルダで\nしぼれるよ！",
  "ファイル名で\nさがせるよ✨",
  "Garoopの\nデータいっぱい！",
  "コピーボタンで\nURLをゲット！",
  "がるちゃん\nいつでもいるよ💕",
];

export function GaruchanFloat() {
  const [open, setOpen] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const lenRef = useRef(messagesJa.length);

  useEffect(() => {
    const id = setInterval(() => setMsgIdx((i) => (i + 1) % lenRef.current), 4000);
    return () => clearInterval(id);
  }, []);

  const handleClick = useCallback(() => {
    setOpen((v) => !v);
    setIsJumping(true);
    setShowHeart(true);
    setTimeout(() => setIsJumping(false), 600);
    setTimeout(() => setShowHeart(false), 1200);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      {/* Speech bubble */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative max-w-[200px] rounded-3xl rounded-br-sm border border-white/60 bg-white/90 px-5 py-4 shadow-[0_20px_60px_rgba(215,93,139,0.22)] backdrop-blur-md"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={msgIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="whitespace-pre-line text-sm font-semibold leading-relaxed text-[var(--ink-strong)]"
              >
                {messagesJa[msgIdx]}
              </motion.p>
            </AnimatePresence>
            {/* tail */}
            <span className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 rounded-br-sm border-b border-r border-white/60 bg-white/90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character wrapper */}
      <div className="relative cursor-pointer" onClick={handleClick}>
        {/* Pulsing glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, #fde68a 0%, #f9a8d4 60%, transparent 100%)",
            opacity: 0.55,
          }}
          animate={{ scale: [0.8, 1.15, 0.8] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />

        {/* Sparkles */}
        <motion.span
          className="pointer-events-none absolute -right-1 -top-3 z-20 text-xl"
          animate={{
            rotate: [0, 18, -18, 0],
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          ✨
        </motion.span>
        <motion.span
          className="pointer-events-none absolute -bottom-1 -left-2 z-20 text-base"
          animate={{
            rotate: [0, -12, 12, 0],
            scale: [0.7, 1.2, 0.7],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.9,
            ease: "easeInOut",
            delay: 0.9,
          }}
        >
          ⭐
        </motion.span>
        <motion.span
          className="pointer-events-none absolute left-0 top-6 z-20 text-sm"
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.1,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          💫
        </motion.span>

        {/* Character image */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88 }}
          className="relative z-10"
        >
          {isJumping ? (
            <motion.div
              animate={{ rotate: [0, -18, 18, -12, 12, 0], y: [0, -20, 0] }}
              transition={{ duration: 0.55 }}
            >
              <Image
                src="/garuchan_stand.webp"
                alt="ガルちゃん"
                width={90}
                height={130}
                className="h-auto w-[90px] drop-shadow-[0_12px_28px_rgba(215,93,139,0.35)]"
              />
            </motion.div>
          ) : (
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 1.5, -1.5, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            >
              <Image
                src="/garuchan_stand.webp"
                alt="ガルちゃん"
                width={90}
                height={130}
                className="h-auto w-[90px] drop-shadow-[0_12px_28px_rgba(215,93,139,0.35)]"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Heart pop on click */}
        <AnimatePresence>
          {showHeart && (
            <motion.span
              key="heart"
              className="pointer-events-none absolute -top-8 left-1/2 z-30 -translate-x-1/2 text-2xl"
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -30, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              💕
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
