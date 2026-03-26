import { describe, it, expect } from "vitest";
import { getLocale, getDictionary, getTranslation } from "@/libs/i18n/config";

describe("getLocale", () => {
  it("returns 'vi' when cookie is undefined", () => {
    expect(getLocale(undefined)).toBe("vi");
  });

  it("returns 'vi' when cookie is null", () => {
    expect(getLocale(null)).toBe("vi");
  });

  it("returns 'vi' when cookie is 'vi'", () => {
    expect(getLocale("vi")).toBe("vi");
  });

  it("returns 'en' when cookie is 'en'", () => {
    expect(getLocale("en")).toBe("en");
  });

  it("returns 'vi' for unknown value", () => {
    expect(getLocale("fr")).toBe("vi");
  });
});

describe("getDictionary", () => {
  it("returns Vietnamese dictionary", () => {
    const dict = getDictionary("vi");
    expect(dict["login.button.loginWithGoogle"]).toBe("ĐĂNG NHẬP với Google");
    expect(dict["common.footer.copyright"]).toBe(
      "Bản quyền thuộc về Sun* © 2025"
    );
  });

  it("returns English dictionary", () => {
    const dict = getDictionary("en");
    expect(dict["common.footer.copyright"]).toBe(
      "Copyright belongs to Sun* © 2025"
    );
  });
});

describe("getTranslation", () => {
  it("returns correct Vietnamese translation", () => {
    expect(getTranslation("vi", "login.hero.description.line1.highlight")).toBe(
      "SAA 2025"
    );
  });

  it("returns correct English translation", () => {
    expect(getTranslation("en", "login.hero.description.line1.highlight")).toBe(
      "SAA 2025"
    );
  });

  it("returns key itself for missing translation", () => {
    const result = getTranslation("vi", "nonexistent.key" as never);
    expect(result).toBe("nonexistent.key");
  });
});
