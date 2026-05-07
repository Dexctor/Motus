// Section protégée par mot de passe (cf. README → "Administration du site").
// Le proxy.ts vérifie le cookie de session avant de servir ces routes.
import Link from "next/link";
import type { Metadata } from "next";
import AdminLogoutButton from "@/components/admin-logout-button";

export const metadata: Metadata = {
  title: "Espace admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-4">
          <Link href="/admin/upload" className="font-display text-[15px] text-white">
            Espace admin Motus
          </Link>
          <nav className="flex items-center gap-4 text-[13px] text-[#dedede]/70">
            <Link href="/admin/upload" className="hover:text-accent">
              Upload
            </Link>
            <Link href="/admin/manage" className="hover:text-accent">
              Gérer
            </Link>
            <Link href="/" className="hover:text-accent">
              ← Retour au site
            </Link>
            <AdminLogoutButton />
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
