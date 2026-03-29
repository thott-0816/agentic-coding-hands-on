import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { KudosPromo } from "../kudos-promo";
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
  "homepage.kudos.label": "Sun* Annual Awards 2025",
  "homepage.kudos.title": "Sun* Kudos",
  "homepage.kudos.description": "Mô tả Kudos",
  "homepage.kudos.detail": "Chi tiết",
} as Dictionary;

describe("KudosPromo", () => {
  it("renders label, title and description", () => {
    render(<KudosPromo dictionary={mockDictionary} />);
    expect(screen.getByText("Sun* Annual Awards 2025")).toBeInTheDocument();
    expect(screen.getByText("Sun* Kudos")).toBeInTheDocument();
    expect(screen.getByText("Mô tả Kudos")).toBeInTheDocument();
  });

  it("renders detail link pointing to /kudos", () => {
    render(<KudosPromo dictionary={mockDictionary} />);
    const link = screen.getByText("Chi tiết").closest("a");
    expect(link).toHaveAttribute("href", "/kudos");
  });

  it("renders kudos logo image", () => {
    render(<KudosPromo dictionary={mockDictionary} />);
    expect(screen.getByAltText("Sun* Kudos")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(<KudosPromo dictionary={mockDictionary} className="custom-class" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("custom-class");
  });

  it("applies default className when not provided", () => {
    const { container } = render(<KudosPromo dictionary={mockDictionary} />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("mx-[var(--spacing-page-x)]");
  });
});
