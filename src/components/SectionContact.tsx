"use client";

import useInView from "./useInView";

export default function SectionContact() {
  const { ref, inView } = useInView();

  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-28 lg:py-40" id="contact" ref={ref}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[250px] w-[300px] rounded-full bg-[#2bf2d1]/6 blur-[120px] sm:h-[350px] sm:w-[450px] sm:blur-[140px] lg:h-[400px] lg:w-[600px] lg:blur-[160px]" />
      </div>

      <div
        className={`relative mx-auto max-w-[620px] text-center transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h2
          className="mb-3 text-[24px] text-white sm:mb-4 sm:text-[34px] lg:text-[44px]"
          style={{ fontWeight: 700, lineHeight: 1.2 }}
        >
          Parlons ensemble de{" "}
          <span className="italic text-[#2bf2d1]">votre projet</span>
        </h2>

        <p
          className="mx-auto mb-8 max-w-[400px] px-2 text-[14px] text-[#dedede]/40 sm:mb-10 sm:max-w-[450px] sm:px-0 sm:text-[15px] lg:text-[16px]"
          style={{ lineHeight: 1.7 }}
        >
          Reservez un creneau de 30 minutes. On ecoute vos besoins, on vous
          propose une solution adaptee. Sans engagement.
        </p>

        <a
          href="https://calendly.com/motus-pocus"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-xl bg-[#2bf2d1] px-7 py-4 text-[15px] font-bold text-[#171717] transition-all duration-300 hover:bg-[#24d4bc] hover:shadow-[0_0_50px_rgba(43,242,209,0.4)] active:scale-95 sm:gap-3 sm:px-10 sm:py-5 sm:text-[16px] sm:hover:scale-[1.02]"
        >
          <svg className="h-4.5 w-4.5 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="hidden sm:inline">Reserver un appel decouverte</span>
          <span className="sm:hidden">Reserver un appel</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            &rarr;
          </span>
        </a>

        {/* Trust signals */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-[#dedede]/25 sm:mt-8 sm:gap-6 sm:text-[13px]">
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
