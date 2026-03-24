export type Locale = "vi" | "en";

export type TranslationKey =
  | "login.hero.description.line1.before"
  | "login.hero.description.line1.highlight"
  | "login.hero.description.line1.after"
  | "login.hero.description.line2"
  | "login.button.loginWithGoogle"
  | "login.button.ariaLabel"
  | "login.button.loading"
  | "login.error.cancelled"
  | "login.error.failed"
  | "login.error.network"
  | "login.error.unauthorized"
  | "login.error.serviceUnavailable"
  | "common.header.language.vi"
  | "common.header.language.en"
  | "common.header.language.ariaLabel"
  | "common.footer.copyright";

export type Dictionary = Record<TranslationKey, string>;
