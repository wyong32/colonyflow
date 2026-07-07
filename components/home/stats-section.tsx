import { MAX_LEVEL, TOTAL_GUIDES } from "@/lib/level-utils";

export function StatsSection() {
  const stats = [
    { label: "Total Levels", value: `${MAX_LEVEL}` },
    { label: "Active Players", value: "100K+" },
    { label: "Average Rating", value: "4.2" },
    { label: "Guides Published", value: `${TOTAL_GUIDES}` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
        >
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
