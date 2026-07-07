"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Star, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MAX_LEVEL } from "@/lib/level-utils";
import { DOWNLOAD_COUNT, GAME_NAME } from "@/lib/site";
import { getLevelById } from "@/lib/data";

export function HeroSection() {
  const [levelInput, setLevelInput] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const router = useRouter();

  const carouselImages = [
    "/Colony-Flow-1.jpg",
    "/Colony-Flow-12.jpg",
    "/Colony-Flow-33.jpg",
    "/Colony-Flow-68.jpg",
    "/Colony-Flow-115.jpg"
  ];

  const features = [
    "Ant colony puzzle guides",
    "Color cube sorting tips",
    "Video walkthroughs",
    "Updated level routes"
  ];

  // Trigger opening animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle level jump
  const handleLevelJump = () => {
    const levelNum = parseInt(levelInput);
    if (levelNum >= 1 && levelNum <= MAX_LEVEL && getLevelById(String(levelNum))) {
      router.push(`/levels/${levelNum}`);
      setLevelInput("");
    }
  };

  // Scroll to level navigation section
  const scrollToLevels = () => {
    const levelSection = document.querySelector('.level-navigation-section');
    if (levelSection) {
      levelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 pt-4 pb-6">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        {/* Left Content */}
        <div>
          {/* Badge */}
          <div className="inline-block mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm text-muted-foreground px-4 sm:px-5 py-2 sm:py-2.5 border border-border bg-card/50 rounded-full inline-flex items-center gap-2">
              Colony Flow Walkthrough Collection
            </span>
          </div>

          {/* Title */}
          <h1 className="font-bold mb-6 sm:mb-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span className="text-foreground">{GAME_NAME}</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Level Guides
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Lead worker ants, sort colorful cubes, clear tight colony slots, and reveal pixel art. Enter an available level number to jump directly to its video guide.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Jump to Level */}
          <div className="mb-6 sm:mb-8 bg-card/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border shadow-sm">
            <label className="text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3 block">
              Jump to a specific level:
            </label>
            <div className="flex gap-2 sm:gap-3">
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={`Enter level number (1-${MAX_LEVEL})`}
                value={levelInput}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setLevelInput(value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLevelJump();
                  }
                }}
                className="flex-1 bg-card border-border text-foreground placeholder:text-muted-foreground h-10 sm:h-12 text-sm sm:text-base"
              />
              <Button
                onClick={handleLevelJump}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-8 h-10 sm:h-12 text-sm sm:text-base"
              >
                Go
              </Button>
            </div>
          </div>

          {/* Download Link */}
          <div className="mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Haven't installed the game yet?{" "}
              <a href="/download" className="text-primary hover:text-primary/80 inline-flex items-center gap-1">
                Download Colony Flow here
                <ArrowRight className="h-3 w-3" />
              </a>
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6 lg:mb-0">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400 text-yellow-400 opacity-50"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              4.5+ rating | {DOWNLOAD_COUNT} downloads
            </span>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] flex items-center justify-center lg:justify-start overflow-hidden" style={{ perspective: "2000px" }}>
          {/* Stacked Cards Container */}
          <div className="relative w-[200px] h-[400px] sm:w-[240px] sm:h-[480px] lg:w-[300px] lg:h-[550px] lg:ml-12">
            {carouselImages.map((image, index) => {
              const position = index - currentImageIndex;

              // Initial closed state - all cards stacked on the left with natural overlap
              let initialTransform = `translateX(${index * -8}px) translateY(${index * -3}px) translateZ(${index * -10}px) rotateY(25deg) rotateZ(-3deg) scale(0.92)`;

              // Calculate 3D fan-out transform - poker card spread
              let transform = "";
              let zIndex = 0;
              let opacity = 1;

              if (position === 0) {
                // Active card - front and center, flipped to front
                transform = "translateX(0) translateY(0) translateZ(0px) rotateY(0deg) rotateZ(0deg) scale(1)";
                zIndex = 50;
                opacity = 1;
              } else if (position === 1) {
                // Card 1 - slight fan to the right, flipped
                transform = "translateX(95px) translateY(24px) translateZ(-75px) rotateY(-16deg) rotateZ(7deg) scale(0.95)";
                zIndex = 40;
                opacity = 1;
              } else if (position === 2) {
                // Card 2 - more fan, flipped
                transform = "translateX(185px) translateY(45px) translateZ(-140px) rotateY(-22deg) rotateZ(10deg) scale(0.9)";
                zIndex = 30;
                opacity = 1;
              } else if (position === 3) {
                // Card 3 - further, flipped
                transform = "translateX(270px) translateY(64px) translateZ(-195px) rotateY(-27deg) rotateZ(12deg) scale(0.85)";
                zIndex = 20;
                opacity = 0.95;
              } else if (position === 4) {
                // Card 4 - furthest visible, flipped
                transform = "translateX(350px) translateY(80px) translateZ(-240px) rotateY(-31deg) rotateZ(14deg) scale(0.8)";
                zIndex = 10;
                opacity = 0.9;
              } else {
                // Previous cards - hidden
                transform = "translateX(-150px) translateY(0) translateZ(-50px) rotateY(15deg) rotateZ(-8deg) scale(0.9)";
                zIndex = 5;
                opacity = 0;
              }

              // Use initial state if not animated yet
              const finalTransform = hasAnimated ? transform : initialTransform;
              const finalOpacity = hasAnimated ? opacity : (0.5 + index * 0.1);

              return (
                <div
                  key={image}
                  className="absolute inset-0 cursor-pointer transition-all rounded-2xl overflow-hidden"
                  style={{
                    transform: finalTransform,
                    zIndex: hasAnimated ? zIndex : (50 - index),
                    opacity: finalOpacity,
                    transformStyle: "preserve-3d",
                    transitionDuration: hasAnimated ? "600ms" : `${1000 + index * 200}ms`,
                    transitionDelay: hasAnimated ? "0ms" : `${index * 120}ms`,
                    transitionTimingFunction: hasAnimated ? "ease-out" : "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  onClick={() => setCurrentImageIndex((currentImageIndex + 1) % carouselImages.length)}
                >
                  <Image
                    src={image}
                    alt={`Colony Flow gameplay screenshot showing ants carrying colorful cubes through a puzzle board`}
                    fill
                    className="object-cover drop-shadow-2xl"
                    priority={index === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Browse All Guides Button */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <Button
          onClick={scrollToLevels}
          variant="outline"
          size="lg"
          className="bg-card/50 text-muted-foreground border-border px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-medium rounded-full shadow-sm transition-all cursor-pointer hover:underline hover:bg-card hover:text-foreground"
        >
          Browse All Guides
          <ChevronDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </section>
  );
}

