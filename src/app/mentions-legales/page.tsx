import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Legales",
  description: "Mentions legales du site motus-pocus.com",
};

export default function MentionsLegales() {
  return (
    <main className="mx-auto max-w-[700px] px-5 py-20 text-[#dedede]/70 sm:px-6 sm:py-28">
      <h1 className="mb-8 text-[28px] font-bold text-white sm:text-[36px]">Mentions legales</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-[18px] font-semibold text-white">Editeur du site</h2>
        <p>Motus Pocus</p>
        <p>Auto-entrepreneur</p>
        <p>SIRET : 832 410 278 00011</p>
        <p>Email : motuspocus.lab@gmail.com</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-[18px] font-semibold text-white">Hebergement</h2>
        <p>Vercel Inc.</p>
        <p>440 N Barranca Ave #4133</p>
        <p>Covina, CA 91723, USA</p>
        <p>https://vercel.com</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-[18px] font-semibold text-white">Propriete intellectuelle</h2>
        <p className="leading-relaxed">
          L&apos;ensemble du contenu de ce site (textes, images, videos, logos, animations) est la
          propriete exclusive de Motus Pocus, sauf mention contraire. Toute reproduction,
          representation, modification ou exploitation de tout ou partie du site sans autorisation
          prealable est interdite.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-[18px] font-semibold text-white">Responsabilite</h2>
        <p className="leading-relaxed">
          Motus Pocus s&apos;efforce d&apos;assurer l&apos;exactitude des informations presentes sur
          ce site. Toutefois, Motus Pocus ne peut garantir l&apos;exhaustivite ou l&apos;absence
          d&apos;erreurs. L&apos;utilisation des informations est faite sous la responsabilite de
          l&apos;utilisateur.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-[18px] font-semibold text-white">Contact</h2>
        <p>
          Pour toute question, contactez-nous a :{" "}
          <a href="mailto:motuspocus.lab@gmail.com" className="text-[#2bf2d1] hover:underline">
            motuspocus.lab@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
