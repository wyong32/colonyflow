"use client";

import { useEffect, useRef } from "react";

type GptSize = [number, number] | "fluid";
type GptSlot = {
  addService: (service: unknown) => GptSlot;
};
type GptSizeMappingBuilder = {
  addSize: (viewportSize: [number, number], slotSizes: GptSize[]) => GptSizeMappingBuilder;
  build: () => unknown;
};
type GptTag = {
  cmd: Array<() => void>;
  defineSlot: (adUnitPath: string, sizes: GptSize[], divId: string) => GptSlot | null;
  defineOutOfPageSlot?: (adUnitPath: string, format: unknown) => GptSlot | null;
  display: (divIdOrSlot: string | GptSlot) => void;
  destroySlots?: (slots: GptSlot[]) => void;
  enableServices: () => void;
  setConfig?: (config: {
    centering?: boolean;
    singleRequest?: boolean;
  }) => void;
  pubads: () => {
    enableSingleRequest?: () => void;
  };
  sizeMapping: () => GptSizeMappingBuilder;
  enums?: {
    OutOfPageFormat?: {
      BOTTOM_ANCHOR?: unknown;
      INTERSTITIAL?: unknown;
    };
  };
};

declare global {
  interface Window {
    googletag?: GptTag;
    __colonyflowGptServicesEnabled?: boolean;
    __gptAnchorSlot?: GptSlot | null;
    __gptInterstitialSlot?: GptSlot | null;
    __colonyflowGptInterstitialDisplayed?: boolean;
  }
}

const AD_UNITS = {
  anchor: "/23355878051/colonyflow.org_0713_all/colonyflow.org_0713_ahchor_1",
  bannerTop: "/23355878051/colonyflow.org_0713_all/colonyflow.org_0713_banner_1",
  bannerMiddle: "/23355878051/colonyflow.org_0713_all/colonyflow.org_0713_banner_2",
  bannerBottom: "/23355878051/colonyflow.org_0713_all/colonyflow.org_0713_banner_3",
  interstitial: "/23355878051/colonyflow.org_0713_all/colonyflow.org_0713_inter_1",
} as const;

type BannerPlacement = "top" | "middle" | "bottom";

const bannerPathByPlacement: Record<BannerPlacement, string> = {
  top: AD_UNITS.bannerTop,
  middle: AD_UNITS.bannerMiddle,
  bottom: AD_UNITS.bannerBottom,
};

function getGoogletag() {
  window.googletag = window.googletag || ({ cmd: [] } as unknown as GptTag);
  return window.googletag;
}

function enableGptServices(googletag: GptTag) {
  if (window.__colonyflowGptServicesEnabled) {
    return;
  }

  googletag.setConfig?.({
    centering: true,
    singleRequest: true,
  });

  const pubads = googletag.pubads();
  pubads.enableSingleRequest?.();
  googletag.enableServices();
  window.__colonyflowGptServicesEnabled = true;
}

interface GptAdProps {
  placement: BannerPlacement;
  className?: string;
}

export function GptAd({ placement, className = "" }: GptAdProps) {
  const slotRef = useRef<GptSlot | null>(null);
  const divId = `div-gpt-ad-colonyflow-${placement}`;

  useEffect(() => {
    let cancelled = false;
    const googletag = getGoogletag();

    googletag.cmd.push(() => {
      if (cancelled) {
        return;
      }

      const slot = googletag.defineSlot(
        bannerPathByPlacement[placement],
        [
          [970, 250],
          [300, 250],
        ],
        divId,
      );

      if (!slot) {
        return;
      }

      const mapping = googletag
        .sizeMapping()
        .addSize([1024, 0], [[970, 250]])
        .addSize([0, 0], [[300, 250]])
        .build();

      (slot as GptSlot & { defineSizeMapping?: (mapping: unknown) => GptSlot }).defineSizeMapping?.(mapping);
      slot.addService(googletag.pubads());
      enableGptServices(googletag);
      slotRef.current = slot;
      googletag.display(divId);
    });

    return () => {
      cancelled = true;
      if (slotRef.current && window.googletag?.destroySlots) {
        window.googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      }
    };
  }, [divId, placement]);

  return (
    <div className={`my-8 flex w-full justify-center px-2 ${className}`} aria-label="Advertisement">
      <div
        id={divId}
        className="mx-auto overflow-hidden text-center"
        style={{ width: "100%", maxWidth: 970, minHeight: 250 }}
      />
    </div>
  );
}

export function GptAnchorAd() {
  const slotRef = useRef<GptSlot | null>(null);

  useEffect(() => {
    let cancelled = false;
    const googletag = getGoogletag();

    googletag.cmd.push(() => {
      if (cancelled) {
        return;
      }

      const format = googletag.enums?.OutOfPageFormat?.BOTTOM_ANCHOR;
      if (!format || !googletag.defineOutOfPageSlot) {
        return;
      }

      const slot = googletag.defineOutOfPageSlot(AD_UNITS.anchor, format);
      if (!slot) {
        return;
      }

      slot.addService(googletag.pubads());
      enableGptServices(googletag);
      slotRef.current = slot;
      window.__gptAnchorSlot = slot;
      googletag.display(slot);
    });

    return () => {
      cancelled = true;
      if (slotRef.current && window.googletag?.destroySlots) {
        window.googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      }
      window.__gptAnchorSlot = null;
    };
  }, []);

  return null;
}

export function GptInterstitialAd() {
  useEffect(() => {
    const googletag = getGoogletag();

    googletag.cmd.push(() => {
      if (window.__colonyflowGptInterstitialDisplayed) {
        return;
      }

      const format = googletag.enums?.OutOfPageFormat?.INTERSTITIAL;
      if (!format || !googletag.defineOutOfPageSlot) {
        return;
      }

      const slot = googletag.defineOutOfPageSlot(AD_UNITS.interstitial, format);
      if (!slot) {
        return;
      }

      slot.addService(googletag.pubads());
      enableGptServices(googletag);
      window.__gptInterstitialSlot = slot;
      googletag.display(slot);
      window.__colonyflowGptInterstitialDisplayed = true;
    });
  }, []);

  return null;
}

