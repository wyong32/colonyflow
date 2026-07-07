"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LevelGrid } from "@/components/level/level-grid";
import { getAllLevels } from "@/lib/data";
import { DEFAULT_TEN_LEVEL_RANGE, getTenLevelRanges, LevelRange, parseLevelNumber, TOTAL_GUIDES } from "@/lib/level-utils";
import { Button } from "@/components/ui/button";
import { GptAd } from "@/components/ads/gpt-ad";
import { APP_STORE_URL, GAME_DEVELOPER, GAME_NAME, GOOGLE_PLAY_URL } from "@/lib/site";

export function LevelNavigation() {
  const [selectedRange, setSelectedRange] = useState<LevelRange | null>(DEFAULT_TEN_LEVEL_RANGE);
  const allLevels = getAllLevels();
  const levelRanges: LevelRange[] = getTenLevelRanges();

  const filteredLevels = selectedRange
    ? allLevels.filter((level) => {
        const levelNum = parseLevelNumber(level.id);
        return levelNum >= selectedRange.start && levelNum <= selectedRange.end;
      })
    : allLevels;

  const faqs = [
    {
      question: "What is Colony Flow?",
      answer: "Colony Flow is a relaxing ant colony puzzle game where worker ants carry colorful cubes from stacks to matching color holes and reveal pixel art after the board is cleared.",
    },
    {
      question: "How do you play Colony Flow?",
      answer: "Tap a cube stack to send an ant, match cubes by color, keep colony slots open, and plan the order of moves so the trail does not get blocked.",
    },
    {
      question: "Are the walkthroughs complete for every released level?",
      answer: `This site publishes the available Colony Flow walkthrough videos we have processed so far. The current guide database includes ${TOTAL_GUIDES} level guides and is updated as more reliable videos are collected.`,
    },
    {
      question: "Why are some level numbers missing?",
      answer: "Some level numbers may not have a confirmed video source yet. Missing levels are skipped instead of replaced with placeholder content.",
    },
    {
      question: "Can I play Colony Flow offline?",
      answer: "The game is designed for relaxing mobile play and may support offline sessions depending on your installed version and platform store settings.",
    },
  ];

  return (
    <section className="level-navigation-section bg-background py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <GptAd placement="top" />

        <div className="mb-4 sm:mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2">
            <span className="text-foreground">Colony Flow Level Guides & Video Solutions</span>
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            Browse the latest available Colony Flow walkthroughs, pick a level range, and use the video route to solve tricky ant colony puzzles without guessing.
          </p>
        </div>

        <div className="mb-4 max-w-6xl mx-auto w-full px-2 sm:px-0">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-start">
            {levelRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => setSelectedRange(range)}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  selectedRange?.label === range.label
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-card/30"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {filteredLevels.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <LevelGrid levels={filteredLevels} />
          </div>
        )}

        <div className="flex justify-center mt-8 sm:mt-12 mb-8 sm:mb-12">
          <Link href="/levels">
            <Button
              size="lg"
              className="bg-card/50 text-muted-foreground border border-border px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-base font-medium rounded-full shadow-sm transition-all cursor-pointer hover:underline hover:bg-card hover:text-foreground"
            >
              View Available Level Walkthroughs
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card/50 border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-md">
            <div className="mb-8 sm:mb-10">
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose">
                {GAME_NAME} by {GAME_DEVELOPER} turns color sorting into a calm ant colony puzzle. Tiny worker ants march from cube stacks, carry colorful cubes, follow the trail, and deliver each cube to the correct color hole. When the board is cleared, the colony reveals a bright pixel art reward.
              </p>
            </div>

            <div className="mb-8 sm:mb-10 lg:mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Table of Contents</h2>
              <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li><a href="#what-is" className="text-primary hover:text-primary/80 hover:underline">1. What is Colony Flow?</a></li>
                <li><a href="#how-to-play" className="text-primary hover:text-primary/80 hover:underline">2. How to Play Colony Flow</a></li>
                <li><a href="#features" className="text-primary hover:text-primary/80 hover:underline">3. Colony Flow Features</a></li>
                <li><a href="#tips" className="text-primary hover:text-primary/80 hover:underline">4. Strategy Tips</a></li>
                <li><a href="#download" className="text-primary hover:text-primary/80 hover:underline">5. Download Colony Flow</a></li>
                <li><a href="#faq" className="text-primary hover:text-primary/80 hover:underline">6. FAQ</a></li>
              </ol>
            </div>

            <div className="space-y-8 sm:space-y-10 lg:space-y-14">
              <div id="what-is">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">What is Colony Flow?</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose mb-4 sm:mb-5">
                  Colony Flow is a mobile brain teaser built around adorable ants, cube sorting, limited slots, and pixel art completion. Each level asks you to command the colony with smart moves instead of speed. There is no timer pressure in the core puzzle flow, so the challenge comes from planning the correct order.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose">
                  The game starts with simple cube stacks and gradually adds tighter space, more colors, and more demanding colony routes. One wrong move can block the trail, so strong players learn to look ahead, free up space, and send ants only when the destination color is ready.
                </p>
              </div>

              <div id="how-to-play">
                <GptAd placement="middle" />
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">How to Play Colony Flow</h2>
                <ul className="space-y-3 sm:space-y-4 ml-4 sm:ml-6">
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Tap a cube stack:</strong> Send a worker ant from the selected stack.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Match by color:</strong> Ants carry cubes to holes with the same color.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Manage colony slots:</strong> Limited space means blocked colors can stop the whole route.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Clear the board:</strong> Finish every color group to reveal the pixel art picture.</li>
                </ul>
              </div>

              <div id="features">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Colony Flow Features</h2>
                <ul className="space-y-3 sm:space-y-4 ml-4 sm:ml-6">
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">Charming ant colony gameplay with tiny worker ants carrying cubes.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">Relaxing color sorting puzzles with simple one-tap controls.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">Beautiful pixel art themes including animals, fruits, food, flowers, holidays, toys, rockets, castles, and nature scenes.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">No timer pressure, smooth marching animations, and calm puzzle pacing.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">Difficulty that grows from easy starter boards to tricky colony missions.</li>
                </ul>
              </div>

              <div id="tips">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Colony Flow Tips and Strategy Guide</h2>
                <ul className="space-y-3 sm:space-y-4 ml-4 sm:ml-6">
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Look for blocked colors first:</strong> If a color has few open paths, solve it before the board gets crowded.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Keep one slot free:</strong> A free colony slot gives you room to recover from a difficult stack order.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Do not tap every available stack:</strong> Only send ants when the carried cubes have a safe matching destination.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Use video guides for order:</strong> The hardest part is usually sequencing, so pause the walkthrough before each major move.</li>
                </ul>
              </div>

              <div id="download">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Where Can I Download Colony Flow?</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose mb-4">
                  You can download Colony Flow from the App Store or Google Play and start solving ant colony color puzzles on mobile.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 hover:underline">Download Colony Flow on the App Store</a>
                  <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 hover:underline">Download Colony Flow on Google Play</a>
                </div>
              </div>

              <div id="faq">
                <GptAd placement="bottom" />
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">FAQ</h2>
                <div className="space-y-6 sm:space-y-8">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
