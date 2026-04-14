"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import svgPaths from "./svg-paths";
import useInView from "./useInView";
import {
  ClarityScene,
  ImpactScene,
  SpeedScene,
  ConversionScene,
} from "./BentoAnimations";

/* ═══════════════════════════════════════════
   BENTO COMPONENTS
   ═══════════════════════════════════════════ */

function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid w-full auto-rows-[20rem] grid-cols-1 gap-4 sm:auto-rows-[22rem] sm:grid-cols-3 sm:gap-5 lg:gap-6">
      {children}
    </div>
  );
}

function BentoCard({
  name,
  description,
  Icon,
  Scene,
  className,
  index,
  inView,
}: {
  name: string;
  description: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  Scene: React.ComponentType<{ hovered: boolean }>;
  className?: string;
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group/bento relative col-span-1 flex cursor-default flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1a1a1a] transition-all duration-400 hover:border-[#2bf2d1]/25 hover:bg-[#1c1e1d] hover:shadow-[0_8px_50px_rgba(43,242,209,0.07),0_0_0_1px_rgba(43,242,209,0.08),inset_0_1px_0_rgba(255,255,255,0.04)] ${className || ""}`}
    >
      {/* Scene animation - reacts to hover */}
      <div className="pointer-events-none relative flex-1 opacity-60 transition-opacity duration-500 group-hover/bento:opacity-100">
        <Scene hovered={hovered} />
        {/* Edge fade: soft blur on all sides so the scene fades into the card */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,#1a1a1a_100%)] transition-opacity duration-500 group-hover/bento:bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_55%,#1c1e1d_100%)]" />
        {/* Bottom fade so scene blends into text area */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1a1a1a] to-transparent transition-colors duration-400 group-hover/bento:from-[#1c1e1d]" />
      </div>

      {/* Ambient teal glow behind the card - visible on hover */}
      <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-[#2bf2d1]/0 blur-xl transition-all duration-500 group-hover/bento:bg-[#2bf2d1]/[0.03] group-hover/bento:blur-2xl" />

      {/* Subtle noise texture for depth */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Top shine line on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2bf2d1]/0 to-transparent transition-all duration-500 group-hover/bento:via-[#2bf2d1]/20" />

      {/* Bottom content */}
      <div className="relative z-10 border-t border-white/[0.04] bg-[#1a1a1a]/80 p-5 backdrop-blur-sm transition-colors duration-400 group-hover/bento:bg-[#1c1e1d]/80 sm:p-6">
        <div className="flex items-start gap-3">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#2bf2d1]/60 transition-colors duration-300 group-hover/bento:text-[#2bf2d1] sm:h-6 sm:w-6" />
          <div>
            <h3 className="mb-1 text-[15px] font-semibold text-neutral-200 transition-colors duration-300 group-hover/bento:text-white sm:text-[16px]">
              {name}
            </h3>
            <p className="text-[12px] leading-relaxed text-neutral-500 transition-colors duration-300 group-hover/bento:text-neutral-400 sm:text-[13px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */

function ClarityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 100 72">
      <path clipRule="evenodd" d={svgPaths.clarity} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

function ImpactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 49.2812 98.5623">
      <path d={svgPaths.impact} fill="currentColor" />
    </svg>
  );
}

function SpeedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function GrowthIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 102 102">
      <g clipPath="url(#clip_conv_sm)">
        <path d={svgPaths.growth} fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip_conv_sm"><rect fill="white" height="102" width="102" /></clipPath>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const features = [
  {
    Icon: ClarityIcon,
    Scene: ClarityScene,
    name: "Clarte",
    description: (
      <>Votre produit <span className="font-semibold text-white">compris</span> en moins de 30 secondes</>
    ),
    className: "sm:col-span-2",
  },
  {
    Icon: ImpactIcon,
    Scene: ImpactScene,
    name: "Impact",
    description: (
      <>Des videos qui <span className="font-semibold text-white">captivent</span> et marquent les esprits</>
    ),
    className: "sm:col-span-1",
  },
  {
    Icon: SpeedIcon,
    Scene: SpeedScene,
    name: "Rapidite",
    description: (
      <>Livraison en <span className="font-semibold text-white">5 a 14 jours</span> selon la formule</>
    ),
    className: "sm:col-span-1",
  },
  {
    Icon: GrowthIcon,
    Scene: ConversionScene,
    name: "Conversion",
    description: (
      <>Vos visiteurs curieux deviennent des <span className="font-semibold text-white">utilisateurs</span> convaincus</>
    ),
    className: "sm:col-span-2",
  },
];

/* ═══════════════════════════════════════════
   SECTION
   ═══════════════════════════════════════════ */

export default function SectionValueProps() {
  const { ref, inView } = useInView();

  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-28 lg:py-36" ref={ref}>
      {/* Ambient background glow behind the whole grid */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2bf2d1]/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="mb-3 text-[12px] uppercase tracking-[0.2em] text-[#2bf2d1]/70 sm:text-[13px]" style={{ fontWeight: 600 }}>
            Pourquoi nous
          </p>
          <h2 className="text-[26px] text-white sm:text-[34px] lg:text-[40px]" style={{ fontWeight: 700, lineHeight: 1.15 }}>
            Ce qui fait la <span className="text-[#2bf2d1]">difference</span>
          </h2>
        </motion.div>

        <BentoGrid>
          {features.map((f, i) => (
            <BentoCard
              key={f.name}
              Icon={f.Icon}
              Scene={f.Scene}
              name={f.name}
              description={f.description}
              className={f.className}
              index={i}
              inView={inView}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
