import Link from "next/link";
import Image from "next/image";
import { Level } from "@/types";
import { cn } from "@/lib/utils";

interface LevelCardProps {
  level: Level;
  className?: string;
}

export function LevelCard({ level, className }: LevelCardProps) {
  return (
    <Link href={`/levels/${level.id}`} className={cn("group block w-full", className)}>
      <div className="relative w-full max-w-[274px] mx-auto aspect-[274/200] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white">
        {/* Level badge */}
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-[#E89654] text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md">
            Level {level.id}
          </div>
        </div>

        {/* Game screenshot */}
        <div className="relative w-full aspect-[272/153] overflow-hidden bg-gray-100">
          <Image
            src={level.videoThumbnail || level.thumbnail || "/levels/demo.webp"}
            alt={`Colony Flow Level ${level.id}`}
            fill
            className="object-cover group-hover:brightness-75 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />

          {/* Play button overlay - visible on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              {/* Outer circle border */}
              <div className="absolute inset-0 rounded-full border-[2.5px] sm:border-[3px] border-white"></div>
              {/* Play triangle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0 h-0 ml-0.5 sm:ml-1 border-t-[9px] sm:border-t-[11px] border-t-transparent border-l-[16px] sm:border-l-[20px] border-l-white border-b-[9px] sm:border-b-[11px] border-b-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom title section */}
        <div className="bg-white px-3 sm:px-4 py-2 sm:pt-[0.625rem] sm:pb-[1.625rem] flex items-center justify-center min-h-[50px] sm:min-h-[60px]">
          <h3 className="font-semibold text-[#5C4D3C] text-sm sm:text-base text-center group-hover:text-[#E89654] transition-colors line-clamp-2">
            {level.title || `Colony Flow Level ${level.id}`}
          </h3>
        </div>
      </div>
    </Link>
  );
}
