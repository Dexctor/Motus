import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import SectionValueProps from "@/components/SectionValueProps";
import SectionPricing from "@/components/SectionPricing";
import SectionContact from "@/components/SectionContact";
import Footer from "@/components/Footer";
import VideoGallery from "@/components/video-gallery";
import { listVideos, type Video } from "@/lib/r2";

export const revalidate = 300;

export default async function Home() {
  let motion: Video[] = [];
  let montage: Video[] = [];

  try {
    const videos = await listVideos();
    motion = videos.filter((v) => v.tag === "motion");
    montage = videos.filter((v) => v.tag === "montage");
  } catch (error) {
    console.error("[home] failed to list R2 videos:", error);
  }

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <Navbar />
      <Hero />
      <ServicesSection />
      <VideoGallery
        videos={motion}
        title="Motion Design"
        sectionId="motion-design"
      />
      <VideoGallery
        videos={montage}
        title="Montage Vidéo"
        sectionId="montage-video"
      />
      <SectionValueProps />
      <SectionPricing />
      <SectionContact />
      <Footer />
    </div>
  );
}
