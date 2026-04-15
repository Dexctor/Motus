"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import useInView from "./useInView";

/* ═══════════════════════════════════════════
   ANIMATED ICONS
   ═══════════════════════════════════════════ */

/* Eye icon: opens on hover, closes on leave */
function EyeIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg className="h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 48 48" fill="none">
      {/* Eye outline */}
      <motion.path
        d="M24 14C14 14 7 24 7 24C7 24 14 34 24 34C34 34 41 24 41 24C41 24 34 14 24 14Z"
        stroke="#2bf2d1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Iris */}
      <motion.circle
        cx="24"
        cy="24"
        r="5"
        stroke="#2bf2d1"
        strokeWidth="2"
        fill="none"
        animate={{ r: hovered ? 5 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      {/* Pupil */}
      <motion.circle
        cx="24"
        cy="24"
        fill="#2bf2d1"
        animate={{ r: hovered ? 2.5 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
      />
      {/* Eyelid closing line (visible when not hovered) */}
      <motion.path
        d="M7 24H41"
        stroke="#2bf2d1"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ opacity: hovered ? 0 : 0.6, pathLength: hovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
}

/* Lightning with sparks on hover */
function LightningIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg className="h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 48 48" fill="none">
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
      {/* Sparks — only visible on hover */}
      {[
        { x1: 36, y1: 14, x2: 42, y2: 10 },
        { x1: 38, y1: 22, x2: 44, y2: 22 },
        { x1: 10, y1: 30, x2: 4, y2: 32 },
        { x1: 8, y1: 22, x2: 2, y2: 20 },
        { x1: 34, y1: 30, x2: 40, y2: 34 },
      ].map((spark, i) => (
        <motion.line
          key={i}
          x1={spark.x1}
          y1={spark.y1}
          x2={spark.x2}
          y2={spark.y2}
          stroke="#2bf2d1"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{
            opacity: hovered ? [0, 1, 0] : 0,
            pathLength: hovered ? [0, 1, 0] : 0,
          }}
          transition={{
            duration: 0.6,
            delay: hovered ? i * 0.08 : 0,
            repeat: hovered ? Infinity : 0,
            repeatDelay: 0.8,
          }}
        />
      ))}
    </svg>
  );
}

/* Conversion: diagonal arrow pointing up-right with a base line */
function GraphIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg className="h-20 w-20 sm:h-24 sm:w-24" viewBox="0 0 48 48" fill="none">
      {/* Base horizontal line */}
      <motion.line
        x1="6" y1="42" x2="42" y2="42"
        stroke="#2bf2d1"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ opacity: hovered ? 0.5 : 0.2 }}
        transition={{ duration: 0.3 }}
      />
      {/* Diagonal arrow shaft — from bottom-left to top-right */}
      <motion.line
        x1="10" y1="38" x2="38" y2="10"
        stroke="#2bf2d1"
        strokeWidth="2.5"
        strokeLinecap="round"
        animate={{ pathLength: hovered ? 1 : 0.4, opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Arrow head — two lines forming a V */}
      <motion.line
        x1="28" y1="10" x2="38" y2="10"
        stroke="#2bf2d1"
        strokeWidth="2.5"
        strokeLinecap="round"
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      />
      <motion.line
        x1="38" y1="10" x2="38" y2="20"
        stroke="#2bf2d1"
        strokeWidth="2.5"
        strokeLinecap="round"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -4 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      />
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
