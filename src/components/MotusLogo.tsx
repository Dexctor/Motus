"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
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

/* ─── Hero logo: stroke draw animation ───
   1. Each letter's outline draws itself (pathLength 0→1)
   2. Then the fill fades in
   Result: looks like someone is writing/drawing the logo
*/
export function MotusLogoHero({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 180, mass: 0.6 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 180, mass: 0.6 });
  const rawOpacity = useMotionValue(0);
  const opacity = useSpring(rawOpacity, { damping: 30, stiffness: 300 });

  // Mask to reveal wireframe
  const maskReveal = useMotionTemplate`radial-gradient(circle 100px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;
  // Inverse mask to hide solid fill where wireframe shows
  const maskHide = useMotionTemplate`radial-gradient(circle 100px at ${smoothX}px ${smoothY}px, transparent 0%, black 100%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => rawOpacity.set(1)}
      onMouseLeave={() => rawOpacity.set(0)}
    >
      {/* Layer 1: Solid logo — inverse masked on hover (white disappears where cursor is) */}
      <motion.div
        style={{
          maskImage: maskHide,
          WebkitMaskImage: maskHide,
        }}
      >
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
      </motion.div>

      {/* Layer 2: Wireframe revealed where cursor is */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity, maskImage: maskReveal, WebkitMaskImage: maskReveal }}
      >
        <svg
          className="h-full w-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 407 75"
          style={{ overflow: "visible" }}
        >
          {/* Outline of each letter — dashed wireframe */}
          {letters.map((letter) => (
            <path
              key={`w-${letter.id}`}
              d={letter.d}
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.6"
            />
          ))}
          {/* Anchor dots at key vertices */}
          {[
            [0, 3], [85, 3], [42, 39],
            [92, 0], [197, 0], [144, 37],
            [199, 3], [264, 3], [231, 74],
            [269, 3], [338, 3], [303, 56],
            [344, 2], [407, 2], [375, 75],
          ].map(([cx, cy], i) => (
            <g key={`a-${i}`}>
              <circle cx={cx} cy={cy} r="2" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" />
              <circle cx={cx} cy={cy} r="0.7" fill="white" opacity="0.7" />
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
