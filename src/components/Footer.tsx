export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-5 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Left — copyright + email */}
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-[12px] text-[#dedede]/30 sm:text-[13px]">
              &copy; 2026 Motus Pocus &mdash; Auto-entrepreneur &middot; SIRET a venir
            </p>
            <a
              href="mailto:motuspocus.lab@gmail.com"
              className="text-[12px] text-[#dedede]/40 transition-colors hover:text-[#2bf2d1] sm:text-[13px]"
            >
              motuspocus.lab@gmail.com
            </a>
          </div>

          {/* Center — social links */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[11px] uppercase tracking-wider text-[#dedede]/25 sm:text-[12px]">
              Suivez-nous sur
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/motus_pocus/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] text-[#dedede]/40 transition-colors hover:text-white sm:text-[13px]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/ga%C3%ABl-dewas-a3156a89/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] text-[#dedede]/40 transition-colors hover:text-white sm:text-[13px]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right — legal links */}
          <div className="flex items-center justify-center gap-5 sm:gap-6">
            <a href="#" className="text-[12px] text-[#dedede]/30 transition-colors hover:text-[#dedede]/50 sm:text-[13px]">
              Mentions legales
            </a>
            <a href="#" className="text-[12px] text-[#dedede]/30 transition-colors hover:text-[#dedede]/50 sm:text-[13px]">
              Confidentialite
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
