export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Motus Pocus",
    url: "https://motus-pocus.com",
    logo: "https://motus-pocus.com/og-image.png",
    description:
      "Freelance motion design et montage video pour SaaS B2B. Videos explicatives, ads pour reseaux sociaux, sound design.",
    email: "motuspocus.lab@gmail.com",
    priceRange: "500€ - 1450€",
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
    },
    sameAs: [
      "https://www.instagram.com/motus_pocus/",
      "https://www.linkedin.com/in/ga%C3%ABl-dewas-a3156a89/",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Motion Design & Montage Video",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Boost — Ad pour reseaux sociaux",
          price: "500",
          priceCurrency: "EUR",
          description:
            "30 secondes de motion design, format vertical 9:16, sound design, voix off. Livre en 5-7 jours.",
        },
        {
          "@type": "Offer",
          name: "Scale — Explainer video ou promo produit",
          price: "950",
          priceCurrency: "EUR",
          description:
            "1 minute de motion design, format horizontal 16:9, sound design, voix off. Livre en 10-14 jours.",
        },
        {
          "@type": "Offer",
          name: "Growth — Video + copywriting",
          price: "1450",
          priceCurrency: "EUR",
          description:
            "1 minute de motion design, format horizontal 16:9, sound design, voix off, ecriture du script. Livre en 18-25 jours.",
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Motus Pocus",
    url: "https://motus-pocus.com",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
