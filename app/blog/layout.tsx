import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colony Flow Blog - Guides, Tips & Strategy July 2026",
  description: "Read Colony Flow strategy articles, beginner tips, ant colony puzzle walkthrough notes, cube sorting advice, and level-solving guides.",
  keywords: ["Colony Flow blog", "Colony Flow guide", "Colony Flow tips", "ant puzzle strategy", "cube sorting walkthrough"],
  authors: [{ name: "Colony Flow Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/blog/"),
    siteName: SITE_NAME,
    title: 'Colony Flow Blog - Guides, Tips & Strategy',
    description: 'Read Colony Flow strategy articles, beginner tips, walkthrough notes, and cube sorting advice.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Colony Flow Blog'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colony Flow Blog - Guides, Tips & Strategy',
    description: 'Read Colony Flow strategy articles, beginner tips, and walkthrough notes.',
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
    canonical: canonical("/blog/")
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
