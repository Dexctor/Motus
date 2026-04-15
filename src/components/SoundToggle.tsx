"use client";

import { useState, useEffect } from "react";

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    // Toggle muted on all videos
    document.querySelectorAll("video").forEach((v) => {
      v.muted = muted;
    });
  }, [muted]);

  return (
    <button
      onClick={() => setMuted(!muted)}
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a]/80 text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-[#2bf2d1]/30 hover:text-white sm:h-11 sm:w-11"
      aria-label={muted ? "Activer le son" : "Couper le son"}
    >
      {muted ? (
        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
}
