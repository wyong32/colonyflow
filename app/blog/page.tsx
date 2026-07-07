"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogGrid } from "@/components/blog/blog-grid";
import { BlogCategories } from "@/components/blog/blog-categories";
import { GptAd } from "@/components/ads/gpt-ad";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div>
      <BlogHero />
      <GptAd placement="top" />
      <BlogCategories
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <BlogGrid selectedCategory={selectedCategory} />
      <GptAd placement="bottom" />
      <Footer />
    </div>
  );
}
