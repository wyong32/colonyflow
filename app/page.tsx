import { HeroSection } from "@/components/home/hero-section";
import { LevelNavigation } from "@/components/home/level-navigation";
import { Footer } from "@/components/footer";
import Script from "next/script";
import { canonical, GAME_DEVELOPER, GAME_NAME, gameDescription, RATING_COUNT, RATING_VALUE, SITE_NAME, SITE_URL } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": canonical(),
        "name": `${SITE_NAME} - Colony Flow Walkthrough Guide`,
        "description": "Updated Colony Flow walkthrough videos, level solutions, tips, and download links.",
        "publisher": {
          "@id": `${SITE_URL}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE_URL}/levels/{search_term_string}/`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": SITE_NAME,
        "url": canonical(),
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/logo.png`,
          "width": 256,
          "height": 256
        }
      },
      {
        "@type": "VideoGame",
        "@id": `${SITE_URL}/#videogame`,
        "name": GAME_NAME,
        "description": gameDescription,
        "gamePlatform": ["iOS", "Android"],
        "publisher": {
          "@type": "Organization",
          "name": GAME_DEVELOPER
        },
        "genre": ["Puzzle", "Casual", "Brain Teaser"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": RATING_VALUE,
          "ratingCount": RATING_COUNT,
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Colony Flow?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Colony Flow is a relaxing ant colony puzzle game where worker ants carry colorful cubes to matching color holes and reveal pixel art after the board is cleared."
            }
          },
          {
            "@type": "Question",
            "name": "How do you play Colony Flow?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tap cube stacks to send worker ants, match cubes by color, keep colony slots open, and clear the full board in the correct order."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I download Colony Flow?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Colony Flow is available from the App Store and Google Play."
            }
          },
          {
            "@type": "Question",
            "name": "Does this site include every Colony Flow level?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This site publishes the available walkthrough videos that have been processed so far and updates the guide database when new reliable level videos are available."
            }
          },
          {
            "@type": "Question",
            "name": "Why are some level numbers missing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Missing level numbers do not have confirmed source videos yet, so they are skipped instead of replaced with placeholder guides."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": canonical()
          }
        ]
      }
    ]
  };

  return (
    <div>
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <HeroSection />
      <LevelNavigation />
      <Footer />
    </div>
  );
}
