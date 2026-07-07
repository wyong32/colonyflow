"use client";

import { Apple } from "lucide-react";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/site";

export function DownloadCTA() {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Download Now
        </h2>
        <p className="text-muted-foreground text-base mb-7 max-w-2xl mx-auto">
          Available for iOS and Android. Start sorting cubes with your ant colony today.
        </p>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-7 py-3.5 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Apple className="h-5 w-5" />
            Download on the App Store
          </a>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary text-white px-7 py-3.5 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            Download on the Google Play
          </a>
        </div>
      </div>
    </section>
  );
}
