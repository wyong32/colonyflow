import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us - ColonyFlow.org",
  description: "Contact ColonyFlow.org with Colony Flow level requests, walkthrough corrections, and site feedback.",
  keywords: ["Contact Colony Flow Guide", "feedback", "support", "level requests"],
  authors: [{ name: "Colony Flow Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/contact-us/"),
    siteName: SITE_NAME,
    title: 'Contact Us - ColonyFlow.org',
    description: 'Contact ColonyFlow.org with Colony Flow guide feedback and level requests.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Contact ColonyFlow.org' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - ColonyFlow.org',
    description: 'Contact ColonyFlow.org with Colony Flow guide feedback.',
    images: [OG_IMAGE],
    creator: '@ColonyFlowGuide'
  },
  alternates: { canonical: canonical("/contact-us/") }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
