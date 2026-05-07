"use client";

import Link from "next/link";
import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";

const MAX_SIZE = 500 * 1024 * 1024;
const ACCEPT = "video/webm,video/mp4,video/quicktime";

type Tag = "motion" | "montage";
type Status = "idle" | "uploading" | "success" | "error";

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

export default function UploadPage() {
  const [tag, setTag] = useState<Tag>("motion");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isUploading = status === "uploading";

  function pickFile(picked: File | null) {
    setError(null);
    if (!picked) {
      setFile(null);
      return;
    }
    if (!picked.type.startsWith("video/")) {
      setError("Le fichier doit être une vidéo.");
      return;
    }
    if (picked.size > MAX_SIZE) {
      setError(`Fichier trop volumineux (${formatSize(picked.size)}, max 500 Mo).`);
      return;
    }
    setFile(picked);
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    pickFile(e.target.files?.[0] ?? null);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setIsDragging(false);
    pickFile(e.dataTransfer.files?.[0] ?? null);
  }

  function onDragOver(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave() {
    setIsDragging(false);
  }

  function reset() {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file || isUploading) return;

    setStatus("uploading");
    setProgress(0);
    setError(null);

    try {
      const signRes = await fetch("/api/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag,
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!signRes.ok) {
        const payload = (await signRes.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Échec de la signature de l'upload.");
      }

      const { url } = (await signRes.json()) as { url: string; key: string };

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.upload.addEventListener("progress", (ev) => {
          if (ev.lengthComputable) {
            setProgress(Math.round((ev.loaded / ev.total) * 100));
          }
        });
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`Upload R2 échoué (HTTP ${xhr.status}).`));
        });
        xhr.addEventListener("error", () => reject(new Error("Erreur réseau pendant l'upload.")));
        xhr.addEventListener("abort", () => reject(new Error("Upload interrompu.")));
        xhr.send(file);
      });

      await fetch("/api/revalidate", { method: "POST" });

      setProgress(100);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-8 px-6 py-12">
      <div className="flex items-center justify-between text-[13px] text-[#dedede]/60">
        <Link href="/admin/manage" className="hover:text-[#2bf2d1]">
          → Gérer les vidéos existantes
        </Link>
      </div>

      <header className="flex flex-col gap-2">
        <h1 className="font-display text-[24px] text-white">Uploader une vidéo</h1>
        <p className="text-[14px] text-[#dedede]/60">
          La vidéo est envoyée directement vers Cloudflare R2 sans transiter par Vercel.
        </p>
      </header>

      {status === "success" ? (
        <div className="flex flex-col gap-4 rounded-lg border border-[#2bf2d1]/40 bg-[#2bf2d1]/10 p-6">
          <p className="text-[15px] text-white">
            Vidéo uploadée avec succès dans la catégorie{" "}
            <span className="font-semibold">{tag === "motion" ? "Motion Design" : "Montage Vidéo"}</span>.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-md bg-[#2bf2d1] px-4 py-2 text-[14px] font-medium text-[#171717] hover:bg-[#2bf2d1]/90"
            >
              Uploader une autre vidéo
            </button>
            <Link
              href="/admin/manage"
              className="rounded-md border border-white/20 px-4 py-2 text-[14px] text-white hover:border-white/40"
            >
              Gérer les vidéos
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <fieldset disabled={isUploading} className="flex flex-col gap-2">
            <label htmlFor="tag" className="text-[13px] text-[#dedede]/70">
              Catégorie
            </label>
            <select
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value as Tag)}
              className="rounded-md border border-white/15 bg-[#0d0d0d] px-3 py-2 text-[14px] text-white focus:border-[#2bf2d1] focus:outline-none"
            >
              <option value="motion">Motion Design</option>
              <option value="montage">Montage Vidéo</option>
            </select>
          </fieldset>

          <label
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-12 text-center transition-colors ${
              isDragging
                ? "border-[#2bf2d1] bg-[#2bf2d1]/5"
                : "border-white/20 hover:border-white/40"
            } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              onChange={onFileChange}
              disabled={isUploading}
              className="hidden"
            />
            {file ? (
              <>
                <p className="text-[14px] text-white">{file.name}</p>
                <p className="text-[12px] text-[#dedede]/50">{formatSize(file.size)}</p>
              </>
            ) : (
              <>
                <p className="text-[14px] text-white">Glissez une vidéo ici ou cliquez pour parcourir</p>
                <p className="text-[12px] text-[#dedede]/50">
                  .webm, .mp4 ou .mov — 500 Mo max
                </p>
              </>
            )}
          </label>

          {isUploading && (
            <div className="flex flex-col gap-2">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-[#2bf2d1] transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[12px] text-[#dedede]/60">Upload en cours… {progress}%</p>
            </div>
          )}

          {error && (
            <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!file || isUploading}
            className="rounded-md bg-[#2bf2d1] px-4 py-2 text-[14px] font-medium text-[#171717] hover:bg-[#2bf2d1]/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isUploading ? "Upload en cours…" : "Uploader"}
          </button>
        </form>
      )}
    </div>
  );
}
