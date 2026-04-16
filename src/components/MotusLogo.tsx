"use client";

import { motion } from "framer-motion";
import svgPaths from "./svg-paths";

const letters = [
  { d: svgPaths.logoM, id: "M" },
  { d: svgPaths.logoO, id: "O" },
  { d: svgPaths.logoT, id: "T" },
  { d: svgPaths.logoU, id: "U" },
  { d: svgPaths.logoS, id: "S" },
];

/* ─── Navbar logo ─── */
export default function MotusLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 407 75"
    >
      <g clipPath="url(#clip_motus_nav)">
        {letters.map((letter) => (
          <path key={letter.id} d={letter.d} fill="currentColor" />
        ))}
      </g>
      <defs>
        <clipPath id="clip_motus_nav">
          <rect fill="white" height="75" width="407" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ─── Hero logo: stroke draw then fill ─── */
export function MotusLogoHero({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 407 75"
      >
        {letters.map((letter, i) => {
          const strokeDelay = i * 0.25;
          const fillDelay = strokeDelay + 0.6;
          return (
            <g key={letter.id}>
              <motion.path
                d={letter.d}
                stroke="#dedede"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { delay: strokeDelay, duration: 0.8, ease: "easeInOut" },
                  opacity: { delay: strokeDelay, duration: 0.1 },
                }}
              />
              <motion.path
                d={letter.d}
                fill="#dedede"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: fillDelay, duration: 0.5, ease: "easeOut" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
