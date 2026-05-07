"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { VideoTag, VideoTagOrUntagged } from "@/lib/r2";

type VideoActionsProps = {
  videoKey: string;
  currentTag: VideoTagOrUntagged;
  currentName: string;
};

const TAG_LABELS: Record<VideoTag, string> = {
  motion: "Motion Design",
  montage: "Montage Vidéo",
};

export default function VideoActions({ videoKey, currentTag, currentName }: VideoActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(currentName);

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

  function startRename() {
    setDraftName(currentName);
    setError(null);
    setIsEditingName(true);
  }

  function cancelRename() {
    setIsEditingName(false);
    setDraftName(currentName);
    setError(null);
  }

  async function submitRename(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;

    const trimmed = draftName.trim();
    if (!trimmed) {
      setError("Le nom ne peut pas être vide.");
      return;
    }
    if (trimmed === currentName) {
      setIsEditingName(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/manage/rename", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: videoKey, newName: trimmed }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Échec du renommage.");
      }
      setIsEditingName(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur.");
    } finally {
      setIsLoading(false);
    }
  }

  const tags: VideoTag[] = ["motion", "montage"];

  if (isEditingName) {
    return (
      <div className="flex flex-col gap-2">
        <form onSubmit={submitRename} className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            disabled={isLoading}
            autoFocus
            className="min-w-0 flex-1 rounded-md border border-white/15 bg-[#0d0d0d] px-2 py-1.5 text-[13px] text-white focus:border-accent focus:outline-none disabled:opacity-40"
            placeholder="Nouveau nom"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-accent px-3 py-1.5 text-[12px] font-medium text-white hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Valider
          </button>
          <button
            type="button"
            onClick={cancelRename}
            disabled={isLoading}
            className="rounded-md border border-white/15 px-3 py-1.5 text-[12px] text-white/80 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Annuler
          </button>
        </form>
        <p className="text-[11px] text-[#dedede]/40">
          Caractères autorisés : lettres, chiffres, _ - . (les espaces deviennent _).
        </p>
        {error && <p className="text-[12px] text-red-300">{error}</p>}
      </div>
    );
  }

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
              className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white hover:border-accent/50 hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              → {TAG_LABELS[t]}
            </button>
          ))}
        <button
          type="button"
          onClick={startRename}
          disabled={isLoading}
          className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white hover:border-accent/50 hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Renommer
        </button>
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
