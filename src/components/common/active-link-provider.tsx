"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import type { Dictionary, Locale } from "@/types/i18n";

interface ActiveHeaderProps {
  dictionary: Dictionary;
  locale: Locale;
  variant?: "simple" | "full";
}

export function ActiveHeader({ dictionary, locale, variant }: ActiveHeaderProps) {
  const pathname = usePathname();
  return (
    <Header
      dictionary={dictionary}
      locale={locale}
      variant={variant}
      activeLink={pathname}
    />
  );
}

interface ActiveFooterProps {
  dictionary: Dictionary;
  variant?: "simple" | "full";
}

export function ActiveFooter({ dictionary, variant }: ActiveFooterProps) {
  const pathname = usePathname();
  return (
    <Footer
      dictionary={dictionary}
      variant={variant}
      activeLink={pathname}
    />
  );
}
