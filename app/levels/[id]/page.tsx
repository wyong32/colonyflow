"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getAllLevels, getLevelById } from "@/lib/data";
import { formatLevelDisplay, getFiftyLevelRanges, parseLevelNumber } from "@/lib/level-utils";
import { Button } from "@/components/ui/button";
import { List, ChevronLeft, ChevronRight } from "lucide-react";
import { LevelGrid } from "@/components/level/level-grid";
import { SocialShare } from "@/components/social-share";
import { Footer } from "@/components/footer";
import { GptAd } from "@/components/ads/gpt-ad";
import { APP_STORE_URL, GAME_NAME, GOOGLE_PLAY_URL } from "@/lib/site";

export default function LevelDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const level = getLevelById(id);

  const [selectedRange, setSelectedRange] = useState<string | null>("1-50");

  if (!level) {
    notFound();
  }

  // Helper function to format completion time
  const formatCompletionTime = (time: string) => {
    // Convert from "3:30" to "3min 30sec"
    const parts = time.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0]);
      const seconds = parseInt(parts[1]);
      return `${minutes}min ${seconds}sec`;
    }
    return time;
  };

  // Get all levels to find previous and next
  const allLevels = getAllLevels();
  const currentIndex = allLevels.findIndex((l) => l.id === id);
  const previousLevel = currentIndex > 0 ? allLevels[currentIndex - 1] : null;
  const nextLevel = currentIndex < allLevels.length - 1 ? allLevels[currentIndex + 1] : null;

  const levelRanges = getFiftyLevelRanges();

  // Generate level buttons for the selected range
  const getLevelsForRange = (range: string) => {
    const [start, end] = range.split("-").map(Number);
    return allLevels.filter((level) => {
      const levelNum = parseLevelNumber(level.id);
      return levelNum >= start && levelNum <= end;
    });
  };

  const filteredLevels = selectedRange ? getLevelsForRange(selectedRange) : [];

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-2 max-w-6xl">
        {/* Header with centered content and back button */}
        <div className="mb-4">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <Link href="/levels">
            <Button variant="outline" className="border-2 hover:bg-accent text-sm sm:text-base">
              <List className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Level List
            </Button>
          </Link>
        </div>

        {/* Centered Title and Description */}
        <div className="text-center px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Colony Flow Level {formatLevelDisplay(level.id)} Walkthrough & Guide
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
            {level.completionTime ? `Reference completion time: ${formatCompletionTime(level.completionTime)}` : level.description}
          </p>
        </div>

        {/* YouTube Video */}
        {level.videoUrl && (
          <div className="w-full">
            {/* Desktop Layout - Side by Side */}
            <div className="hidden lg:flex justify-center items-center gap-7">
              {/* Previous Level Button */}
              {previousLevel ? (
                <Link href={`/levels/${previousLevel.id}`}>
                  <Button
                    variant="outline"
                    className="flex-row items-center justify-between h-20 w-40 bg-blue-50 hover:bg-blue-100 border-blue-200 px-3 py-2"
                  >
                    <ChevronLeft className="h-7 w-7 text-blue-500 flex-shrink-0" />
                    <div className="flex flex-col items-center flex-1">
                      <span className="text-sm text-blue-400 whitespace-nowrap">Previous Level</span>
                      <span className="text-3xl font-bold text-blue-500">{formatLevelDisplay(previousLevel.id)}</span>
                    </div>
                  </Button>
                </Link>
              ) : (
                <div className="w-40" />
              )}

              {/* Video Container */}
              <div className="flex justify-center">
                <iframe
                  width="360"
                  height="640"
                  src={level.videoUrl}
                  title={`${level.title} Walkthrough`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-2xl shadow-lg border-0"
                />
              </div>

              {/* Next Level Button */}
              {nextLevel ? (
                <Link href={`/levels/${nextLevel.id}`}>
                  <Button
                    variant="outline"
                    className="flex-row items-center justify-between h-20 w-40 bg-pink-50 hover:bg-pink-100 border-pink-200 px-3 py-2"
                  >
                    <div className="flex flex-col items-center flex-1">
                      <span className="text-sm text-pink-400 whitespace-nowrap">Next Level</span>
                      <span className="text-3xl font-bold text-pink-500">{formatLevelDisplay(nextLevel.id)}</span>
                    </div>
                    <ChevronRight className="h-7 w-7 text-pink-500 flex-shrink-0" />
                  </Button>
                </Link>
              ) : (
                <div className="w-40" />
              )}
            </div>

            {/* Mobile/Tablet Layout - Stacked */}
            <div className="lg:hidden flex flex-col items-center gap-4">
              {/* Navigation Buttons - Mobile (Above Video) */}
              <div className="flex gap-3 w-full max-w-[360px] justify-between px-2">
                {/* Previous Level Button */}
                {previousLevel ? (
                  <Link href={`/levels/${previousLevel.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full flex-row items-center justify-between h-16 bg-blue-50 hover:bg-blue-100 border-blue-200 px-3 py-2"
                    >
                      <ChevronLeft className="h-6 w-6 text-blue-500 flex-shrink-0" />
                      <div className="flex flex-col items-center flex-1">
                        <span className="text-xs text-blue-400 whitespace-nowrap">Previous</span>
                        <span className="text-2xl font-bold text-blue-500">{formatLevelDisplay(previousLevel.id)}</span>
                      </div>
                    </Button>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                {/* Next Level Button */}
                {nextLevel ? (
                  <Link href={`/levels/${nextLevel.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full flex-row items-center justify-between h-16 bg-pink-50 hover:bg-pink-100 border-pink-200 px-3 py-2"
                    >
                      <div className="flex flex-col items-center flex-1">
                        <span className="text-xs text-pink-400 whitespace-nowrap">Next</span>
                        <span className="text-2xl font-bold text-pink-500">{formatLevelDisplay(nextLevel.id)}</span>
                      </div>
                      <ChevronRight className="h-6 w-6 text-pink-500 flex-shrink-0" />
                    </Button>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>

              {/* Video Container - Mobile Responsive */}
              <div className="w-full max-w-[360px] aspect-[9/16]">
                <iframe
                  width="100%"
                  height="100%"
                  src={level.videoUrl}
                  title={`${level.title} Walkthrough`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="rounded-xl sm:rounded-2xl shadow-lg border-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Level Range Navigation */}
      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-8 max-w-6xl">
        {/* Social Share */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <SocialShare />
        </div>

        <GptAd placement="top" />

        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-[#3D2E1F] px-2">
          Colony Flow Level Solutions & Walkthrough Guide
        </h2>
        <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
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

      {/* Level Grid - Full Width */}
      {selectedRange && (
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center px-4 sm:px-6">
            Colony Flow Level {selectedRange} Guide
          </h2>
          <div className="px-4 sm:px-6">
            <LevelGrid levels={filteredLevels} variant="button" />
          </div>
        </div>
      )}

      {/* Level Introduction Content */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl mb-12 sm:mb-16">
        <section>
          <GptAd placement="middle" />

          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">
            Colony Flow Level {formatLevelDisplay(level.id)} Complete Walkthrough Strategy
          </h2>
          <div className="space-y-4 sm:space-y-5">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              This Colony Flow Level {formatLevelDisplay(level.id)} walkthrough shows the full puzzle route from the first ant move to the cleared board. Use it to understand which cube stack to tap first, how to keep colony slots open, and when to send worker ants toward matching color holes.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The safest strategy is to study the visible colors before tapping. If a stack contains cubes that cannot immediately reach a matching hole, leave it for later. Colony Flow rewards careful ordering because a single blocked slot can stop the trail and force a restart.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              If you are stuck, pause the video after each major board change and compare your layout with the guide. Matching the sequence is more important than speed, especially in later Colony Flow levels where limited sorting space makes every move matter.
            </p>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">
            Colony Flow Level {formatLevelDisplay(level.id)} FAQ
          </h2>
          <div className="space-y-5">
            {[
              {
                q: `How do I solve Colony Flow Level ${formatLevelDisplay(level.id)}?`,
                a: "Watch the embedded walkthrough and copy the order of ant moves. Focus on matching cube colors to the correct holes while keeping at least one colony slot open."
              },
              {
                q: "What should I check before the first move?",
                a: "Look for the most restricted color, blocked stacks, and holes that can be filled immediately. Starting with a safe color reduces the chance of blocking the trail."
              },
              {
                q: "Why does my board get stuck?",
                a: "Most stuck boards happen when colony slots are filled with colors that do not have an open destination. Clear short color groups first and avoid tapping every available stack."
              },
              {
                q: "Can I use the same route if my board looks slightly different?",
                a: "Yes, use the video as the main sequence reference, but adjust when your visible stack order differs. The key principle is still color matching and slot management."
              },
              {
                q: "Is Colony Flow Level " + formatLevelDisplay(level.id) + " timed?",
                a: "The puzzle is best approached without rushing. Plan the order, pause when needed, and prioritize a clean board over fast tapping."
              }
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Download App Section */}
        <section className="mt-12 sm:mt-16 text-center">
          <GptAd placement="bottom" />

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-2">
            Download {GAME_NAME} Mobile App
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6 max-w-4xl mx-auto px-2">
            Ready to command the colony yourself? Download Colony Flow on iOS or Android, send worker ants through colorful cube puzzles, and unlock relaxing pixel art missions anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 min-w-[280px]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-xs sm:text-base">Download Colony Flow on App Store</span>
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 min-w-[280px]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <span className="text-xs sm:text-base">Download Colony Flow on Google Play</span>
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
