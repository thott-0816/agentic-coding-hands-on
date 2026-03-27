import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AwardSection } from "../award-section";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("@/components/common/icons/arrow-right-icon", () => ({
  ArrowRightIcon: ({ className }: { className?: string }) => (
    <span data-testid="arrow-icon" className={className} />
  ),
}));

const mockDictionary = {
  "homepage.awards.caption": "Sun* Annual Awards 2025",
  "homepage.awards.title": "Hạng mục giải thưởng",
  "homepage.awards.detail": "Chi tiết",
} as Dictionary;

describe("AwardSection", () => {
  it("renders section caption", () => {
    render(<AwardSection dictionary={mockDictionary} />);
    expect(screen.getByText("Sun* Annual Awards 2025")).toBeInTheDocument();
  });

  it("renders section title", () => {
    render(<AwardSection dictionary={mockDictionary} />);
    expect(screen.getByText("Hạng mục giải thưởng")).toBeInTheDocument();
  });

  it("renders all 6 award cards", () => {
    render(<AwardSection dictionary={mockDictionary} />);
    expect(screen.getByText("Top Talent")).toBeInTheDocument();
    expect(screen.getByText("Top Project")).toBeInTheDocument();
    expect(screen.getByText("Top Project Leader")).toBeInTheDocument();
    expect(screen.getByText("Best Manager")).toBeInTheDocument();
    expect(screen.getByText("Signature 2025 - Creator")).toBeInTheDocument();
    expect(screen.getByText("MVP (Most Valuable Person)")).toBeInTheDocument();
  });

  it("renders 6 detail links", () => {
    render(<AwardSection dictionary={mockDictionary} />);
    const detailLinks = screen.getAllByText("Chi tiết");
    expect(detailLinks).toHaveLength(6);
  });
});
