import { describe, it, expect } from "vitest";
import { hashtags } from "../hashtags";

describe("hashtags data", () => {
  it("contains exactly 13 hashtags", () => {
    expect(hashtags).toHaveLength(13);
  });

  it("each hashtag has id, name, and slug", () => {
    hashtags.forEach((tag) => {
      expect(tag.id).toBeTruthy();
      expect(tag.name).toBeTruthy();
      expect(tag.slug).toBeTruthy();
    });
  });

  it("all slugs are unique", () => {
    const slugs = hashtags.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("contains expected hashtags", () => {
    const names = hashtags.map((t) => t.name);
    expect(names).toContain("Toàn diện");
    expect(names).toContain("Aim High");
    expect(names).toContain("Be Agile");
    expect(names).toContain("Wasshoi");
  });
});
