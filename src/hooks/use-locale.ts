"use client";

import { useCallback } from "react";
import type { Locale } from "@/types/i18n";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function useLocale(): {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
} {
  const cookieValue = getCookie("lang");
  const locale: Locale = cookieValue === "en" ? "en" : "vi";

  const setLocale = useCallback((newLocale: Locale) => {
    document.cookie = `lang=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    window.location.reload();
  }, []);

  return { locale, setLocale };
}
