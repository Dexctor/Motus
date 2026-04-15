"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export default function SectionContact() {
  const calRef = useRef<HTMLDivElement>(null);
  const initedRef = useRef(false);

  useEffect(() => {
    function initCalendly() {
      if (initedRef.current || !calRef.current || !window.Calendly) return;
      initedRef.current = true;
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/motuspocus-lab/30min?hide_gdpr_banner=1&background_color=171717&text_color=dedede&primary_color=2bf2d1&locale=fr",
        parentElement: calRef.current,
      });
    }

    // If script already loaded
    if (window.Calendly) {
      initCalendly();
      return;
    }

    // Load script then init
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = initCalendly;
    document.head.appendChild(script);
  }, []);

  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-28 lg:py-40" id="contact">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[250px] w-[300px] rounded-full bg-[#2bf2d1]/6 blur-[120px] sm:h-[350px] sm:w-[450px] sm:blur-[140px] lg:h-[400px] lg:w-[600px] lg:blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[900px] text-center">
        <h2
          className="mb-3 text-[24px] text-white sm:mb-4 sm:text-[34px] lg:text-[44px]"
          style={{ fontWeight: 700, lineHeight: 1.2 }}
        >
          Parlons ensemble de{" "}
          <span className="italic text-[#2bf2d1]">votre projet</span>
        </h2>

        <p
          className="mx-auto mb-10 max-w-[450px] text-[14px] text-[#dedede]/40 sm:mb-12 sm:text-[15px] lg:text-[16px]"
          style={{ lineHeight: 1.7 }}
        >
          Reservez un creneau de 30 minutes. On ecoute vos besoins, on vous
          propose une solution adaptee. Sans engagement.
        </p>

        {/* Calendly container — init programmatically */}
        <div
          ref={calRef}
          className="mx-auto overflow-hidden rounded-2xl border border-white/[0.06]"
          style={{
            width: "100%",
            maxWidth: "480px",
            height: "1000px",
            filter: "invert(1) hue-rotate(180deg)",
          }}
        />

        {/* Trust signals */}
        <div className="mt-8 flex items-center justify-center gap-4 text-[11px] text-[#dedede]/25 sm:mt-10 sm:gap-6 sm:text-[13px]">
          <span className="flex items-center gap-1 sm:gap-1.5">
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Gratuit
          </span>
          <span className="flex items-center gap-1 sm:gap-1.5">
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            30 min
          </span>
          <span className="flex items-center gap-1 sm:gap-1.5">
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Sans engagement
          </span>
        </div>
      </div>
    </section>
  );
}
