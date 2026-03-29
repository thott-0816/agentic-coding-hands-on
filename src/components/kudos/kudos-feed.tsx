"use client";

import { useState, useCallback } from "react";
import { KudosPostCard } from "@/components/kudos/kudos-post-card";
import type { Kudo } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

interface KudosFeedProps {
  initialKudos: Kudo[];
  allKudos: Kudo[];
  dictionary: Dictionary;
}

const PAGE_SIZE = 4;

export function KudosFeed({ initialKudos, allKudos, dictionary }: KudosFeedProps) {
  const [displayed, setDisplayed] = useState<Kudo[]>(initialKudos);

  const hasMore = displayed.length < allKudos.length;

  const handleLoadMore = useCallback(() => {
    const next = allKudos.slice(displayed.length, displayed.length + PAGE_SIZE);
    setDisplayed((prev) => [...prev, ...next]);
  }, [allKudos, displayed.length]);

  if (displayed.length === 0) {
    return (
      <p className="py-20 text-center font-sans text-base text-white/50">
        {dictionary["kudos.empty"]}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10" role="feed" aria-label="Kudos feed">
      {displayed.map((kudo) => (
        <KudosPostCard key={kudo.id} kudo={kudo} dictionary={dictionary} />
      ))}
      {hasMore && (
        <button
          type="button"
          onClick={handleLoadMore}
          className="mx-auto w-fit cursor-pointer rounded-lg border border-[var(--color-text-gold)] bg-transparent px-8 py-3 font-sans text-base font-bold leading-6 text-[var(--color-text-gold)] transition-all hover:bg-[var(--color-text-gold)] hover:text-[var(--color-bg-primary)]"
        >
          {dictionary["kudos.loadMore"]}
        </button>
      )}
    </div>
  );
}
