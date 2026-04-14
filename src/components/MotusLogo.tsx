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

/* ─── Navbar logo: subtle scale + lift on hover ─── */
export default function MotusLogo({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 407 75"
      whileHover={{ scale: 1.05, y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
    </motion.svg>
  );
}

/* ─── Hero logo: letters stagger in + whole SVG breathes on hover ─── */
export function MotusLogoHero({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 407 75"
      style={{ overflow: "visible" }}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.97 }}
    >
      {letters.map((letter, i) => (
        <motion.path
          key={letter.id}
          d={letter.d}
          fill="currentColor"
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
              scale: 0.8,
              filter: "blur(6px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                delay: 0.15 + i * 0.12,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
