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

      {/* Layer 2: Blueprint / wireframe revealed through circular mask
          Shows construction lines, guides, and outline version of the logo */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.2s",
          maskImage: `radial-gradient(circle 90px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(circle 90px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
        }}
      >
        {/* Background: grid + guides behind the logo */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Horizontal guide lines */}
          <div className="absolute left-0 right-0 top-[15%] h-px bg-white/20" />
          <div className="absolute left-0 right-0 top-[50%] h-px bg-white/10" />
          <div className="absolute left-0 right-0 top-[85%] h-px bg-white/20" />
          {/* Vertical guide lines */}
          <div className="absolute bottom-0 left-[10%] top-0 w-px bg-white/10" />
          <div className="absolute bottom-0 left-[30%] top-0 w-px bg-white/10" />
          <div className="absolute bottom-0 left-[50%] top-0 w-px bg-white/10" />
          <div className="absolute bottom-0 left-[70%] top-0 w-px bg-white/10" />
          <div className="absolute bottom-0 left-[90%] top-0 w-px bg-white/10" />
        </div>

        {/* The logo as white outline (wireframe) */}
        <svg
          className="absolute inset-0 h-full w-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 407 75"
        >
          {letters.map((letter) => (
            <path
              key={`outline-${letter.id}`}
              d={letter.d}
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              opacity="0.6"
            />
          ))}
          {/* Anchor points on letter corners */}
          {[
            [0, 3], [85, 3], [42, 39], // M
            [92, 0], [197, 0], [144, 75], // O
            [199, 3], [264, 3], [231, 74], // T
            [269, 3], [338, 3], [303, 56], // U
            [344, 2], [407, 2], [375, 75], // S
          ].map(([cx, cy], i) => (
            <circle key={`dot-${i}`} cx={cx} cy={cy} r="1.5" fill="white" opacity="0.4" />
          ))}
        </svg>
      </div>
    </div>
  );
}
