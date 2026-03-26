"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Dictionary } from "@/types/i18n";

interface PrelaunchCountdownProps {
  dictionary: Dictionary;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

// 20 days + 20 hours + 20 minutes = 29300 total minutes
const INITIAL_TOTAL_MINUTES = 20 * 24 * 60 + 20 * 60 + 20;

function minutesToDisplay(totalMinutes: number) {
  if (totalMinutes <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }
  return {
    days: Math.floor(totalMinutes / (24 * 60)),
    hours: Math.floor((totalMinutes % (24 * 60)) / 60),
    minutes: totalMinutes % 60,
  };
}

export function PrelaunchCountdown({ dictionary }: PrelaunchCountdownProps) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    setRemaining(INITIAL_TOTAL_MINUTES);

    const interval = setInterval(() => {
      setRemaining((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const display = minutesToDisplay(remaining ?? INITIAL_TOTAL_MINUTES);

  const groups = [
    { value: display.days, label: dictionary["homepage.countdown.days"] },
    { value: display.hours, label: dictionary["homepage.countdown.hours"] },
    { value: display.minutes, label: dictionary["homepage.countdown.minutes"] },
  ];

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[var(--color-bg-primary)]">
      {/* Background image */}
      <Image
        src="/images/homepage-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "right center" }}
        aria-hidden="true"
      />

      {/* Gradient overlay — 18deg per Figma */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 px-4 max-md:px-4 md:max-lg:px-12"
        aria-live="polite"
        aria-label={
          remaining !== null
            ? `${display.days} ${dictionary["homepage.countdown.days"]} ${display.hours} ${dictionary["homepage.countdown.hours"]} ${display.minutes} ${dictionary["homepage.countdown.minutes"]}`
            : undefined
        }
      >
        {/* Title */}
        <h1 className="text-center font-sans text-[36px] font-bold leading-[48px] text-white max-md:text-2xl max-md:leading-8 md:max-lg:text-[30px]">
          {dictionary["countdown.title"]}
        </h1>

        {/* Countdown groups */}
        <div className="flex items-start gap-[60px] max-md:gap-6 md:max-lg:gap-10">
          {groups.map((group) => (
            <div
              key={group.label}
              className="flex flex-col items-center gap-[21px] max-md:gap-3 md:max-lg:gap-4"
            >
              {/* Digit tiles row */}
              <div className="flex gap-[21px] max-md:gap-2 md:max-lg:gap-3">
                {pad(group.value)
                  .split("")
                  .map((digit, i) => (
                    <div
                      key={i}
                      className="relative flex h-[123px] w-[77px] items-center justify-center rounded-xl max-md:h-[77px] max-md:w-[48px] md:max-lg:h-[96px] md:max-lg:w-[60px]"
                    >
                      {/* Glassmorphism tile background */}
                      <div
                        className="absolute inset-0 rounded-xl border border-[var(--color-text-gold)] opacity-50"
                        style={{
                          background:
                            "linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.1) 100%)",
                          backdropFilter: "blur(25px)",
                          WebkitBackdropFilter: "blur(25px)",
                        }}
                        aria-hidden="true"
                      />
                      {/* Digit text — always opacity 1 */}
                      <span className="relative z-10 font-[family-name:var(--font-orbitron)] text-[74px] font-normal leading-none text-white max-md:text-[46px] md:max-lg:text-[58px]">
                        {digit}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Label */}
              <span className="font-sans text-[36px] font-bold leading-[48px] text-white max-md:text-xl max-md:leading-7 md:max-lg:text-[28px] md:max-lg:leading-9">
                {group.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
