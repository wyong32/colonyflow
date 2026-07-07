"use client";

import type { CSSProperties } from "react";
import { GptAd } from "@/components/ads/gpt-ad";

interface ArticleContentWithAdsProps {
  content: string;
  className?: string;
  style?: CSSProperties;
}

function splitBeforeH2(content: string) {
  const matches = Array.from(content.matchAll(/<h2[\s>]/gi));
  if (matches.length === 0) {
    return [{ html: content, ad: null as "top" | "middle" | "bottom" | null }];
  }

  const h2Indexes = matches.map((match) => match.index ?? 0);
  const adIndexes = new Map<number, "top" | "middle" | "bottom">();

  adIndexes.set(0, "top");
  adIndexes.set(Math.floor((h2Indexes.length - 1) / 2), "middle");
  adIndexes.set(h2Indexes.length - 1, "bottom");

  const parts: Array<{ html: string; ad: "top" | "middle" | "bottom" | null }> = [];
  let cursor = 0;

  h2Indexes.forEach((index, h2Number) => {
    const before = content.slice(cursor, index);
    if (before) {
      parts.push({ html: before, ad: null });
    }

    const nextIndex = h2Indexes[h2Number + 1] ?? content.length;
    parts.push({
      html: content.slice(index, nextIndex),
      ad: adIndexes.get(h2Number) ?? null,
    });
    cursor = nextIndex;
  });

  const tail = content.slice(cursor);
  if (tail) {
    parts.push({ html: tail, ad: null });
  }

  return parts;
}

export function ArticleContentWithAds({ content, className = "", style }: ArticleContentWithAdsProps) {
  const parts = splitBeforeH2(content);

  return (
    <div className={className} style={style}>
      {parts.map((part, index) => (
        <div key={index}>
          {part.ad && <GptAd placement={part.ad} />}
          <div dangerouslySetInnerHTML={{ __html: part.html }} />
        </div>
      ))}
    </div>
  );
}
