import { MotusLogoHero } from "./MotusLogo";
import MagneticButton from "./MagneticButton";
import VideoPlayer from "./VideoPlayer";

type HeroProps = {
  presentationVideoUrl?: string;
  showreelVideoUrl?: string;
};

export default function Hero({ presentationVideoUrl, showreelVideoUrl }: HeroProps = {}) {
  return (
    <section
      id="hero"
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
          <MotusLogoHero className="mx-auto h-[48px] w-auto text-[#dedede] drop-shadow-[0_0_40px_rgba(43,242,209,0.2)] sm:h-[80px] lg:h-[110px]" />
        </div>

        {/* Subtitle */}
        <p
          className="mb-4 text-[15px] text-[#dedede]/50 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.25s_forwards] sm:mb-6 sm:text-[18px] lg:text-[24px]"
          style={{ fontWeight: 400, letterSpacing: "0.02em" }}
        >
          Montage vidéo &amp; Motion Design pour SaaS B2B
        </p>

        {/* Headline — this is the real h1 for SEO */}
        <h1
          className="mx-auto mb-5 max-w-[750px] text-[22px] text-white opacity-0 animate-[fadeInUp_0.7s_ease-out_0.4s_forwards] sm:mb-10 sm:text-[30px] lg:text-[42px]"
          style={{ fontWeight: 700, lineHeight: 1.25 }}
        >
          Votre produit compris <br /> en{" "}
          <span className="text-[#2bf2d1]">moins de 30 secondes</span>
        </h1>

        {/* CTA */}
        <div className="opacity-0 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards]">
          <MagneticButton>
            <a href="#pricing" className="moving-border-wrap">
              <span className="moving-border-spinner" />
              <span className="btn-primary">
                Voir les offres
                <span>&rarr;</span>
              </span>
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Large videos stack */}
      <div className="relative z-20 mx-auto mt-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards] sm:gap-8 sm:px-6">
        {presentationVideoUrl && (
          <div className="relative overflow-hidden rounded-2xl bg-[#0d0d0d] shadow-[0_-20px_80px_rgba(0,0,0,0.6)]">
            <VideoPlayer
              src={presentationVideoUrl}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}
        {showreelVideoUrl && (
          <div className="relative overflow-hidden rounded-2xl bg-[#0d0d0d] shadow-[0_-20px_80px_rgba(0,0,0,0.6)]">
            <VideoPlayer
              src={showreelVideoUrl}
              className="aspect-video w-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
