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

/* ─── Hero logo with mask reveal ─── */
export function MotusLogoHero({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth follow with lag
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 180, mass: 0.6 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 180, mass: 0.6 });

  // Opacity: spring-controlled for smooth fade in/out on enter/leave
  const rawOpacity = useMotionValue(0);
  const opacity = useSpring(rawOpacity, { damping: 30, stiffness: 300 });

  // Soft gradient mask — long fade for smooth edges
  const mask = useMotionTemplate`radial-gradient(circle 120px at ${smoothX}px ${smoothY}px, black 15%, transparent 75%)`;

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
      {/* Base: solid white logo — always visible */}
      <div className="absolute inset-0">
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
      </div>

      {/* Spacer for sizing */}
      <svg className="invisible h-full w-full" viewBox="0 0 407 75" preserveAspectRatio="xMidYMid meet">
        <rect width="407" height="75" fill="none" />
      </svg>

      {/* Overlay: clipped to logo shape only — no visible rectangle.
          Inside the mask circle: erases white fill, shows wireframe outline */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity, maskImage: mask, WebkitMaskImage: mask }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 407 75"
        >
          <defs>
            {/* Clip to letter shapes only — nothing outside the letters is visible */}
            <clipPath id="clip_letters_mask">
              {letters.map((letter) => (
                <path key={`clip-${letter.id}`} d={letter.d} />
              ))}
            </clipPath>
          </defs>

          {/* Dark fill ONLY inside the letter shapes — erases the white logo */}
          <g clipPath="url(#clip_letters_mask)">
            <rect width="407" height="75" fill="#171717" />
          </g>

          {/* Wireframe outlines + construction lines (these are outside clipPath so they show freely) */}
          {letters.map((letter) => (
            <path
              key={`w-${letter.id}`}
              d={letter.d}
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.7"
            />
          ))}
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
        </svg>
      </motion.div>
    </div>
  );
}
