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
          <path
            key={letter.id}
            d={letter.d}
            fill={letter.id === "O" ? "var(--color-accent)" : "currentColor"}
          />
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
          const strokeDelay = i * 0.175;
          const fillDelay = strokeDelay + 0.42;
          const isO = letter.id === "O";
          const color = isO ? "var(--color-accent)" : "#dedede";
          const lastFillEnd = (letters.length - 1) * 0.175 + 0.42 + 0.35;
          const stretchDelay = lastFillEnd;
          const initialPath = isO ? svgPaths.logoOCircular : letter.d;
          const oIndex = letters.findIndex((l) => l.id === "O");
          const initialX = isO ? 0 : i < oIndex ? 15 : -15;
          const stretchTransition = {
            delay: stretchDelay,
            type: "spring" as const,
            stiffness: 600,
            damping: 18,
            mass: 0.6,
          };
          return (
            <motion.g
              key={letter.id}
              initial={{ x: initialX }}
              animate={{ x: 0 }}
              transition={stretchTransition}
            >
              <motion.path
                stroke={color}
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0, d: initialPath }}
                animate={{ pathLength: 1, opacity: 1, d: letter.d }}
                transition={{
                  pathLength: { delay: strokeDelay, duration: 0.56, ease: "easeInOut" },
                  opacity: { delay: strokeDelay, duration: 0.07 },
                  d: isO ? stretchTransition : { duration: 0 },
                }}
              />
              <motion.path
                fill={color}
                initial={{ opacity: 0, d: initialPath }}
                animate={{ opacity: 1, d: letter.d }}
                transition={{
                  opacity: { delay: fillDelay, duration: 0.35, ease: "easeInOut" },
                  d: isO ? stretchTransition : { duration: 0 },
                }}
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
