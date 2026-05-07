import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Motus Pocus — Motion Design & Montage Video pour SaaS B2B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "20%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(var(--accent-rgb),0.08)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "15%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(var(--accent-rgb),0.06)",
            filter: "blur(80px)",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#dedede",
            letterSpacing: "0.05em",
            marginBottom: 24,
          }}
        >
          MOTUS POCUS
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(222,222,222,0.5)",
            marginBottom: 40,
          }}
        >
          Motion Design & Montage Video pour SaaS B2B
        </div>

        {/* Tagline */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "white",
            }}
          >
            Votre produit compris en
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "var(--color-accent)",
            }}
          >
            moins de 30 secondes
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 16,
            color: "rgba(222,222,222,0.3)",
          }}
        >
          <span>motus-pocus.com</span>
          <span>•</span>
          <span>A partir de 500€</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
