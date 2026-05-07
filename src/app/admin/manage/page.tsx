import Link from "next/link";
import VideoActions from "@/components/video-actions";
import { listVideos, type Video, type VideoTagOrUntagged } from "@/lib/r2";

export const dynamic = "force-dynamic";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} Go`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

type SectionConfig = {
  tag: VideoTagOrUntagged;
  title: string;
  highlight?: boolean;
  emptyHint?: string;
  description?: string;
};

const SECTIONS: SectionConfig[] = [
  {
    tag: "untagged",
    title: "À classer",
    highlight: true,
    description:
      "Ces vidéos sont à la racine du bucket et n'apparaissent pas sur le site. Assigne-leur une catégorie.",
    emptyHint: "Aucune vidéo à classer.",
  },
  { tag: "motion", title: "Motion Design", emptyHint: "Aucune vidéo dans Motion Design." },
  { tag: "montage", title: "Montage Vidéo", emptyHint: "Aucune vidéo dans Montage Vidéo." },
];

export default async function ManagePage() {
  let videos: Video[] = [];
  let loadError: string | null = null;

  try {
    videos = await listVideos();
  } catch (error) {
    console.error("[admin/manage] failed to list R2 videos:", error);
    loadError = "Impossible de charger les vidéos depuis R2. Vérifie les variables d'environnement.";
  }

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10 px-6 py-12">
      <div className="flex items-center justify-between text-[13px] text-[#dedede]/60">
        <Link href="/admin/upload" className="hover:text-accent">
          ← Uploader une nouvelle vidéo
        </Link>
        <span>{videos.length} vidéo{videos.length > 1 ? "s" : ""}</span>
      </div>

      <header className="flex flex-col gap-2">
        <h1 className="font-display text-[24px] text-white">Gérer les vidéos</h1>
        <p className="text-[14px] text-[#dedede]/60">
          Change la catégorie d&apos;une vidéo ou supprime-la. Les changements se
          répercutent immédiatement sur la home après revalidation.
        </p>
      </header>

      {loadError && (
        <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-300">
          {loadError}
        </p>
      )}

      {SECTIONS.map((section) => {
        const items = videos.filter((v) => v.tag === section.tag);
        return (
          <section key={section.tag} className="flex flex-col gap-4">
            <div
              className={`flex flex-col gap-1 border-l-2 pl-3 ${
                section.highlight ? "border-accent" : "border-white/20"
              }`}
            >
              <h2
                className={`font-display text-[18px] ${
                  section.highlight ? "text-accent" : "text-white"
                }`}
              >
                {section.title} <span className="text-[#dedede]/50">({items.length})</span>
              </h2>
              {section.description && (
                <p className="text-[13px] text-[#dedede]/60">{section.description}</p>
              )}
            </div>

            {items.length === 0 ? (
              <p className="text-[13px] text-[#dedede]/40">{section.emptyHint}</p>
            ) : (
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((video) => (
                  <li
                    key={video.key}
                    className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-md bg-[#0d0d0d]">
                      <video
                        src={video.url}
                        className="absolute inset-0 size-full object-cover"
                        controls
                        preload="metadata"
                        playsInline
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[14px] text-white">{video.name}</p>
                      <p className="text-[12px] text-[#dedede]/50">
                        {formatSize(video.size)} · {formatDate(video.modified)}
                      </p>
                      <p className="font-mono text-[11px] text-[#dedede]/30 break-all">
                        {video.key}
                      </p>
                    </div>
                    <VideoActions
                      videoKey={video.key}
                      currentTag={video.tag}
                      currentName={video.name}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
