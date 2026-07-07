import type { Metadata } from "next";
import Script from "next/script";
import { getAllLevels, getLevelById } from "@/lib/data";
import { canonical, GAME_NAME, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  const levels = getAllLevels();
  return levels.map((level) => ({
    id: level.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const level = getLevelById(id);

  if (!level) {
    return {
      title: "Colony Flow Level Not Found",
      description: "The requested Colony Flow level guide could not be found.",
    };
  }

  const levelNumber = level.id;
  const url = canonical(`/levels/${id}/`);
  const title = `Colony Flow Level ${levelNumber} Walkthrough & Solution July 2026`;
  const description = `Watch the Colony Flow Level ${levelNumber} walkthrough video. Learn the best ant move order, color cube sorting route, slot management tips, and puzzle solution.`;
  const image = level.videoThumbnail || level.thumbnail || OG_IMAGE;

  return {
    title,
    description,
    keywords: ["Colony Flow", `Colony Flow Level ${levelNumber}`, "walkthrough", "solution", "guide", "ant colony puzzle", "color sorting"],
    authors: [{ name: "Colony Flow Guide Team" }],
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `Colony Flow Level ${levelNumber} walkthrough`
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@ColonyFlowGuide'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url
    }
  };
}

export default async function LevelLayout({ params, children }: Props) {
  const { id } = await params;
  const level = getLevelById(id);

  if (!level) {
    return <>{children}</>;
  }

  const url = canonical(`/levels/${id}/`);
  const levelNumber = level.id;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoObject",
        "@id": `${url}#video`,
        "name": `Colony Flow Level ${levelNumber} Walkthrough Solution`,
        "description": level.description,
        "thumbnailUrl": [`${SITE_URL}${level.videoThumbnail || level.thumbnail}`],
        "uploadDate": "2026-06-21",
        "duration": level.videoDuration,
        "embedUrl": level.videoUrl,
        "contentUrl": level.videoUrl,
        "publisher": {
          "@type": "Organization",
          "name": SITE_NAME,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/logo.png`
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How do I solve Colony Flow Level ${levelNumber}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Watch the embedded walkthrough and copy the order of ant moves while matching cubes to the correct color holes."
            }
          },
          {
            "@type": "Question",
            "name": "What should I check before the first move?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Check the most restricted colors, open matching holes, blocked stacks, and available colony slots before tapping."
            }
          },
          {
            "@type": "Question",
            "name": "Why does my Colony Flow board get stuck?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Boards usually get stuck when colony slots are filled with colors that do not have an open matching destination."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use the same route if my board looks different?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the video as the main sequence reference, then adjust if your visible stack order differs."
            }
          },
          {
            "@type": "Question",
            "name": `Is Colony Flow Level ${levelNumber} timed?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Colony Flow is best approached as a planning puzzle. Prioritize a clean move order over fast tapping."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": canonical()
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `${GAME_NAME} Levels`,
            "item": canonical("/levels/")
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `Level ${levelNumber}`,
            "item": url
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id={`level-${id}-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
