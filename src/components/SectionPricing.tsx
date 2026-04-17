"use client";

import useInView from "./useInView";

interface Plan {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  delivery: string;
  note: string;
  option: { label: string; price: string };
  highlighted: boolean;
}

function PricingCard({ plan, inView, delay }: { plan: Plan; inView: boolean; delay: number }) {
  return (
    <div
      className={`group relative flex flex-col rounded-2xl transition-all duration-500 ${
        plan.highlighted
          ? "border-2 border-[#2bf2d1]/60 bg-gradient-to-b from-[#2bf2d1]/8 to-white/[0.02] shadow-[0_0_40px_rgba(43,242,209,0.1)] sm:scale-[1.03] sm:shadow-[0_0_60px_rgba(43,242,209,0.12)]"
          : "border border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12]"
      } ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2bf2d1] px-3.5 py-1 text-[10px] font-bold tracking-[0.05em] text-[#171717] sm:-top-3.5 sm:px-4 sm:text-[11px]">
          RECOMMANDÉ
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
        {/* Header */}
        <div className="mb-5 sm:mb-6">
          <h3 className="mb-2 text-[16px] text-white sm:mb-3 sm:text-[17px] lg:text-[18px]" style={{ fontWeight: 600 }}>
            {plan.name}
          </h3>
          <div className="mb-1.5 flex items-baseline gap-1 sm:mb-2">
            <span className="text-[32px] text-white sm:text-[36px] lg:text-[40px]" style={{ fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }}>
              {plan.price}
            </span>
            <span className="text-[16px] text-[#dedede]/40 sm:text-[18px] lg:text-[20px]" style={{ fontWeight: 500 }}>
              &euro;
            </span>
          </div>
          <p className="text-[13px] font-semibold text-[#2bf2d1] sm:text-[14px]">{plan.subtitle}</p>
        </div>

        {/* Divider */}
        <div className="mb-5 h-px bg-white/[0.06] sm:mb-6" />

        {/* Features */}
        <ul className="mb-5 flex-1 space-y-2.5 sm:mb-6 sm:space-y-3">
          {plan.features.map((f, fi) => (
            <li key={fi} className="flex items-start gap-2 sm:gap-2.5">
              <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2bf2d1] sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[13px] text-[#dedede]/60 sm:text-[14px]">{f}</span>
            </li>
          ))}
        </ul>

        {/* Meta */}
        <div className="mb-5 space-y-1 sm:mb-6 sm:space-y-1.5">
          <p className="text-[12px] text-[#dedede]/35 sm:text-[13px]">{plan.delivery}</p>
          {plan.note && <p className="text-[12px] text-[#dedede]/35 sm:text-[13px]">{plan.note}</p>}
        </div>

        {/* Option */}
        <div className="mb-5 rounded-lg border border-[#2bf2d1]/10 bg-[#2bf2d1]/5 px-3 py-2.5 text-center sm:mb-6 sm:px-4 sm:py-3">
          <p className="mb-0.5 text-[10px] font-bold tracking-[0.05em] text-[#2bf2d1] sm:text-[11px]">OPTION</p>
          <p className="text-[12px] text-[#dedede]/50 sm:text-[13px]">
            {plan.option.label}{" "}
            <span className="font-bold text-white">{plan.option.price}</span>
          </p>
        </div>

        {/* CTA */}
        <a
          href="https://calendly.com/motuspocus-lab/30min"
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full rounded-xl py-3 text-center text-[13px] transition-all duration-300 active:scale-95 sm:py-3.5 sm:text-[14px] ${
            plan.highlighted
              ? "bg-[#2bf2d1] text-[#171717] hover:bg-[#24d4bc] hover:shadow-[0_0_30px_rgba(43,242,209,0.3)]"
              : "border border-white/[0.08] bg-white/[0.05] text-white hover:bg-white/[0.08]"
          }`}
          style={{ fontWeight: 600 }}
        >
          Choisir {plan.name}
        </a>
      </div>
    </div>
  );
}

const plans: Plan[] = [
  {
    name: "Boost",
    price: "500",
    subtitle: "Ad pour réseaux sociaux",
    features: ["30 sec de motion design", "Format Vertical 9:16", "Sound design", "Voix off"],
    delivery: "Livré en 5-7 jours",
    note: "Script fourni par le client",
    option: { label: "2e format 16:9", price: "+ 250 \u20ac" },
    highlighted: false,
  },
  {
    name: "Scale",
    price: "950",
    subtitle: "Explainer vidéo ou promo produit",
    features: ["1 minute de motion design", "Format Horizontal 16:9", "Sound design", "Voix off"],
    delivery: "Livré en 10-14 jours",
    note: "Script fourni par le client",
    option: { label: "2e format 9:16", price: "+ 250 \u20ac" },
    highlighted: true,
  },
  {
    name: "Growth",
    price: "1 450",
    subtitle: "Vidéo + copywriting",
    features: ["1 minute de motion design", "Format horizontal 16:9", "Sound design", "Voix off", "Écriture du script"],
    delivery: "Livré en 18-25 jours",
    note: "",
    option: { label: "2e format 9:16", price: "+ 250 \u20ac" },
    highlighted: false,
  },
];

export default function SectionPricing() {
  const { ref, inView } = useInView();

  // On mobile, show Scale (recommended) first
  const mobilePlans = [plans[1], plans[0], plans[2]];

  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-28 lg:py-40" id="pricing" ref={ref}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[300px] w-[400px] rounded-full bg-[#2bf2d1]/8 blur-[140px] sm:h-[400px] sm:w-[600px] sm:blur-[180px] lg:h-[500px] lg:w-[800px] lg:blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1100px]">
        <div className={`mb-4 text-center transition-all duration-700 sm:mb-6 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <h2 className="mb-2 text-[22px] text-white sm:mb-3 sm:text-[28px] lg:text-[36px]" style={{ fontWeight: 600, lineHeight: 1.2 }}>
            Donnez du <span className="text-[#2bf2d1]">mouvement</span> à vos idées
          </h2>
          <p className="text-[15px] text-[#dedede]/40 sm:text-[18px] lg:text-[20px]">
            Choisissez le format qui correspond à{" "}
            <span className="font-semibold text-[#2bf2d1]">votre priorité</span>
          </p>
        </div>

        {/* Mobile: stacked, Scale first */}
        <div className="mt-10 flex flex-col gap-4 sm:hidden">
          {mobilePlans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} inView={inView} delay={0.1 + i * 0.1} />
          ))}
        </div>

        {/* Tablet + Desktop: 3-col grid */}
        <div className="hidden gap-4 sm:mt-14 sm:grid sm:grid-cols-3 lg:gap-5">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} inView={inView} delay={0.15 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
