"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  if (pathname === "/admin/login") return null;

  async function logout() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={isLoading}
      className="text-[13px] text-[#dedede]/70 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
    >
      {isLoading ? "…" : "Déconnexion"}
    </button>
  );
}
