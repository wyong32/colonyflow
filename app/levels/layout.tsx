import type { Metadata } from "next";
import { canonical, gameDescription, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colony Flow Levels Walkthroughs & Solutions July 2026",
  description: "Browse available Colony Flow level walkthroughs with video solutions, ant colony strategy tips, cube sorting routes, and puzzle guide updates.",
  keywords: ["Colony Flow levels", "Colony Flow walkthrough", "Colony Flow solutions", "level guide", "ant colony puzzle", "color sorting"],
  authors: [{ name: "Colony Flow Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/levels/"),
    siteName: SITE_NAME,
    title: 'Colony Flow Levels Walkthroughs & Solutions',
    description: gameDescription,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Colony Flow available level walkthroughs'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colony Flow Levels Walkthroughs & Solutions',
    description: 'Browse available Colony Flow level videos, puzzle routes, and cube sorting solutions.',
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
    canonical: canonical("/levels/")
  }
};

export default function LevelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
