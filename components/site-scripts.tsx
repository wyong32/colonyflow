"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { AffiliateGlobalAds } from "@/components/ads/affiliate-ad";

export function SiteScripts() {
  const pathname = usePathname();

  if (pathname.startsWith("/find-level")) {
    return null;
  }

  return (
    <>
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
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4638984121333143"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <AffiliateGlobalAds />
    </>
  );
}
