export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-5 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-3 text-[12px] text-[#dedede]/30 sm:flex-row sm:gap-4 sm:text-[13px]">
        <p className="text-center sm:text-left">
          &copy; 2026 Motus Pocus &mdash; Auto-entrepreneur &middot; SIRET a
          venir
        </p>
        <div className="flex items-center gap-5 sm:gap-6">
          <a href="#" className="transition-colors hover:text-[#dedede]/50">
            Mentions legales
          </a>
          <a href="#" className="transition-colors hover:text-[#dedede]/50">
            Confidentialite
          </a>
        </div>
      </div>
    </footer>
  );
}
