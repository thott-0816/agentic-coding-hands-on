import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AwardDetailCard } from "../award-detail-card";
import type { AwardCategory } from "@/data/awards";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

const mockDictionary = {
  "awards.quantity.label": "Số lượng giải thưởng",
  "awards.prize.label": "Giá trị giải thưởng",
  "awards.unit.individual": "Cá nhân",
  "awards.unit.team": "Tập thể",
  "awards.unit.unit": "Đơn vị",
  "awards.prize.perAward": "cho mỗi giải thưởng",
  "awards.prize.individual": "cho giải cá nhân",
  "awards.prize.team": "cho giải tập thể",
} as Dictionary;

const baseAward: AwardCategory = {
  name: "Top Talent",
  slug: "top-talent",
  description: "Vinh danh top cá nhân xuất sắc",
  imagePath: "/images/awards/top-talent.png",
  fullDescription: "Giải thưởng Top Talent vinh danh những cá nhân xuất sắc.",
  quantity: 10,
  unit: "awards.unit.unit",
  prizeValue: "7.000.000 VNĐ",
  prizeNote: "awards.prize.perAward",
};

describe("AwardDetailCard", () => {
  it("renders award title", () => {
    render(<AwardDetailCard award={baseAward} dictionary={mockDictionary} index={0} />);
    expect(screen.getByText("Top Talent")).toBeInTheDocument();
  });

  it("renders full description", () => {
    render(<AwardDetailCard award={baseAward} dictionary={mockDictionary} index={0} />);
    expect(screen.getByText("Giải thưởng Top Talent vinh danh những cá nhân xuất sắc.")).toBeInTheDocument();
  });

  it("renders quantity with padded number", () => {
    render(<AwardDetailCard award={baseAward} dictionary={mockDictionary} index={0} />);
    expect(screen.getByText("Số lượng giải thưởng")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders unit text from dictionary", () => {
    render(<AwardDetailCard award={baseAward} dictionary={mockDictionary} index={0} />);
    expect(screen.getByText("Đơn vị")).toBeInTheDocument();
  });

  it("renders prize value", () => {
    render(<AwardDetailCard award={baseAward} dictionary={mockDictionary} index={0} />);
    expect(screen.getByText("Giá trị giải thưởng")).toBeInTheDocument();
    expect(screen.getByText("7.000.000 VNĐ")).toBeInTheDocument();
  });

  it("renders prize note from dictionary", () => {
    render(<AwardDetailCard award={baseAward} dictionary={mockDictionary} index={0} />);
    expect(screen.getByText("cho mỗi giải thưởng")).toBeInTheDocument();
  });

  it("renders award image", () => {
    render(<AwardDetailCard award={baseAward} dictionary={mockDictionary} index={0} />);
    expect(screen.getByAltText("Top Talent")).toBeInTheDocument();
  });

  it("applies flex-row-reverse for odd index", () => {
    const { container } = render(<AwardDetailCard award={baseAward} dictionary={mockDictionary} index={1} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("flex-row-reverse");
  });

  it("does not apply flex-row-reverse for even index", () => {
    const { container } = render(<AwardDetailCard award={baseAward} dictionary={mockDictionary} index={0} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain("flex-row-reverse");
  });

  it("renders team prize for Signature award", () => {
    const signatureAward: AwardCategory = {
      ...baseAward,
      name: "Signature 2025 - Creator",
      slug: "signature-2025-creator",
      prizeValue: "5.000.000 VNĐ",
      prizeNote: "awards.prize.individual",
      prizeValueTeam: "8.000.000 VNĐ",
      prizeNoteTeam: "awards.prize.team",
    };
    render(<AwardDetailCard award={signatureAward} dictionary={mockDictionary} index={4} />);
    expect(screen.getByText("5.000.000 VNĐ")).toBeInTheDocument();
    expect(screen.getByText("cho giải cá nhân")).toBeInTheDocument();
    expect(screen.getByText("8.000.000 VNĐ")).toBeInTheDocument();
    expect(screen.getByText("cho giải tập thể")).toBeInTheDocument();
  });

  it("does not render quantity section when quantity is undefined", () => {
    const noQuantityAward: AwardCategory = {
      name: "Test",
      slug: "test",
      description: "Test",
      imagePath: "/test.png",
    };
    render(<AwardDetailCard award={noQuantityAward} dictionary={mockDictionary} index={0} />);
    expect(screen.queryByText("Số lượng giải thưởng")).not.toBeInTheDocument();
  });
});
