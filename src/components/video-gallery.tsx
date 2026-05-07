import ArrowIcon from "./ArrowIcon";
import type { Video } from "@/lib/r2";

type VideoGalleryProps = {
  videos: Video[];
  title: string;
  subtitle?: string;
  sectionId?: string;
};

export default function VideoGallery({
  videos,
  title,
  subtitle,
  sectionId,
}: VideoGalleryProps) {
  if (videos.length === 0) return null;

  return (
    <section
      id={sectionId}
      className="flex w-full flex-col items-center overflow-clip px-[46px] py-[21px]"
    >
      <div className="flex w-full max-w-[1180px] flex-col items-center gap-[20px]">
        <div className="flex w-full items-center justify-center gap-[10px]">
          <ArrowIcon />
          <h2 className="w-full font-display text-[16px] text-[#dedede]/80">
            {title}
          </h2>
        </div>

        {subtitle && (
          <p className="w-full text-[14px] text-[#dedede]/50">{subtitle}</p>
        )}

        <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <figure key={video.key} className="flex flex-col gap-[8px]">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-[#0d0d0d]">
                <video
                  src={video.url}
                  className="absolute inset-0 size-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>
              <figcaption className="text-[14px] text-[#dedede]/70">
                {video.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
