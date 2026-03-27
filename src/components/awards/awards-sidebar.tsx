"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { AwardCategory } from "@/data/awards";

const GOLD_FILTER = "brightness(0) saturate(100%) invert(89%) sepia(30%) saturate(600%) hue-rotate(5deg) brightness(105%)";

interface AwardsSidebarProps {
  awards: AwardCategory[];
}

export function AwardsSidebar({ awards }: AwardsSidebarProps) {
  const [activeSlug, setActiveSlug] = useState<string>(awards[0]?.slug ?? "");
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slug = entry.target.id;
            setActiveSlug(slug);
            history.replaceState(null, "", `#${slug}`);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    for (const award of awards) {
      const el = document.getElementById(award.slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [awards]);

  const handleClick = useCallback((slug: string) => {
    history.replaceState(null, "", `#${slug}`);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Award categories"
      className="hidden w-[200px] shrink-0 xl:block"
    >
      <div className="sticky top-[120px] flex flex-col gap-6">
        {awards.map((award) => {
          const isActive = activeSlug === award.slug;
          const isHovered = hoverSlug === award.slug;
          const showGold = isActive || isHovered;
          return (
            <button
              key={award.slug}
              type="button"
              onClick={() => handleClick(award.slug)}
              onMouseEnter={() => setHoverSlug(award.slug)}
              onMouseLeave={() => setHoverSlug(null)}
              aria-current={isActive ? "true" : undefined}
              className={`flex cursor-pointer items-center gap-2 border-b-2 pb-2 pl-3 text-left font-sans text-base font-normal leading-6 transition-colors ${
                isActive
                  ? "border-[var(--color-text-gold)] text-[var(--color-text-gold)]"
                  : "border-transparent text-white hover:text-[var(--color-text-gold)]"
              }`}
            >
              <Image
                src="/images/awards/icon-target.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 shrink-0 transition-[filter]"
                style={showGold ? { filter: GOLD_FILTER } : undefined}
                aria-hidden="true"
              />
              {award.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
