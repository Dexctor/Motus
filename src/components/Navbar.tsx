"use client";

import { useState, useEffect } from "react";
import MotusLogo from "./MotusLogo";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0a]/90 py-3 backdrop-blur-xl sm:py-4" : "bg-transparent py-4 sm:py-6"}`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 sm:px-6">
          <a href="#hero" aria-label="Retour en haut">
            <MotusLogo className="h-[20px] w-auto text-[#dedede] transition-opacity duration-200 hover:opacity-80 sm:h-[24px]" />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-5 sm:flex lg:gap-7">
            <a href="#services" className="text-[14px] text-[#dedede]/70 transition-colors hover:text-accent">
              Services
            </a>
            <a href="#pricing" className="text-[14px] text-[#dedede]/70 transition-colors hover:text-accent">
              Offres
            </a>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <MagneticButton>
                <a href="https://www.instagram.com/motus_pocus/" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full text-[#dedede]/50 transition-colors hover:text-accent">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://www.linkedin.com/in/ga%C3%ABl-dewas-a3156a89/" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full text-[#dedede]/50 transition-colors hover:text-accent">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </MagneticButton>
            </div>
            <MagneticButton>
              <a href="#contact" className="moving-border-wrap">
                <span className="moving-border-spinner" />
                <span className="btn-primary" style={{ padding: "8px 18px", fontSize: "12px" }}>
                  Réserver un appel
                </span>
              </a>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="-mr-2 flex flex-col gap-[5px] p-2 sm:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span
              className={`block h-[1.5px] w-5 origin-center bg-[#dedede] transition-all duration-300 ${mobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-[#dedede] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-5 origin-center bg-[#dedede] transition-all duration-300 ${mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl transition-all duration-300 sm:hidden ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="font-display text-[20px] font-semibold text-[#dedede]/80 transition-colors hover:text-accent"
          >
            Services
</a>
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="font-display text-[20px] font-semibold text-[#dedede]/80 transition-colors hover:text-accent"
          >
            Offres
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-[16px] font-bold text-white transition-all hover:bg-accent-hover"
          >
            Réserver un appel
          </a>
        </div>
      </div>
    </>
  );
}
