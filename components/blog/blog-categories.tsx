"use client";

import { Gamepad2, Lightbulb, Newspaper, Star } from "lucide-react";

interface BlogCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogCategories({ selectedCategory, onCategoryChange }: BlogCategoriesProps) {
  const categories = [
    { id: "all", label: "All Posts", icon: Newspaper },
    { id: "guides", label: "Guides & Tips", icon: Lightbulb },
    { id: "updates", label: "Game Updates", icon: Star },
    { id: "walkthroughs", label: "Walkthroughs", icon: Gamepad2 },
  ];

  return (
    <section className="container mx-auto px-6 py-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                  : "bg-card/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              <IconComponent className="h-4 w-4" />
              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
