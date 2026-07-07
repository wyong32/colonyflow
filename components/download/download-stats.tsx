"use client";

import { Smartphone, Clock, Star } from "lucide-react";

export function DownloadStats() {
  const stats = [
    {
      icon: Smartphone,
      title: "Platforms",
      value: "iOS, Android"
    },
    {
      icon: Clock,
      title: "Downloads",
      value: "100K+"
    },
    {
      icon: Star,
      title: "Rating",
      value: "4.5/5 stars"
    }
  ];

  return (
    <section className="bg-card/30 py-14">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-card/50 border border-border rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <IconComponent className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {stat.title}
                </h3>
                <p className="text-xl font-bold text-muted-foreground">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
