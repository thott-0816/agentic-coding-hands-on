"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { HighlightKudoCard } from "@/components/kudos/highlight-kudo-card";
import type { Kudo } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

interface KudosCarouselProps {
  kudos: Kudo[];
  dictionary: Dictionary;
}

const CARD_BG = "rgba(255, 248, 225, 1)";
const AUTO_SLIDE_MS = 5000;
const CARD_WIDTH = 560;
const CARD_GAP = 40;
const STEP = CARD_WIDTH + CARD_GAP;

export function KudosCarousel({ kudos, dictionary }: KudosCarouselProps) {
  const total = kudos.length;
  // Prepend last card + append first card for seamless loop
  const extendedKudos = useMemo(
    () => [kudos[total - 1], ...kudos, kudos[0]],
    [kudos, total]
  );
  // Internal index into extendedKudos (0=clone-last, 1..total=real, total+1=clone-first)
  const [innerIndex, setInnerIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Real index for display (0-based)
  const realIndex = ((innerIndex - 1 + total) % total);

  const goNext = useCallback(() => {
    setIsTransitioning(true);
    setInnerIndex((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    setIsTransitioning(true);
    setInnerIndex((prev) => prev - 1);
  }, []);

  // Snap to real position after reaching clone
  useEffect(() => {
    if (!isTransitioning) return;
    const timeout = setTimeout(() => {
      if (innerIndex === 0) {
        // Jumped to clone-last → snap to real last
        setIsTransitioning(false);
        setInnerIndex(total);
      } else if (innerIndex === total + 1) {
        // Jumped to clone-first → snap to real first
        setIsTransitioning(false);
        setInnerIndex(1);
      }
    }, 320); // slightly longer than CSS transition (300ms)
    return () => clearTimeout(timeout);
  }, [innerIndex, total, isTransitioning]);

  // Re-enable transition after snap
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => setIsTransitioning(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Auto-slide
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_SLIDE_MS);
  }, [goNext]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = useCallback(() => {
    goPrev();
    resetTimer();
  }, [goPrev, resetTimer]);

  const handleNext = useCallback(() => {
    goNext();
    resetTimer();
  }, [goNext, resetTimer]);

  const translateX = `calc(50% - ${CARD_WIDTH / 2}px - ${innerIndex * STEP}px)`;

  return (
    <div role="region" aria-label="Highlight Kudos" className="flex flex-col gap-8">
      <div className="relative">
        {/* Prev button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Smooth fade edges — 5-stop gradient for smoother transition */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40"
          style={{
            background: "linear-gradient(to right, var(--color-bg-primary) 0%, rgba(0,16,26,0.85) 25%, rgba(0,16,26,0.5) 50%, rgba(0,16,26,0.15) 75%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40"
          style={{
            background: "linear-gradient(to left, var(--color-bg-primary) 0%, rgba(0,16,26,0.85) 25%, rgba(0,16,26,0.5) 50%, rgba(0,16,26,0.15) 75%, transparent 100%)",
          }}
        />

        {/* Cards track */}
        <div className="overflow-hidden px-14">
          <div
            ref={trackRef}
            className={`flex items-center ${isTransitioning ? "transition-transform duration-300 ease-out" : ""}`}
            style={{
              transform: `translateX(${translateX})`,
              gap: `${CARD_GAP}px`,
            }}
          >
            {extendedKudos.map((kudo, i) => (
              <div
                key={`${kudo.id}-${i}`}
                className="shrink-0"
                style={{
                  width: `${CARD_WIDTH}px`,
                  zIndex: i === innerIndex ? 10 : 1,
                }}
              >
                <HighlightKudoCard
                  kudo={kudo}
                  dictionary={dictionary}
                  bgColor={CARD_BG}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Pagination: ◀ 2/5 ▶ */}
      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous"
          className="cursor-pointer text-white transition-colors hover:text-[var(--color-text-gold)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="font-sans leading-none">
          <span className="text-[32px] font-bold text-[var(--color-text-gold)]">{realIndex + 1}</span>
          <span className="text-[20px] font-semibold text-white/50">/{total}</span>
        </span>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next"
          className="cursor-pointer text-white transition-colors hover:text-[var(--color-text-gold)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
