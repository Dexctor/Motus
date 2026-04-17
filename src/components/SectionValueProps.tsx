"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useInView from "./useInView";

/* ═══════════════════════════════════════════
   ANIMATED ICONS
   ═══════════════════════════════════════════ */

/* Eye icon: always open, widens with bounce on hover */
function EyeIcon({ hovered }: { hovered: boolean }) {
  return (
    <motion.svg
      className="h-20 w-20 sm:h-24 sm:w-24"
      viewBox="0 0 48 48"
      fill="none"
      animate={{ scale: hovered ? 1.3 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Eye outline — widens vertically on hover */}
      <motion.path
        animate={{
          d: hovered
            ? "M24 13C14 13 7 24 7 24C7 24 14 35 24 35C34 35 41 24 41 24C41 24 34 13 24 13Z"
            : "M24 14C14 14 7 24 7 24C7 24 14 34 24 34C34 34 41 24 41 24C41 24 34 14 24 14Z",
        }}
        stroke="#2bf2d1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />
      {/* Iris */}
      <motion.circle
        cx="24"
        cy="24"
        r="5"
        stroke="#2bf2d1"
        strokeWidth="2"
        fill="none"
        animate={{ r: hovered ? 6 : 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />
      {/* Pupil */}
      <circle cx="24" cy="24" r="2.5" fill="#2bf2d1" />
    </motion.svg>
  );
}

/* Lightning with explosive burst on hover */
function LightningIcon({ hovered }: { hovered: boolean }) {
  // 4 burst lines — from bolt edge outward
  const bursts = [
    { fromX: 31, fromY: 12, toX: 38, toY: 6 },   // top-right
    { fromX: 33, fromY: 32, toX: 40, toY: 38 },  // bottom-right
    { fromX: 15, fromY: 32, toX: 8, toY: 38 },   // bottom-left
    { fromX: 17, fromY: 12, toX: 10, toY: 6 },   // top-left
  ];

  return (
    <motion.svg
      className="h-20 w-20 sm:h-24 sm:w-24"
      viewBox="0 0 48 48"
      fill="none"
      style={{ overflow: "visible" }}
      animate={{ scale: hovered ? [1, 1.35, 1.18] : 1 }}
      transition={{ duration: 0.35, times: [0, 0.3, 1], ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Main bolt */}
      <motion.path
        d="M26 6L12 26H22L20 42L36 20H26L26 6Z"
        stroke="#2bf2d1"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
        animate={{
          rotate: hovered ? 3 : 0,
          fill: hovered ? "rgba(43,242,209,0.2)" : "rgba(43,242,209,0)",
        }}
        style={{ originX: "24px", originY: "24px" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* 4 burst lines — explode outward from bolt */}
      {bursts.map((b, i) => (
        <motion.line
          key={i}
          stroke="#2bf2d1"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{
            x1: b.fromX,
            y1: b.fromY,
            x2: hovered ? b.toX : b.fromX,
            y2: hovered ? b.toY : b.fromY,
            opacity: hovered ? [0, 0.8, 0] : 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
            delay: i * 0.04,
          }}
        />
      ))}
    </motion.svg>
  );
}

function GraphIcon({ mouseHovered }: { hovered: boolean; mouseHovered?: boolean }) {
  const bars = [
    { x: 8,  y1: 14, delay: 0 },
    { x: 13, y1: 9,  delay: 0.08 },
    { x: 18, y1: 5,  delay: 0.16 },
  ];

  return (
    <svg className="h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 24 24" fill="none" stroke="#2bf2d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v16a2 2 0 0 0 2 2h16" opacity={0.6} />
      {bars.map((bar, i) => (
        <motion.line
          key={i}
          x1={bar.x}
          x2={bar.x}
          y2={17}
          animate={{ y1: mouseHovered ? [bar.y1, bar.y1 - 4, bar.y1] : bar.y1 }}
          transition={{ delay: bar.delay, duration: 0.4, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CARD COMPONENT
   ═══════════════════════════════════════════ */

function ValueCard({
  title,
  description,
  IconComponent,
  index,
  inView,
}: {
  title: string;
  description: ReactNode;
  IconComponent: React.ComponentType<{ hovered: boolean; mouseHovered?: boolean }>;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (!isMobile || triggered) return;
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isMobile, triggered]);

  const effectiveHovered = hovered || (isMobile && triggered);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center rounded-2xl border border-white/[0.05] bg-[#161616] p-8 text-center transition-all duration-500 hover:border-white/[0.1] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-10"
    >
      {/* Icon */}
      <div className="mb-6 sm:mb-8">
        <IconComponent hovered={effectiveHovered} mouseHovered={hovered} />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-[22px] font-bold text-white sm:mb-3 sm:text-[26px]">
        {title}
      </h3>

      {/* Description */}
      <p className="max-w-[280px] text-[14px] leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400 sm:text-[16px]">
        {description}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const cards = [
  {
    IconComponent: EyeIcon,
    title: "Clarté",
    description: (
      <>Votre produit <span className="font-semibold text-white">compris</span> en moins de 30 secondes</>
    ),
  },
  {
    IconComponent: LightningIcon,
    title: "Impact",
    description: (
      <>Des vidéos qui <span className="font-semibold text-white">captivent</span> et marquent les esprits</>
    ),
  },
  {
    IconComponent: GraphIcon,
    title: "Conversion",
    description: (
      <>Vos visiteurs curieux deviennent des <span className="font-semibold text-white">utilisateurs</span> convaincus</>
    ),
  },
];

/* ═══════════════════════════════════════════
   SECTION
   ═══════════════════════════════════════════ */

export default function SectionValueProps() {
  const { ref, inView } = useInView();

  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-28 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-left sm:mb-16 sm:text-center"
        >
          <h2 className="text-[22px] text-white sm:text-[28px] lg:text-[36px]" style={{ fontWeight: 600, lineHeight: 1.15 }}>
            Ce qui fait la <span className="text-[#2bf2d1]">différence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <ValueCard
              key={card.title}
              title={card.title}
              description={card.description}
              IconComponent={card.IconComponent}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
