"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@/components/common/icons/chevron-down-icon";
import type { Locale, Dictionary } from "@/types/i18n";

interface LanguageSelectorProps {
  dictionary: Dictionary;
  initialLocale: Locale;
}

const LOCALES: { value: Locale; flag: string; label: keyof Dictionary }[] = [
  { value: "vi", flag: "/images/flag-vn.svg", label: "common.header.language.vi" },
  { value: "en", flag: "/images/flag-uk.svg", label: "common.header.language.en" },
];

export function LanguageSelector({ dictionary, initialLocale }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, setFocusIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const currentLocale = LOCALES.find((l) => l.value === initialLocale) ?? LOCALES[0];

  const setLocale = useCallback((newLocale: Locale) => {
    document.cookie = `lang=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    window.location.reload();
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Focus management when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const currentIndex = LOCALES.findIndex((l) => l.value === initialLocale);
      setFocusIndex(currentIndex);
      optionsRef.current[currentIndex]?.focus();
    }
  }, [isOpen, initialLocale]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          containerRef.current?.querySelector("button")?.focus();
          break;
        case "ArrowDown":
          event.preventDefault();
          setFocusIndex((prev) => {
            const next = Math.min(prev + 1, LOCALES.length - 1);
            optionsRef.current[next]?.focus();
            return next;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusIndex((prev) => {
            const next = Math.max(prev - 1, 0);
            optionsRef.current[next]?.focus();
            return next;
          });
          break;
      }
    },
    [isOpen]
  );

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={dictionary["common.header.language.ariaLabel"]}
        className="flex h-14 cursor-pointer items-center gap-1 rounded px-4 transition-colors hover:bg-white/10 focus:outline-2 focus:outline-offset-2 focus:outline-white/50"
      >
        <Image
          src={currentLocale.flag}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <span className="font-sans text-base font-bold leading-6 tracking-[0.15px] text-white">
          {dictionary[currentLocale.label]}
        </span>
        <ChevronDownIcon open={isOpen} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={dictionary["common.header.language.ariaLabel"]}
          className="absolute right-0 top-full mt-1 flex animate-[fadeIn_150ms_ease-out] flex-col rounded-lg border border-[#998C5F] bg-[#00070C] p-1.5 shadow-lg"
        >
          {LOCALES.map((loc, index) => (
            <button
              key={loc.value}
              ref={(el) => { optionsRef.current[index] = el; }}
              type="button"
              role="option"
              aria-selected={loc.value === initialLocale}
              onClick={() => {
                if (loc.value !== initialLocale) {
                  setLocale(loc.value);
                }
                setIsOpen(false);
              }}
              className={`flex h-14 w-[108px] items-center gap-1 rounded-sm p-4 text-base font-bold text-white transition-colors hover:bg-[rgba(255,234,158,0.1)] ${
                loc.value === initialLocale ? "bg-[rgba(255,234,158,0.2)]" : ""
              }`}
            >
              <Image
                src={loc.flag}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span>{dictionary[loc.label]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
