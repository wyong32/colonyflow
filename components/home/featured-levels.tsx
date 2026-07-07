"use client";

import Image from "next/image";
import Link from "next/link";

const featuredLevels = [
  {
    id: "Level 1",
    title: "Colony Flow Level 1",
    image: "/levels/level-1.png",
    badge: "Level 1",
    bgColor: "from-purple-200 via-pink-200 to-purple-300"
  },
  {
    id: "Level 2",
    title: "Colony Flow Level 2",
    image: "/levels/level-2.png",
    badge: "Level 2",
    bgColor: "from-teal-200 via-cyan-200 to-blue-300"
  },
  {
    id: "Level 3",
    title: "Colony Flow Level 3",
    image: "/levels/level-3.png",
    badge: "Level 3",
    bgColor: "from-cyan-200 via-blue-200 to-indigo-300"
  },
  {
    id: "Level 4",
    title: "Colony Flow Level 4",
    image: "/levels/level-4.png",
    badge: "Level 4",
    bgColor: "from-amber-200 via-yellow-200 to-orange-300"
  }
];

export function FeaturedLevels() {
  return (
    <section className="container mx-auto px-6 py-4">
      {/* Grid of featured levels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredLevels.map((level) => (
          <Link
            key={level.id}
            href={`/levels/${level.id.toLowerCase().replace(" ", "-")}`}
            className="group block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {level.badge}
                </div>
              </div>

              {/* Background gradient */}
              <div className={`aspect-[4/5] bg-gradient-to-br ${level.bgColor} p-6 flex items-center justify-center`}>
                {/* Placeholder for actual room image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-3">CF</div>
                    <p className="text-sm font-medium text-gray-700">
                      Colony Puzzle View
                    </p>
                  </div>
                </div>
              </div>

              {/* Level title */}
              <div className="bg-white p-4 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 text-center group-hover:text-purple-600 transition-colors">
                  {level.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Browse all button */}
      <div className="mt-10 text-center">
        <Link href="/levels">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Browse All Guides
          </button>
        </Link>
      </div>
    </section>
  );
}

