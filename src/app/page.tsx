import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import SectionValueProps from "@/components/SectionValueProps";
import SectionPricing from "@/components/SectionPricing";
import SectionContact from "@/components/SectionContact";
import Footer from "@/components/Footer";
import { listVideos, type Video } from "@/lib/r2";

export const revalidate = 300;

export default async function Home() {
  let motionVideos: Video[] = [];
  let montageVideos: Video[] = [];

  try {
    const videos = await listVideos();
    motionVideos = videos.filter((v) => v.tag === "motion");
    montageVideos = videos.filter((v) => v.tag === "montage");
  } catch (error) {
    console.error("[home] failed to list R2 videos:", error);
  }

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <Navbar />
      <Hero />
      <ServicesSection motionVideos={motionVideos} montageVideos={montageVideos} />
      <SectionValueProps />
      <SectionPricing />
      <SectionContact />
      <Footer />
    </div>
  );
}
