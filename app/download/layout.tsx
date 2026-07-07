import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download Colony Flow - iOS & Android July 2026",
  description: "Download Colony Flow for iOS and Android. Play the relaxing ant colony puzzle with colorful cube sorting, smart slot planning, and pixel art rewards.",
  keywords: ["Download Colony Flow", "Colony Flow iOS", "Colony Flow Android", "ant puzzle game download", "color sorting game"],
  authors: [{ name: "Colony Flow Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/download/"),
    siteName: SITE_NAME,
    title: 'Download Colony Flow - iOS & Android',
    description: 'Download Colony Flow and play relaxing ant colony cube sorting puzzles.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Download Colony Flow'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Colony Flow - iOS & Android',
    description: 'Download Colony Flow and play relaxing ant colony cube sorting puzzles.',
    images: [OG_IMAGE],
    creator: '@ColonyFlowGuide'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: canonical("/download/")
  }
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
