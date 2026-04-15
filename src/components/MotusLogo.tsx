"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
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
  const [isHovering, setIsHovering] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springy delayed position — follows mouse with soft lag
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Mask templates using spring values — radius 120px (1.5x bigger)
  const maskReveal = useMotionTemplate`radial-gradient(circle 120px at ${smoothX}px ${smoothY}px, black 30%, transparent 60%)`;
  const maskHide = useMotionTemplate`radial-gradient(circle 120px at ${smoothX}px ${smoothY}px, transparent 30%, black 60%)`;

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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        // Instantly jump springs to current position so no lingering animation
        smoothX.jump(mouseX.get());
        smoothY.jump(mouseY.get());
      }}
    >
      {/* Layer 1: Normal solid white logo — masked inversely on hover */}
      <motion.div
        className="absolute inset-0"
        style={isHovering ? {
          maskImage: maskHide,
          WebkitMaskImage: maskHide,
        } : undefined}
      >
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
      </motion.div>

      {/* Spacer to give the container its size (since both layers are absolute) */}
      <svg className="invisible h-full w-full" viewBox="0 0 407 75" preserveAspectRatio="xMidYMid meet">
        <rect width="407" height="75" fill="none" />
      </svg>

      {/* Layer 2: Wireframe revealed through circular mask with spring delay */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.15s",
          maskImage: maskReveal,
          WebkitMaskImage: maskReveal,
        }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 407 75"
        >
          {/* Wireframe outline of each letter */}
          {letters.map((letter) => (
            <path
              key={`wire-${letter.id}`}
              d={letter.d}
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.7"
            />
          ))}
          {/* Anchor points at letter vertices */}
          {[
            [0, 3], [85, 3], [42, 39],
            [92, 0], [197, 0], [144, 37],
            [199, 3], [264, 3], [231, 74],
            [269, 3], [338, 3], [303, 56],
            [344, 2], [407, 2], [375, 75],
          ].map(([cx, cy], i) => (
            <g key={`a-${i}`}>
              <circle cx={cx} cy={cy} r="2.5" fill="none" stroke="white" strokeWidth="0.6" opacity="0.5" />
              <circle cx={cx} cy={cy} r="0.8" fill="white" opacity="0.8" />
            </g>
          ))}
          {/* Horizontal + vertical construction lines through letter centers */}
          <line x1="0" y1="37.5" x2="407" y2="37.5" stroke="white" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4" />
          <line x1="42" y1="0" x2="42" y2="75" stroke="white" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4" />
          <line x1="144" y1="0" x2="144" y2="75" stroke="white" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4" />
          <line x1="231" y1="0" x2="231" y2="75" stroke="white" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4" />
          <line x1="303" y1="0" x2="303" y2="75" stroke="white" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4" />
          <line x1="375" y1="0" x2="375" y2="75" stroke="white" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 4" />
        </svg>
      </motion.div>
    </div>
  );
}
