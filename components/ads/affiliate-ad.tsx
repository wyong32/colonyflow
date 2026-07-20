"use client";

import Script from "next/script";

type AffiliatePlacement = "top" | "middle" | "bottom";

const SMARTLINK_URL = "https://www.effectivecpmnetwork.com/fzkdrc2y?key=f8e8c3d5bc864a24a4c10534f8c94ef8";
const POPUNDER_SRC = "https://pl30443211.effectivecpmnetwork.com/2d/46/e2/2d46e23f3522f801cd9376c940bc6d29.js";
const SOCIAL_BAR_SRC = "https://pl30443214.effectivecpmnetwork.com/4b/c8/a7/4bc8a7e8375961a689236e30b1e8a618.js";
const NATIVE_BANNER_SRC = "https://pl30443212.effectivecpmnetwork.com/6bb3b5f90e5186ad3ced024660505c2f/invoke.js";
const NATIVE_CONTAINER_ID = "container-6bb3b5f90e5186ad3ced024660505c2f";

const BANNER_UNITS = {
  desktop: {
    key: "367744b5859bad2b8df0eb2dff45a100",
    width: 728,
    height: 90,
  },
  mobile: {
    key: "c3341a78f19a85b87a67a3c1691c36f4",
    width: 320,
    height: 50,
  },
} as const;

function bannerDocument(unit: typeof BANNER_UNITS.desktop | typeof BANNER_UNITS.mobile) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      html,body{margin:0;padding:0;width:100%;min-height:${unit.height}px;background:transparent;overflow:hidden;text-align:center;}
      body{display:flex;align-items:center;justify-content:center;}
    </style>
  </head>
  <body>
    <script>
      atOptions = {
        'key': '${unit.key}',
        'format': 'iframe',
        'height': ${unit.height},
        'width': ${unit.width},
        'params': {}
      };
    </script>
    <script src="https://www.highperformanceformat.com/${unit.key}/invoke.js"></script>
  </body>
</html>`;
}

function nativeDocument() {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      html,body{margin:0;padding:0;width:100%;min-height:260px;background:transparent;overflow:hidden;}
      #${NATIVE_CONTAINER_ID}{width:100%;min-height:250px;}
    </style>
  </head>
  <body>
    <script async="async" data-cfasync="false" src="${NATIVE_BANNER_SRC}"></script>
    <div id="${NATIVE_CONTAINER_ID}"></div>
  </body>
</html>`;
}

function BannerFrame({ variant }: { variant: "desktop" | "mobile" }) {
  const unit = BANNER_UNITS[variant];

  return (
    <iframe
      title={`Colony Flow sponsored ${variant} banner`}
      srcDoc={bannerDocument(unit)}
      width={unit.width}
      height={unit.height}
      scrolling="no"
      loading="lazy"
      className={variant === "desktop" ? "hidden max-w-full border-0 md:block" : "block max-w-full border-0 md:hidden"}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  );
}

export function AffiliateAd({ placement, className = "" }: { placement: AffiliatePlacement; className?: string }) {
  const isNative = placement === "middle";

  return (
    <section className={`my-8 flex w-full justify-center px-2 ${className}`} aria-label="Advertisement">
      <div className="flex w-full max-w-[970px] flex-col items-center justify-center gap-2 overflow-hidden text-center">
        {isNative ? (
          <iframe
            title="Colony Flow sponsored native banner"
            srcDoc={nativeDocument()}
            width="100%"
            height={280}
            scrolling="no"
            loading="lazy"
            className="w-full max-w-[970px] border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        ) : (
          <>
            <BannerFrame variant="desktop" />
            <BannerFrame variant="mobile" />
          </>
        )}
        <a
          href={SMARTLINK_URL}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Sponsored link
        </a>
      </div>
    </section>
  );
}

export function AffiliateGlobalAds() {
  return (
    <>
      <Script id="colonyflow-affiliate-popunder" src={POPUNDER_SRC} strategy="afterInteractive" />
      <Script id="colonyflow-affiliate-social-bar" src={SOCIAL_BAR_SRC} strategy="afterInteractive" />
    </>
  );
}
