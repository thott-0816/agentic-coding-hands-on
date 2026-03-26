"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary, Locale, TranslationKey } from "@/types/i18n";

interface MobileMenuProps {
  dictionary: Dictionary;
  locale: Locale;
  activeLink?: string;
}

const NAV_LINKS: { href: string; i18nKey: TranslationKey }[] = [
  { href: "/", i18nKey: "common.header.nav.aboutSaa" },
  { href: "/awards", i18nKey: "common.header.nav.awards" },
  { href: "/kudos", i18nKey: "common.header.nav.kudos" },
];

const LOCALES: { value: Locale; flag: string; label: keyof Dictionary }[] = [
  { value: "vi", flag: "/images/flag-vn.svg", label: "common.header.language.vi" },
  { value: "en", flag: "/images/flag-uk.svg", label: "common.header.language.en" },
];

export function MobileMenu({ dictionary, locale, activeLink }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const setLocale = useCallback((newLocale: Locale) => {
    document.cookie = `lang=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    window.location.reload();
  }, []);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative lg:hidden">
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Menu"
        className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded transition-colors hover:bg-white/10"
      >
        <span
          className={`block h-0.5 w-5 bg-white transition-all duration-200 ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-white transition-all duration-200 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-white transition-all duration-200 ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 flex w-56 animate-[fadeIn_150ms_ease-out] flex-col rounded-lg border border-[#998C5F] bg-[#00070C] p-2 shadow-lg">
          {/* Nav Links */}
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded px-4 py-3 font-sans text-sm font-bold leading-6 tracking-[0.15px] transition-colors ${
                    isActive
                      ? "text-[var(--color-text-gold)]"
                      : "text-white hover:bg-[rgba(255,234,158,0.1)] hover:text-[var(--color-text-gold)]"
                  }`}
                >
                  {dictionary[link.i18nKey]}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-1 h-px bg-[#2E3940]" />

          {/* Language options */}
          <div className="flex flex-col">
            {LOCALES.map((loc) => (
              <button
                key={loc.value}
                type="button"
                onClick={() => {
                  if (loc.value !== locale) {
                    setLocale(loc.value);
                  }
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 rounded px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[rgba(255,234,158,0.1)] ${
                  loc.value === locale ? "bg-[rgba(255,234,158,0.2)]" : ""
                }`}
              >
                <Image
                  src={loc.flag}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span>{dictionary[loc.label]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
