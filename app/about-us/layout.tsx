import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us - ColonyFlow.org",
  description: "Learn about ColonyFlow.org, an independent Colony Flow walkthrough and strategy guide site.",
  keywords: ["About Colony Flow Guide", "ColonyFlow.org", "puzzle game guide", "game walkthrough"],
  authors: [{ name: "Colony Flow Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/about-us/"),
    siteName: SITE_NAME,
    title: 'About Us - ColonyFlow.org',
    description: 'Learn about ColonyFlow.org, an independent Colony Flow walkthrough and strategy guide site.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'About ColonyFlow.org' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - ColonyFlow.org',
    description: 'Learn about ColonyFlow.org, an independent Colony Flow guide site.',
    images: [OG_IMAGE],
    creator: '@ColonyFlowGuide'
  },
  alternates: { canonical: canonical("/about-us/") }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
