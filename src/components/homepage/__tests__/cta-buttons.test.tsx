import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CTAButtons } from "../cta-buttons";
import type { Dictionary } from "@/types/i18n";

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
  "homepage.cta.aboutAwards": "Tìm hiểu giải thưởng",
  "homepage.cta.aboutKudos": "Tìm hiểu Kudos",
} as Dictionary;

describe("CTAButtons", () => {
  it("renders awards CTA with correct href", () => {
    render(<CTAButtons dictionary={mockDictionary} />);
    const link = screen.getByText("Tìm hiểu giải thưởng").closest("a");
    expect(link).toHaveAttribute("href", "/awards");
  });

  it("renders kudos CTA with correct href", () => {
    render(<CTAButtons dictionary={mockDictionary} />);
    const link = screen.getByText("Tìm hiểu Kudos").closest("a");
    expect(link).toHaveAttribute("href", "/kudos");
  });

  it("renders arrow icons for both buttons", () => {
    render(<CTAButtons dictionary={mockDictionary} />);
    const icons = screen.getAllByTestId("arrow-icon");
    expect(icons).toHaveLength(2);
  });
});
