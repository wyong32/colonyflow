"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Play, Download, Globe, Sun, Moon, Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/levels", label: "Levels", icon: Play },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/download", label: "Download", icon: Download },
  ];

  return (
    <nav className="border-b bg-[#1a2332] sticky top-0 z-40">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">HP</span>
          </div>
          <span className="font-semibold text-lg text-white">Hole People</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/10"
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm">English</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-700 bg-[#1a2332]">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 justify-start"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">English</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
