"use client";

import { useState } from "react";
import { LevelGrid } from "@/components/level/level-grid";
import { getAllLevels } from "@/lib/data";
import { DEFAULT_TEN_LEVEL_RANGE, getTenLevelRanges, MAX_LEVEL, parseLevelNumber, TOTAL_GUIDES } from "@/lib/level-utils";
import { SocialShare } from "@/components/social-share";
import { Footer } from "@/components/footer";
import { GptAd } from "@/components/ads/gpt-ad";

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
          <GptAd placement="top" />

          <h2 className="text-3xl font-bold mb-4 text-center text-[#3D2E1F]">
            Colony Flow Available Level Walkthroughs
          </h2>
          <p className="text-center text-[#5C4D3C] text-lg leading-relaxed max-w-4xl mx-auto">
            Browse {TOTAL_GUIDES} Colony Flow video guides up to Level {MAX_LEVEL}. Use the range filters to find a specific ant colony puzzle, then follow the video route to sort cubes, manage slots, and clear the board.
          </p>

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
        <GptAd placement="middle" />
        <LevelGrid levels={filteredLevels} />
        <GptAd placement="bottom" />
      </div>
      <Footer />
    </div>
  );
}
