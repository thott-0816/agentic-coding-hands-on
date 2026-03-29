import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AwardsSectionTitle } from "../awards-section-title";
import type { Dictionary } from "@/types/i18n";

const mockDictionary = {
  "awards.page.subtitle": "Sun* Annual Awards 2025",
  "awards.page.title": "Hệ thống giải thưởng SAA 2025",
} as Dictionary;

describe("AwardsSectionTitle", () => {
  it("renders subtitle", () => {
    render(<AwardsSectionTitle dictionary={mockDictionary} />);
    expect(screen.getByText("Sun* Annual Awards 2025")).toBeInTheDocument();
  });

  it("renders title with gold color class", () => {
    render(<AwardsSectionTitle dictionary={mockDictionary} />);
    const title = screen.getByText("Hệ thống giải thưởng SAA 2025");
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
  });

  it("renders divider between subtitle and title", () => {
    render(<AwardsSectionTitle dictionary={mockDictionary} />);
    const subtitle = screen.getByText("Sun* Annual Awards 2025");
    expect(subtitle.className).toContain("border-b");
  });
});
