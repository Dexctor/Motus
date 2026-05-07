import ArrowIcon from "./ArrowIcon";

export default function SectionMontageVideo() {
  return (
    <section id="montage-video" className="relative w-full">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -left-[20%] top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(var(--accent-rgb),0.13),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-[5%] top-[10%] h-[450px] w-[450px] rounded-full bg-[radial-gradient(ellipse,rgba(var(--accent-rgb),0.10),transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center overflow-clip px-[46px] py-[21px]">
        <div className="flex w-full max-w-[1180px] flex-col items-center gap-[10px]">
          {/* Title row */}
          <div className="flex w-full items-center justify-center gap-[10px]">
            <ArrowIcon />
            <h2 className="w-full font-display text-[16px] text-light-gray">
              Montage Vidéo
            </h2>
          </div>

          {/* 2-column video grid */}
          <div className="grid w-[1210px] max-w-full grid-cols-2 gap-[20px] p-[10px]">
            <div className="relative h-[318px] overflow-hidden rounded-lg">
              <video
                src="https://assets.motus-pocus.com/MOTUS_First_Showreel_Ever.webm"
                className="absolute inset-0 size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            <div className="relative h-[318px] overflow-hidden rounded-lg">
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
        </div>
      </div>
    </section>
  );
}
