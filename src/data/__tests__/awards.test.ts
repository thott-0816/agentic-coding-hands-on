import { describe, it, expect } from "vitest";
import { awards } from "../awards";
import type { AwardCategory } from "../awards";

describe("awards data", () => {
  it("contains exactly 6 award categories", () => {
    expect(awards).toHaveLength(6);
  });

  it("each award has required fields", () => {
    awards.forEach((award: AwardCategory) => {
      expect(award.name).toBeTruthy();
      expect(award.slug).toBeTruthy();
      expect(award.description).toBeTruthy();
      expect(award.imagePath).toBeTruthy();
    });
  });

  it("all slugs are unique", () => {
    const slugs = awards.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has correct award order", () => {
    expect(awards[0].slug).toBe("top-talent");
    expect(awards[1].slug).toBe("top-project");
    expect(awards[2].slug).toBe("top-project-leader");
    expect(awards[3].slug).toBe("best-manager");
    expect(awards[4].slug).toBe("signature-2025-creator");
    expect(awards[5].slug).toBe("mvp");
  });

  it("Signature 2025 has dual prize values", () => {
    const signature = awards.find((a) => a.slug === "signature-2025-creator");
    expect(signature?.prizeValue).toBeTruthy();
    expect(signature?.prizeValueTeam).toBeTruthy();
    expect(signature?.prizeNote).toBeTruthy();
    expect(signature?.prizeNoteTeam).toBeTruthy();
  });

  it("image paths start with /images/awards/", () => {
    awards.forEach((award) => {
      expect(award.imagePath).toMatch(/^\/images\/awards\//);
    });
  });
});
