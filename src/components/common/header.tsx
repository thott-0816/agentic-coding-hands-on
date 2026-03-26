import Image from "next/image";
import { LanguageSelector } from "@/components/common/language-selector";
import type { Dictionary, Locale } from "@/types/i18n";

interface HeaderProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function Header({ dictionary, locale }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-[var(--color-header-bg)] px-[var(--spacing-header-x)] py-[var(--spacing-header-y)] max-md:h-16 max-md:px-4 md:max-lg:px-12">
      {/* A.1 Logo */}
      <Image
        src="/images/saa-logo.png"
        alt="Sun Annual Awards 2025"
        width={52}
        height={48}
        className="h-auto w-[52px] pointer-events-none"
        priority
      />

      {/* A.2 Language Selector */}
      <LanguageSelector dictionary={dictionary} initialLocale={locale} />
    </header>
  );
}
