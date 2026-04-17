"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MagneticButton({
  children,
  strength = 0.38,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Motion values for smooth interpolation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring that mimics gsap elastic.out(1, 0.45) feel
  const springX = useSpring(x, { damping: 28, stiffness: 120, mass: 0.5 });
  const springY = useSpring(y, { damping: 28, stiffness: 120, mass: 0.5 });

  // Respect accessibility — disable on touch or reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
