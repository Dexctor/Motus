import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import SectionValueProps from "@/components/SectionValueProps";
import SectionPricing from "@/components/SectionPricing";
import SectionContact from "@/components/SectionContact";
import Footer from "@/components/Footer";
import SoundToggle from "@/components/SoundToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <Navbar />
      <SoundToggle />
      <Hero />
      <ServicesSection />
      <SectionValueProps />
      <SectionPricing />
      <SectionContact />
      <Footer />
    </div>
  );
}
