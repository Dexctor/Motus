"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { VideoTag, VideoTagOrUntagged } from "@/lib/r2";

type VideoActionsProps = {
  videoKey: string;
  currentTag: VideoTagOrUntagged;
};

const TAG_LABELS: Record<VideoTag, string> = {
  motion: "Motion Design",
  montage: "Montage Vidéo",
};

export default function VideoActions({ videoKey, currentTag }: VideoActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function moveTo(toTag: VideoTag) {
    if (isLoading || currentTag === toTag) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/manage/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromKey: videoKey, toTag }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Échec du déplacement.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur.");
    } finally {
      setIsLoading(false);
    }
  }

  async function remove() {
    if (isLoading) return;
    if (!window.confirm("Supprimer définitivement cette vidéo ?")) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/manage/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: videoKey }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Échec de la suppression.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur.");
      setIsLoading(false);
    }
  }

  const tags: VideoTag[] = ["motion", "montage"];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {tags
          .filter((t) => t !== currentTag)
          .map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => moveTo(t)}
              disabled={isLoading}
              className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white hover:border-[#2bf2d1]/50 hover:bg-[#2bf2d1]/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              → {TAG_LABELS[t]}
            </button>
          ))}
        <button
          type="button"
          onClick={remove}
          disabled={isLoading}
          className="rounded-md border border-red-500/30 bg-red-500/5 px-3 py-1.5 text-[12px] text-red-300 hover:border-red-500/60 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Supprimer
        </button>
      </div>
      {error && <p className="text-[12px] text-red-300">{error}</p>}
    </div>
  );
}
