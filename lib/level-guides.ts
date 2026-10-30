import guideData from "@/data/level-guides.json";

export interface LevelGuideStep {
  title: string;
  instruction: string;
  image?: string;
  imageAlt?: string;
}

export interface LevelGuideFaq {
  question: string;
  answer: string;
}

export interface VerifiedLevelGuide {
  objective: string;
  keyChallenge: string;
  quickAnswer: string;
  overallStrategy: string[];
  startingBoard: string;
  steps: LevelGuideStep[];
  beforeMove: string[];
  stuckPoint: string;
  faqs: LevelGuideFaq[];
}

const guides = guideData as Record<string, VerifiedLevelGuide>;

export function getVerifiedLevelGuide(id: string): VerifiedLevelGuide | undefined {
  return guides[id];
}

export function getLevelFaqs(id: string, guide?: VerifiedLevelGuide): LevelGuideFaq[] {
  if (guide) return guide.faqs;

  return [
    {
      question: `How do I solve Colony Flow Level ${id}?`,
      answer: `Use the complete Level ${id} video and keep the same source-stack order and colony-slot state shown in the recording.`,
    },
    {
      question: `Why does my Colony Flow Level ${id} board look different?`,
      answer: "Game updates can reorder level numbers. Use the screenshot finder to compare the board rather than relying only on its number.",
    },
    {
      question: "What should I check before selecting a source stack?",
      answer: "Confirm that a colony slot is open and that the next color can still reach matching cells on the board.",
    },
    {
      question: `Is a written move list available for Level ${id}?`,
      answer: "The written steps are published only after the full video has been checked. Until then, the embedded video remains the source solution.",
    },
  ];
}
