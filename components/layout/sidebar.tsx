"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Walkthrough", href: "/" },
  { name: "B1 Level", href: "/levels/B1" },
  { name: "Guides and Solutions", href: "/levels" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col px-6 py-8">
        {/* Navigation */}
        <nav className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Level Icon */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center">
                <span className="text-3xl font-bold text-white/80">B1</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
