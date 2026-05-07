"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from");
  const redirectTo = fromParam && fromParam.startsWith("/admin") ? fromParam : "/admin/manage";

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading || !password) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Mot de passe incorrect.");
      }
      router.replace(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur.");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] text-[#dedede]/70">Mot de passe</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          autoFocus
          autoComplete="current-password"
          className="rounded-md border border-white/15 bg-[#0d0d0d] px-3 py-2 text-[14px] text-white focus:border-[#2bf2d1] focus:outline-none disabled:opacity-40"
        />
      </label>

      {error && (
        <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-[12px] text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading || !password}
        className="rounded-md bg-[#2bf2d1] px-4 py-2 text-[14px] font-medium text-[#171717] hover:bg-[#2bf2d1]/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[400px] flex-col justify-center px-6 py-12">
      <div className="flex flex-col gap-6 rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <header className="flex flex-col gap-1">
          <h1 className="font-display text-[20px] text-white">Espace admin</h1>
          <p className="text-[13px] text-[#dedede]/60">
            Entrez le mot de passe partagé pour accéder à l&apos;administration.
          </p>
        </header>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
