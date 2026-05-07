import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialite",
  description: "Politique de confidentialite et gestion des cookies du site motus-pocus.com",
};

export default function Confidentialite() {
  return (
    <main className="mx-auto max-w-[700px] px-5 py-20 text-[#dedede]/70 sm:px-6 sm:py-28">
      <h1 className="mb-8 text-[28px] font-bold text-white sm:text-[36px]">
        Politique de confidentialite
      </h1>

      <section className="mb-8">
        <h2 className="mb-3 text-[18px] font-semibold text-white">Collecte des donnees</h2>
        <p className="leading-relaxed">
          Ce site ne collecte aucune donnee personnelle directement. Aucun formulaire de contact,
          aucun systeme d&apos;inscription, aucun cookie de tracking propre n&apos;est utilise.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-[18px] font-semibold text-white">Services tiers</h2>
        <p className="mb-3 leading-relaxed">
          Ce site utilise les services tiers suivants qui peuvent collecter des donnees :
        </p>
        <ul className="ml-4 list-disc space-y-2">
          <li>
            <strong className="text-white">Calendly</strong> — pour la prise de rendez-vous. Calendly
            collecte les informations que vous saisissez lors de la reservation (nom, email). Voir la{" "}
            <a
              href="https://calendly.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              politique de confidentialite de Calendly
            </a>
            .
          </li>
          <li>
            <strong className="text-white">Vercel</strong> — hebergeur du site. Vercel peut
            collecter des donnees de performance et d&apos;analyse anonymisees.
          </li>
          <li>
            <strong className="text-white">Cloudflare</strong> — CDN et DNS. Cloudflare peut traiter
            des donnees techniques (adresse IP) pour assurer la securite et la performance du site.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-[18px] font-semibold text-white">Cookies</h2>
        <p className="leading-relaxed">
          Ce site n&apos;utilise pas de cookies propres. Les services tiers mentionnes ci-dessus
          peuvent utiliser des cookies techniques necessaires a leur fonctionnement. Aucun cookie
          publicitaire ou de tracking n&apos;est utilise.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-[18px] font-semibold text-white">Vos droits (RGPD)</h2>
        <p className="leading-relaxed">
          Conformement au Reglement General sur la Protection des Donnees (RGPD), vous disposez
          d&apos;un droit d&apos;acces, de rectification, de suppression et de portabilite de vos
          donnees. Pour exercer ces droits, contactez-nous a :{" "}
          <a href="mailto:motuspocus.lab@gmail.com" className="text-accent hover:underline">
            motuspocus.lab@gmail.com
          </a>
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-[18px] font-semibold text-white">Mise a jour</h2>
        <p className="leading-relaxed">
          Cette politique de confidentialite peut etre modifiee a tout moment. Derniere mise a jour :
          avril 2026.
        </p>
      </section>
    </main>
  );
}
