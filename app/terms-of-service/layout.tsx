import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service - ColonyFlow.org",
  description: "Read the Terms of Service for using ColonyFlow.org and its Colony Flow walkthrough guides.",
  keywords: ["Terms of Service", "ColonyFlow.org", "terms and conditions", "legal"],
  authors: [{ name: "Colony Flow Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/terms-of-service/"),
    siteName: SITE_NAME,
    title: 'Terms of Service - ColonyFlow.org',
    description: 'Read the Terms of Service for ColonyFlow.org.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'ColonyFlow.org Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - ColonyFlow.org',
    description: 'Read the Terms of Service for ColonyFlow.org.',
    images: [OG_IMAGE],
    creator: '@ColonyFlowGuide'
  },
  alternates: { canonical: canonical("/terms-of-service/") }
};

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
