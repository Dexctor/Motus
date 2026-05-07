"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import type { Video } from "@/lib/r2";

type ServicesSectionProps = {
  motionVideos: Video[];
  montageVideos: Video[];
};

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
      <h3 className="text-[16px] font-medium text-white/80 sm:text-[18px] lg:text-[20px]">{title}</h3>
    </motion.div>
  );
}

/* ─── Carousel of VideoProject items ─── */
function VideoCarousel({ videos }: { videos: Video[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth;
    if (overflow <= 1) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }
    setCanPrev(el.scrollLeft > 1);
    setCanNext(el.scrollLeft < overflow - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateButtons, { passive: true });
    // ResizeObserver fires once on observe(), which performs the initial state computation.
    const ro = new ResizeObserver(updateButtons);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", updateButtons);
      ro.disconnect();
    };
  }, [updateButtons, videos.length]);

  function scrollByPage(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-6 sm:gap-7 sm:px-6 lg:gap-8 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {videos.map((v) => (
          <div
            key={v.key}
            className="w-[calc(100%-0px)] shrink-0 snap-start sm:w-[calc(50%-14px)] lg:w-[calc(50%-16px)]"
          >
            <VideoProject src={v.url} title={v.name} />
          </div>
        ))}
      </div>

      {canPrev && (
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Précédent"
          className="absolute left-0 top-[calc(50%-2rem)] z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:border-[#2bf2d1]/50 hover:text-white sm:left-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {canNext && (
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Suivant"
          className="absolute right-0 top-[calc(50%-2rem)] z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:border-[#2bf2d1]/50 hover:text-white sm:right-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ─── Main section ─── */
export default function ServicesSection({ motionVideos, montageVideos }: ServicesSectionProps) {
  if (motionVideos.length === 0 && montageVideos.length === 0) {
    return null;
  }

  return (
    <section id="services" className="px-5 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1100px]">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left sm:mb-20 sm:text-center lg:mb-24"
        >
          <h2 className="text-[22px] text-white sm:text-[28px] lg:text-[36px]" style={{ fontWeight: 600, lineHeight: 1.15 }}>
            Nos services
          </h2>
        </motion.div>

        {/* ── Motion Design ── */}
        {motionVideos.length > 0 && (
          <>
            <ServiceLabel title="Motion Design" />
            <div className="mb-20 sm:mb-28 lg:mb-32">
              <VideoCarousel videos={motionVideos} />
            </div>
          </>
        )}

        {/* ── Montage Vidéo ── */}
        {montageVideos.length > 0 && (
          <>
            <ServiceLabel title="Montage Vidéo" />
            <VideoCarousel videos={montageVideos} />
          </>
        )}

      </div>
    </section>
  );
}
