"use client";

import { useState } from "react";
import type { SpotlightData } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

interface SpotlightBoardProps {
  data: SpotlightData;
  dictionary: Dictionary;
}

export function SpotlightBoard({ data, dictionary }: SpotlightBoardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = searchQuery
    ? data.entries.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : data.entries;

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-[var(--color-section-bg)] p-8">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={dictionary["kudos.spotlight.searchPlaceholder"]}
          maxLength={100}
          aria-label={dictionary["kudos.spotlight.searchPlaceholder"]}
          className="rounded-lg border border-white/20 bg-transparent px-4 py-2 font-sans text-sm text-white placeholder:text-white/40 focus:border-[var(--color-text-gold)] focus:outline-none"
        />
      </div>

      {/* Title */}
      <p className="text-center font-sans text-[40px] font-bold leading-none text-white">
        {data.total_kudos} KUDOS
      </p>

      {/* Simplified Spotlight — word cloud placeholder using CSS grid */}
      <div className="relative min-h-[400px] overflow-hidden rounded-xl bg-[var(--color-bg-primary)] p-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {filteredEntries.map((entry) => {
            const fontSize = Math.max(12, Math.min(32, entry.kudos_count * 2));
            const isHighlighted = searchQuery && entry.name.toLowerCase().includes(searchQuery.toLowerCase());
            return (
              <span
                key={entry.user_id}
                className={`cursor-default font-sans font-bold transition-all ${
                  isHighlighted ? "text-[var(--color-text-gold)]" : "text-white/70"
                }`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {entry.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
