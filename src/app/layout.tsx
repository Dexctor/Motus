import type { Metadata } from "next";
import localFont from "next/font/local";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const eudoxus = localFont({
  src: [
    { path: "../fonts/EudoxusSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/EudoxusSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/EudoxusSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/EudoxusSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/EudoxusSans-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-eudoxus",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://motus-pocus.com"),
  title: {
    default: "Motus Pocus — Motion Design & Montage Video pour SaaS B2B",
    template: "%s | Motus Pocus",
  },
  description:
    "Freelance motion design et montage video pour SaaS B2B. Videos explicatives, ads pour reseaux sociaux, sound design. Livraison en 5 a 25 jours. Devis a partir de 500€.",
  keywords: [
    "motion design",
    "montage video",
    "SaaS B2B",
    "video explicative",
    "freelance motion designer",
    "animation produit",
    "video marketing",
    "sound design",
    "ads video",
    "motus pocus",
  ],
  authors: [{ name: "Motus Pocus", url: "https://motus-pocus.com" }],
  creator: "Motus Pocus",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "https://motus-pocus.com",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://motus-pocus.com",
    siteName: "Motus Pocus",
    title: "Motus Pocus — Motion Design & Montage Video pour SaaS B2B",
    description:
      "Freelance motion design et montage video pour SaaS B2B. Videos explicatives, ads, sound design. A partir de 500€.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Motus Pocus — Motion Design & Montage Video",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motus Pocus — Motion Design & Montage Video pour SaaS B2B",
    description:
      "Freelance motion design et montage video pour SaaS B2B. A partir de 500€.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${eudoxus.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
