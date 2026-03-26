"use client";

import { useState, useEffect } from "react";
import type { Dictionary } from "@/types/i18n";

interface CountdownTimerProps {
  dictionary: Dictionary;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

// Initial countdown: 20 days, 20 hours, 20 minutes in total minutes
const INITIAL_TOTAL_MINUTES = 20 * 24 * 60 + 20 * 60 + 20;

function minutesToDisplay(totalMinutes: number) {
  if (totalMinutes <= 0) {
    return { days: 0, hours: 0, minutes: 0, isStarted: true };
  }
  return {
    days: Math.floor(totalMinutes / (24 * 60)),
    hours: Math.floor((totalMinutes % (24 * 60)) / 60),
    minutes: totalMinutes % 60,
    isStarted: false,
  };
}

export function CountdownTimer({ dictionary }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    setRemaining(INITIAL_TOTAL_MINUTES);

    const interval = setInterval(() => {
      setRemaining((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const display = minutesToDisplay(remaining ?? INITIAL_TOTAL_MINUTES);

  return (
    <div
      className="flex flex-col gap-3"
      aria-live="polite"
      aria-label={remaining !== null ? `${display.days} ${dictionary["homepage.countdown.days"]} ${display.hours} ${dictionary["homepage.countdown.hours"]} ${display.minutes} ${dictionary["homepage.countdown.minutes"]}` : undefined}
    >
      {!display.isStarted && (
        <p className="font-sans text-2xl font-normal leading-8 text-white">
          {dictionary["homepage.hero.comingSoon"]}
        </p>
      )}

      <div className="flex items-end gap-8 max-md:gap-5">
        {[
          { value: display.days, label: dictionary["homepage.countdown.days"] },
          { value: display.hours, label: dictionary["homepage.countdown.hours"] },
          { value: display.minutes, label: dictionary["homepage.countdown.minutes"] },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-3">
            <div className="flex gap-1">
              {pad(item.value)
                .split("")
                .map((digit, i) => (
                  <div
                    key={i}
                    className="flex h-[72px] w-[42px] items-center justify-center rounded-lg border border-[#5A5D62] font-[family-name:var(--font-orbitron)] text-[40px] font-normal leading-none text-white max-md:h-[60px] max-md:w-[34px] max-md:text-[28px]"
                    style={{ background: "linear-gradient(180deg, #4A4D52 0%, #2A2D30 100%)" }}
                  >
                    {digit}
                  </div>
                ))}
            </div>
            <span className="font-sans text-2xl font-normal leading-8 text-white max-md:text-sm">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
