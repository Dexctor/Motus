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
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#171717]/90 py-3 backdrop-blur-xl sm:py-4" : "bg-transparent py-4 sm:py-6"}`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 sm:px-6">
          <a href="#hero" aria-label="Retour en haut">
            <MotusLogo className="h-[20px] w-auto text-[#dedede] transition-opacity duration-200 hover:opacity-80 sm:h-[24px]" />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 sm:flex lg:gap-8">
            <a
              href="#services"
              className="text-[14px] text-[#dedede]/70 transition-colors hover:text-white"
            >
              Services
            </a>
            <a
              href="#pricing"
              className="text-[14px] text-[#dedede]/70 transition-colors hover:text-white"
            >
              Tarifs
            </a>
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2bf2d1] px-5 py-2.5 text-[14px] font-semibold text-[#171717] transition-all duration-200 hover:bg-[#24d4bc] hover:shadow-[0_0_20px_rgba(43,242,209,0.3)]"
              >
                Reserver un appel
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
        className={`fixed inset-0 z-40 bg-[#171717]/98 backdrop-blur-xl transition-all duration-300 sm:hidden ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="font-display text-[20px] font-semibold text-[#dedede]/80 transition-colors hover:text-white"
          >
            Services
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="font-display text-[20px] font-semibold text-[#dedede]/80 transition-colors hover:text-white"
          >
            Tarifs
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#2bf2d1] px-8 py-3.5 text-[16px] font-bold text-[#171717] transition-all hover:bg-[#24d4bc]"
          >
            Reserver un appel
          </a>
        </div>
      </div>
    </>
  );
}
