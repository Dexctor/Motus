"use client";

import { ReactNode, useState } from "react";
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
      animate={{ scale: hovered ? 1.08 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
    >
      {/* Eye outline — widens vertically on hover */}
      <motion.path
        animate={{
          d: hovered
            ? "M24 10C14 10 5 24 5 24C5 24 14 38 24 38C34 38 43 24 43 24C43 24 34 10 24 10Z"
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

/* Lightning with 4 burst lines on hover + zoom bounce */
function LightningIcon({ hovered }: { hovered: boolean }) {
  // 4 burst lines radiating from center (top-right, bottom-right, bottom-left, top-left)
  const bursts = [
    { x1: 30, y1: 18, x2: 38, y2: 10 },  // top-right
    { x1: 30, y1: 30, x2: 38, y2: 38 },  // bottom-right
    { x1: 18, y1: 30, x2: 10, y2: 38 },  // bottom-left
    { x1: 18, y1: 18, x2: 10, y2: 10 },  // top-left
  ];

  return (
    <motion.svg
      className="h-20 w-20 sm:h-24 sm:w-24"
      viewBox="0 0 48 48"
      fill="none"
      animate={{ scale: hovered ? 1.12 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
    >
      {/* Main bolt */}
      <motion.path
        d="M26 6L12 26H22L20 42L36 20H26L26 6Z"
        stroke="#2bf2d1"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
        animate={{ fill: hovered ? "rgba(43,242,209,0.15)" : "rgba(43,242,209,0)" }}
        transition={{ duration: 0.3 }}
      />
      {/* 4 burst lines — spread outward on hover */}
      {bursts.map((b, i) => (
        <motion.line
          key={i}
          x1={b.x1}
          y1={b.y1}
          x2={b.x1}
          y2={b.y1}
          stroke="#2bf2d1"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            x2: hovered ? b.x2 : b.x1,
            y2: hovered ? b.y2 : b.y1,
            opacity: hovered ? 0.8 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: i * 0.05,
          }}
        />
      ))}
    </motion.svg>
  );
}

/* Conversion: animated bar chart — bars grow one by one on hover */
function GraphIcon({ hovered }: { hovered: boolean }) {
  // 3 bars: small, medium, tall — each with its own y1 (top) and y2 (bottom=17)
  const bars = [
    { x: 8, y1Full: 14, y1Idle: 16.5, delay: 0 },     // short bar
    { x: 13, y1Full: 9, y1Idle: 15, delay: 0.1 },      // medium bar
    { x: 18, y1Full: 5, y1Idle: 14, delay: 0.2 },      // tall bar
  ];

  return (
    <svg className="h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 24 24" fill="none" stroke="#2bf2d1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Axes — L shape */}
      <path d="M3 3v16a2 2 0 0 0 2 2h16" opacity={hovered ? 0.6 : 0.3} />

      {/* Animated bars */}
      {bars.map((bar, i) => (
        <motion.line
          key={i}
          x1={bar.x}
          x2={bar.x}
          y1={bar.y1Full}
          y2={17}
          animate={{
            y1: hovered ? bar.y1Full : bar.y1Idle,
            opacity: hovered ? 1 : 0.3,
          }}
          transition={{
            duration: 0.5,
            delay: bar.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
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
  IconComponent: React.ComponentType<{ hovered: boolean }>;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center rounded-2xl border border-white/[0.05] bg-[#161616] p-8 text-center transition-all duration-500 hover:border-white/[0.1] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-10"
    >
      {/* Icon */}
      <div className="mb-6 sm:mb-8">
        <IconComponent hovered={hovered} />
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
    title: "Clarte",
    description: (
      <>Votre produit <span className="font-semibold text-white">compris</span> en moins de 30 secondes</>
    ),
  },
  {
    IconComponent: LightningIcon,
    title: "Impact",
    description: (
      <>Des videos qui <span className="font-semibold text-white">captivent</span> et marquent les esprits</>
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
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="text-[26px] text-white sm:text-[34px] lg:text-[40px]" style={{ fontWeight: 700, lineHeight: 1.15 }}>
            Ce qui fait la <span className="text-[#2bf2d1]">difference</span>
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
