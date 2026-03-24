import type { Locale, TranslationKey, Dictionary } from "@/types/i18n";
import viTranslations from "@/libs/i18n/locales/vi.json";
import enTranslations from "@/libs/i18n/locales/en.json";

const dictionaries: Record<Locale, Dictionary> = {
  vi: viTranslations as Dictionary,
  en: enTranslations as Dictionary,
};

export function getLocale(langCookie?: string | null): Locale {
  if (langCookie === "en") return "en";
  return "vi";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getTranslation(locale: Locale, key: TranslationKey): string {
  const dict = dictionaries[locale];
  return dict[key] ?? key;
}
