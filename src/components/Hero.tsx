import { MotusLogoHero } from "./MotusLogo";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center overflow-visible"
      style={{ minHeight: "100vh" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[20%] h-[280px] w-[280px] rounded-full bg-[#2bf2d1]/12 blur-[100px] sm:left-[15%] sm:h-[400px] sm:w-[400px] sm:blur-[140px] lg:h-[500px] lg:w-[500px] lg:blur-[160px]" />
        <div className="absolute bottom-[25%] right-[5%] h-[220px] w-[220px] rounded-full bg-[#2bf2d1]/8 blur-[100px] sm:right-[10%] sm:h-[300px] sm:w-[300px] sm:blur-[120px] lg:h-[400px] lg:w-[400px] lg:blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(43,242,209,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(43,242,209,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] sm:bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[900px] px-5 pb-24 pt-[22vh] text-center sm:px-6 sm:pb-32 sm:pt-[26vh] lg:pb-40 lg:pt-[30vh]">
        {/* Logo */}
        <div className="mb-8 sm:mb-10">
          <MotusLogoHero className="mx-auto h-[48px] w-auto cursor-pointer text-[#dedede] drop-shadow-[0_0_40px_rgba(43,242,209,0.2)] sm:h-[80px] lg:h-[110px]" />
        </div>

        {/* Subtitle */}
        <h1
          className="mb-4 text-[15px] text-[#dedede]/50 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.25s_forwards] sm:mb-6 sm:text-[18px] lg:text-[24px]"
          style={{ fontFamily: "var(--font-manrope), sans-serif", fontWeight: 400, letterSpacing: "0.02em" }}
        >
          Montage video &amp; Motion Design pour SaaS B2B
        </h1>

        {/* Headline */}
        <p
          className="mx-auto mb-5 max-w-[750px] text-[22px] text-white opacity-0 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards] sm:mb-10 sm:text-[30px] lg:text-[42px]"
          style={{ fontWeight: 700, lineHeight: 1.25 }}
        >
          Votre produit compris en{" "}
          <span className="text-[#2bf2d1]">moins de 30 secondes</span>
        </p>

        {/* CTA */}
        <div className="opacity-0 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards]">
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-[#2bf2d1] px-7 py-3.5 text-[15px] font-bold text-[#171717] transition-all duration-300 hover:bg-[#24d4bc] hover:shadow-[0_0_40px_rgba(43,242,209,0.4)] active:scale-95 sm:px-8 sm:py-4 sm:text-[16px] sm:hover:scale-[1.02]"
          >
            Voir les offres
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>
      </div>

      {/* Large video peeking */}
      <div className="relative z-20 mx-auto mt-auto w-full max-w-[1200px] px-5 opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards] sm:px-6">
        <div className="relative overflow-hidden rounded-t-2xl border border-b-0 border-white/[0.08] bg-[#0d0d0d] shadow-[0_-20px_80px_rgba(0,0,0,0.6)]">
          <video
            src="https://assets.motus-pocus.com/MOTUS_First_Showreel_Ever.webm"
            className="aspect-video w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
}
