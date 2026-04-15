"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import svgPaths from "./svg-paths";

const letters = [
  { d: svgPaths.logoM, id: "M" },
  { d: svgPaths.logoO, id: "O" },
  { d: svgPaths.logoT, id: "T" },
  { d: svgPaths.logoU, id: "U" },
  { d: svgPaths.logoS, id: "S" },
];

/* ─── Navbar logo: simple, no hover effect ─── */
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

/* ─── Hero logo: mask reveal with skeleton on hover ─── */
export function MotusLogoHero({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Layer 1: Normal solid white logo */}
      <motion.svg
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 407 75"
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, i) => (
          <motion.path
            key={letter.id}
            d={letter.d}
            fill="currentColor"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.8, filter: "blur(6px)" },
              visible: {
                opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
                transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          />
        ))}
      </motion.svg>

      {/* Layer 2: Blueprint revealed through circular mask */}
      <div
        className="absolute inset-[-20px]"
        style={{
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.15s",
          maskImage: `radial-gradient(circle 100px at ${mousePos.x + 20}px ${mousePos.y + 20}px, black 40%, transparent 65%)`,
          WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x + 20}px ${mousePos.y + 20}px, black 40%, transparent 65%)`,
        }}
      >
        {/* Dark backdrop for contrast */}
        <div className="absolute inset-0 bg-[#0d0d0d]/80" />

        {/* Grid lines */}
        <div className="absolute inset-[20px] overflow-hidden">
          {[10, 30, 50, 70, 90].map((pct) => (
            <div key={`v${pct}`} className="absolute bottom-0 top-0 w-[0.5px] bg-white/20" style={{ left: `${pct}%` }} />
          ))}
          {[0, 25, 50, 75, 100].map((pct) => (
            <div key={`h${pct}`} className="absolute left-0 right-0 h-[0.5px] bg-white/20" style={{ top: `${pct}%` }} />
          ))}
        </div>

        {/* Wireframe logo — thicker stroke, higher opacity */}
        <svg
          className="absolute inset-[20px] h-[calc(100%-40px)] w-[calc(100%-40px)]"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 407 75"
        >
          {letters.map((letter) => (
            <path
              key={`wire-${letter.id}`}
              d={letter.d}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              opacity="0.9"
            />
          ))}
          {/* Anchor points — bigger and brighter */}
          {[
            [0, 3], [85, 3], [42, 39],
            [92, 0], [197, 0], [144, 37],
            [199, 3], [264, 3], [231, 74],
            [269, 3], [338, 3], [303, 56],
            [344, 2], [407, 2], [375, 75],
          ].map(([cx, cy], i) => (
            <g key={`anchor-${i}`}>
              <circle cx={cx} cy={cy} r="3" fill="none" stroke="white" strokeWidth="0.8" opacity="0.7" />
              <circle cx={cx} cy={cy} r="1" fill="white" opacity="0.9" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
