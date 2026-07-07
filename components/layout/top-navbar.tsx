"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TopNavbar() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">D</span>
          </div>
          <span className="font-bold text-lg">Colony Flow</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/levels" className="text-sm font-medium hover:text-primary transition-colors">
            Levels
          </Link>
          <Link href="#guides" className="text-sm font-medium hover:text-primary transition-colors">
            Guides
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
            Browse Levels
          </Button>
        </div>
      </div>
    </nav>
  );
}

