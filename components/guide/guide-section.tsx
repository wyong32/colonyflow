import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GuideSection as GuideSectionType } from "@/types";

interface GuideSectionProps {
  sections: GuideSectionType[];
}

export function GuideSection({ sections }: GuideSectionProps) {
  return (
    <Accordion type="multiple" className="w-full" defaultValue={["section-0"]}>
      {sections.map((section, index) => (
        <AccordionItem key={index} value={`section-${index}`}>
          <AccordionTrigger className="text-lg font-semibold">
            {section.title}
          </AccordionTrigger>
          <AccordionContent>
            <ol className="space-y-3 pl-6">
              {section.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="list-decimal text-sm leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
