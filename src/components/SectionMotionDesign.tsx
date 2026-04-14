import ArrowIcon from "./ArrowIcon";

export default function SectionMotionDesign() {
  return (
    <section
      id="motion-design"
      className="flex w-full flex-col items-center overflow-clip px-[46px] py-[21px]"
    >
      <div className="flex w-full max-w-[1180px] flex-col items-center gap-[10px]">
        {/* Title row */}
        <div className="flex w-full items-center justify-center gap-[10px]">
          <ArrowIcon />
          <h2 className="w-full font-display text-[16px] text-light-gray">
            Motion Design
          </h2>
        </div>

        {/* Video */}
        <div className="relative h-[381px] w-[673px] overflow-hidden rounded-lg">
          <video
            src="https://assets.motus-pocus.com/MOTUS_First_Showreel_Ever.webm"
            className="absolute inset-0 size-full object-cover"
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
