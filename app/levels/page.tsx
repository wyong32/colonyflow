"use client";

import { useState } from "react";
import { LevelGrid } from "@/components/level/level-grid";
import { getAllLevels } from "@/lib/data";
import { DEFAULT_TEN_LEVEL_RANGE, getTenLevelRanges, MAX_LEVEL, parseLevelNumber, TOTAL_GUIDES } from "@/lib/level-utils";
import { SocialShare } from "@/components/social-share";
import { Footer } from "@/components/footer";
import { ScanSearch } from "lucide-react";
import { AffiliateAd } from "@/components/ads/affiliate-ad";

export default function LevelsPage() {
  const allLevels = getAllLevels();
  const levelRanges = getTenLevelRanges();
  const [selectedRange, setSelectedRange] = useState<string | null>(
    `${DEFAULT_TEN_LEVEL_RANGE.start}-${DEFAULT_TEN_LEVEL_RANGE.end}`
  );

  // Filter levels based on selected range
  const filteredLevels = selectedRange
    ? allLevels.filter((level) => {
        const levelNum = parseLevelNumber(level.id);
        const [start, end] = selectedRange.split("-").map(Number);
        return levelNum >= start && levelNum <= end;
      })
    : allLevels;

  return (
    <div>
      <div className="container mx-auto px-6 py-12">
        {/* Walkthrough Introduction */}
        <div className="mb-12">
          <AffiliateAd placement="top" />

          <h1 className="text-3xl font-bold mb-4 text-center text-[#3D2E1F]">
            Colony Flow All Levels Walkthroughs
          </h1>
          <p className="text-center text-[#5C4D3C] text-lg leading-relaxed max-w-4xl mx-auto">
            Browse {TOTAL_GUIDES} Colony Flow video guides up to Level {MAX_LEVEL}. Use the range filters to find a specific ant colony puzzle, then follow the video route to sort cubes, manage slots, and clear the board.
          </p>
          <div className="mx-auto mt-5 flex max-w-4xl justify-center">
            <a href="/find-level/" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-bold text-foreground hover:border-primary hover:text-primary">
              <ScanSearch className="h-4 w-4" aria-hidden="true" />
              Find a level by screenshot
            </a>
          </div>

          {/* Social Share */}
          <div className="max-w-4xl mx-auto">
            <SocialShare />
          </div>

          {/* Level Range Navigation */}
          <div className="mt-8 max-w-6xl mx-auto w-full px-2 sm:px-0">
            <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-start">
              {/* Level range buttons */}
              {levelRanges.map((range) => (
                <button
                  key={`${range.start}-${range.end}`}
                  onClick={() => setSelectedRange(`${range.start}-${range.end}`)}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    selectedRange === `${range.start}-${range.end}`
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-card/30"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Level Grid */}
        <AffiliateAd placement="middle" />
        <LevelGrid levels={filteredLevels} />
        <AffiliateAd placement="bottom" />
      </div>
      <Footer />
    </div>
  );
}
