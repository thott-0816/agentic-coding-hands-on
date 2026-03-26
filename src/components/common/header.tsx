import Image from "next/image";
import Link from "next/link";
import { LanguageSelector } from "@/components/common/language-selector";
import { ProfileDropdown } from "@/components/common/profile-dropdown";
import { MobileMenu } from "@/components/common/mobile-menu";
import { BellIcon } from "@/components/common/icons/bell-icon";
import type { Dictionary, Locale, TranslationKey } from "@/types/i18n";

interface HeaderProps {
  dictionary: Dictionary;
  locale: Locale;
  variant?: "simple" | "full";
  activeLink?: string;
}

const NAV_LINKS: { href: string; i18nKey: TranslationKey }[] = [
  { href: "/", i18nKey: "common.header.nav.aboutSaa" },
  { href: "/awards", i18nKey: "common.header.nav.awards" },
  { href: "/kudos", i18nKey: "common.header.nav.kudos" },
];

export function Header({ dictionary, locale, variant = "simple", activeLink }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-[var(--color-header-bg)] px-[var(--spacing-header-x)] py-[var(--spacing-header-y)] backdrop-blur-xl max-md:h-16 max-md:px-4 md:max-lg:px-12">
      {/* Left: Logo + Nav Links */}
      <div className="flex items-center gap-16">
        <Link href="/countdown">
          <Image
            src="/images/saa-logo.png"
            alt="Sun Annual Awards 2025"
            width={52}
            height={48}
            className="h-auto w-[52px] pointer-events-none"
            priority
          />
        </Link>

        {variant === "full" && (
          <nav role="navigation" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded px-4 py-2 font-sans text-base font-normal leading-6 tracking-[0.15px] transition-colors ${
                    isActive
                      ? "text-[var(--color-text-gold)] underline underline-offset-4 decoration-2"
                      : "text-white hover:bg-white/10 hover:text-[var(--color-text-gold)]"
                  }`}
                >
                  {dictionary[link.i18nKey]}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        {variant === "full" && (
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10"
            aria-label={dictionary["common.header.notifications"]}
          >
            <BellIcon className="h-6 w-6" />
          </button>
        )}

        {/* Language selector - hidden on lg and below */}
        <div className="hidden lg:block">
          <LanguageSelector dictionary={dictionary} initialLocale={locale} />
        </div>

        {variant === "full" && (
          <ProfileDropdown dictionary={dictionary} />
        )}

        {/* Mobile menu - visible on lg and below */}
        {variant === "full" && (
          <MobileMenu dictionary={dictionary} locale={locale} activeLink={activeLink} />
        )}
      </div>
    </header>
  );
}
