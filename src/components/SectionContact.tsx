import MagneticButton from "./MagneticButton";

export default function SectionContact() {
  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-28 lg:py-40" id="contact">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[250px] w-[300px] rounded-full bg-accent/6 blur-[120px] sm:h-[350px] sm:w-[450px] sm:blur-[140px] lg:h-[400px] lg:w-[600px] lg:blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-[620px] text-left">
        <h2
          className="mb-3 text-[22px] text-white sm:mb-4 sm:text-[28px] lg:text-[36px]"
          style={{ fontWeight: 600, lineHeight: 1.2 }}
        >
          Parlons ensemble de{" "}
          <span className="text-accent">votre projet</span>
        </h2>

        <p
          className="mb-10 text-[14px] text-[#dedede]/40 sm:mb-12 sm:text-[15px] lg:text-[16px]"
          style={{ lineHeight: 1.7 }}
        >
          Réservez un créneau de 30 minutes.<br />
          On écoute vos besoins et on vous propose une solution adaptée.<br />
          Sans engagement.
        </p>

        {/* CTA — opens Calendly in new tab */}
        <div className="flex justify-center">
        <MagneticButton>
          <a
            href="https://calendly.com/motuspocus-lab/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="moving-border-wrap"
          >
            <span className="moving-border-spinner" />
            <span className="btn-primary" style={{ padding: "16px 36px", fontSize: "16px" }}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Réserver un appel
            </span>
          </a>
        </MagneticButton>
        </div>

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
