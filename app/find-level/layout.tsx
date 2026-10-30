import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find Your Colony Flow Level by Screenshot",
  description: "Upload a Colony Flow board screenshot and compare it with available level guides. Your image stays on your device.",
  keywords: [
    "find Colony Flow level",
    "Colony Flow screenshot search",
    "Colony Flow level finder",
    "Colony Flow board match",
  ],
  alternates: { canonical: canonical("/find-level/") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonical("/find-level/"),
    siteName: SITE_NAME,
    title: "Find Your Colony Flow Level by Screenshot",
    description: "Compare a Colony Flow board screenshot with available level guides. Image matching runs on your device.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Colony Flow screenshot level finder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Colony Flow Level by Screenshot",
    description: "Compare a Colony Flow screenshot with available guides without uploading the image.",
    images: [OG_IMAGE],
  },
};

export default function FindLevelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
