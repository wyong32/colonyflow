import { Footer } from "@/components/footer";
import { DownloadHero } from "@/components/download/download-hero";
import { DownloadFeatures } from "@/components/download/download-features";
import { DownloadCTA } from "@/components/download/download-cta";
import { DownloadStats } from "@/components/download/download-stats";
import { AffiliateAd } from "@/components/ads/affiliate-ad";

export const metadata = {
  title: "Download Colony Flow - iOS & Android",
  description: "Download Colony Flow by ABI GLOBAL LTD. for iOS and Android. Play a relaxing ant colony puzzle with colorful cubes, smart sorting, and pixel art rewards.",
};

export default function DownloadPage() {
  return (
    <div>
      <DownloadCTA />
      <AffiliateAd placement="top" />
      <DownloadFeatures />
      <AffiliateAd placement="middle" />
      <DownloadHero />
      <AffiliateAd placement="bottom" />
      <DownloadStats />
      <Footer />
    </div>
  );
}
