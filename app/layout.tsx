import type { Metadata } from "next";
import "./globals.css";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { GptAnchorAd, GptInterstitialAd, GptSideRailAds } from "@/components/ads/gpt-ad";
import Script from "next/script";
import { canonical, gameDescription, gameKeywords, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Colony Flow Walkthrough Guides, Level Solutions & Tips July 2026",
    template: `%s | ${SITE_NAME}`
  },
  description: `${gameDescription} Find updated walkthrough videos, level solutions, strategy tips, and download links for iOS and Android.`,
  keywords: gameKeywords,
  authors: [{ name: "Colony Flow Guide Team" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: canonical(),
    siteName: SITE_NAME,
    title: 'Colony Flow Walkthrough Guides, Level Solutions & Tips',
    description: gameDescription,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Colony Flow ant colony puzzle guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colony Flow Walkthrough Guides, Level Solutions & Tips',
    description: gameDescription,
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
    canonical: canonical()
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FTB2Y81LTE"
        />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FTB2Y81LTE');
            `,
          }}
        />
        <Script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4638984121333143"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="overflow-x-hidden bg-background font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="colony-flow-theme"
        >
          <SiteNavbar />
          <main className="min-h-screen bg-background">
            {children}
          </main>
          <GptAnchorAd />
          <GptSideRailAds />
          <GptInterstitialAd />
        </ThemeProvider>
      </body>
    </html>
  );
}
