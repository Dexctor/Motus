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
    default: "Motus Pocus — Motion Design & Montage Vidéo pour SaaS B2B",
    template: "%s | Motus Pocus",
  },
  description:
    "Freelance motion design et montage vidéo pour SaaS B2B. Vidéos explicatives, ads pour réseaux sociaux, sound design.",
  keywords: [
    "motion design",
    "montage vidéo",
    "SaaS B2B",
    "vidéo explicative",
    "freelance motion designer",
    "animation produit",
    "video marketing",
    "sound design",
    "ads vidéo",
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
    title: "Motus Pocus — Motion Design & Montage Vidéo pour SaaS B2B",
    description:
      "Freelance motion design et montage vidéo pour SaaS B2B. Vidéos explicatives, ads, sound design.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 2400,
        height: 1600,
        alt: "Motus Pocus — Motion Design & Montage Vidéo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motus Pocus — Motion Design & Montage Vidéo pour SaaS B2B",
    description:
      "Freelance motion design et montage vidéo pour SaaS B2B.",
    images: ["/assets/og-image.png"],
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
