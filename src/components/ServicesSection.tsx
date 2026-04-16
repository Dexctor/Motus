"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

/* ─── Data ─── */
const motionDesignVideos = [
  { src: "https://assets.motus-pocus.com/OpaleAcquisition_MotionDesign_V1.webm", title: "Opale Acquisition" },
  { src: "https://assets.motus-pocus.com/DataFast%20V3.4_SoundDesign_MotusPocus.webm", title: "DataFast" },
];

const montageVideos = [
  { src: "https://assets.motus-pocus.com/VKS_VSL_V2.webm", title: "VK Studio" },
  { src: "https://assets.motus-pocus.com/Sinvestir_BlackRock_recrutement_GaelDewas.webm", title: "S'investir" },
];

/* ─── Single video with subtle scroll effects ─── */
function VideoProject({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ scale }} className="group">
      {/* Video — no overlay, no filter, clean */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
        <VideoPlayer
          src={src}
          className="aspect-video w-full object-cover"
        />
        {/* Subtle border that glows when in view */}
        <motion.div
          style={{ opacity: borderOpacity }}
          className="pointer-events-none absolute inset-0 rounded-xl border border-[#2bf2d1]/15 sm:rounded-2xl"
        />
      </div>

      {/* Title — clean, simple */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 text-[14px] text-white/50 sm:mt-5 sm:text-[15px]"
      >
        {title}
      </motion.p>
    </motion.div>
  );
}

/* ─── Service category label ─── */
function ServiceLabel({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-8 flex items-center gap-3 sm:mb-10"
    >
      <div className="h-px w-4 bg-[#2bf2d1]/30" />
      <h3 className="text-[20px] font-semibold text-white/80 sm:text-[24px] lg:text-[28px]">{title}</h3>
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function ServicesSection() {
  return (
    <section id="services" className="px-5 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1100px]">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <h2 className="text-[26px] text-white sm:text-[34px] lg:text-[42px]" style={{ fontWeight: 700, lineHeight: 1.15 }}>
            Nos services
          </h2>
        </motion.div>

        {/* ── Motion Design ── */}
        <ServiceLabel title="Motion Design" />
        <div className="mb-20 grid grid-cols-1 gap-6 sm:mb-28 sm:grid-cols-2 sm:gap-7 lg:mb-32 lg:gap-8">
          {motionDesignVideos.map((v) => (
            <VideoProject key={v.src} src={v.src} title={v.title} />
          ))}
        </div>

        {/* ── Montage Video ── */}
        <ServiceLabel title="Montage Video" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
          {montageVideos.map((v) => (
            <VideoProject key={v.src} src={v.src} title={v.title} />
          ))}
        </div>

      </div>
    </section>
  );
}
