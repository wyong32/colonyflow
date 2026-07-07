"use client";

export function BlogHero() {
  return (
    <section className="container mx-auto px-6 pt-12 pb-8">
      <div className="text-center">
        <h1 className="font-bold mb-5" style={{ fontSize: '2.75rem' }}>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Colony Flow Blog
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover ant colony puzzle strategies, level guide notes, cube sorting tips, and practical walkthrough insights for Colony Flow.
        </p>
      </div>
    </section>
  );
}
