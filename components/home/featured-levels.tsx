import Link from "next/link";
import { LevelCard } from "@/components/level/level-card";
import { getAllLevels } from "@/lib/data";

export function FeaturedLevels() {
  const featuredLevels = getAllLevels().slice(0, 4);

  return (
    <section className="container mx-auto px-6 py-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredLevels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/levels"
          className="inline-flex rounded-md bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
        >
          Browse All Guides
        </Link>
      </div>
    </section>
  );
}
