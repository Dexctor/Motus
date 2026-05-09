import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import SectionValueProps from "@/components/SectionValueProps";
import SectionOffre from "@/components/SectionOffre";
import SectionContact from "@/components/SectionContact";
import Footer from "@/components/Footer";
import { listVideos, type Video } from "@/lib/r2";

export const revalidate = 300;

export default async function Home() {
  let motionVideos: Video[] = [];
  let montageVideos: Video[] = [];
  let presentationVideoUrl: string | undefined;
  let showreelVideoUrl: string | undefined;

  try {
    const videos = await listVideos();
    motionVideos = videos.filter((v) => v.tag === "motion");
    montageVideos = videos.filter((v) => v.tag === "montage");
    const presentation = videos.find((v) => /presentation/i.test(v.name) || /presentation/i.test(v.key));
    presentationVideoUrl = presentation?.url;
    const showreel = videos.find((v) => /showreel/i.test(v.name) || /showreel/i.test(v.key));
    showreelVideoUrl = showreel?.url;
  } catch (error) {
    console.error("[home] failed to list R2 videos:", error);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero presentationVideoUrl={presentationVideoUrl} showreelVideoUrl={showreelVideoUrl} />
      <ServicesSection motionVideos={motionVideos} montageVideos={montageVideos} />
      <SectionValueProps />
      <SectionOffre />
      <SectionContact />
      <Footer />
    </div>
  );
}
