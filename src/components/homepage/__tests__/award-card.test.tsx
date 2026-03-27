import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AwardCard } from "../award-card";
import type { AwardCategory } from "@/data/awards";
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

const mockAward: AwardCategory = {
  name: "Top Talent",
  slug: "top-talent",
  description: "Vinh danh top cá nhân xuất sắc",
  imagePath: "/images/awards/top-talent.png",
};

const mockDictionary = {
  "homepage.awards.detail": "Chi tiết",
} as Dictionary;

describe("AwardCard", () => {
  it("renders award name", () => {
    render(<AwardCard award={mockAward} dictionary={mockDictionary} />);
    expect(screen.getByText("Top Talent")).toBeInTheDocument();
  });

  it("renders award description", () => {
    render(<AwardCard award={mockAward} dictionary={mockDictionary} />);
    expect(screen.getByText("Vinh danh top cá nhân xuất sắc")).toBeInTheDocument();
  });

  it("renders detail link with correct href", () => {
    render(<AwardCard award={mockAward} dictionary={mockDictionary} />);
    const detailLink = screen.getByText("Chi tiết").closest("a");
    expect(detailLink).toHaveAttribute("href", "/awards#top-talent");
  });

  it("renders award image with correct alt text", () => {
    render(<AwardCard award={mockAward} dictionary={mockDictionary} />);
    expect(screen.getByAltText("Top Talent")).toBeInTheDocument();
  });

  it("all links point to /awards#slug", () => {
    render(<AwardCard award={mockAward} dictionary={mockDictionary} />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/awards#top-talent");
    });
  });
});
