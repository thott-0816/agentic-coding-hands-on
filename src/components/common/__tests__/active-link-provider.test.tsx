import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ActiveHeader, ActiveFooter } from "../active-link-provider";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/navigation", () => ({
  usePathname: () => "/awards",
}));

vi.mock("@/components/common/header", () => ({
  Header: ({ activeLink, variant }: { activeLink?: string; variant?: string }) => (
    <div data-testid="header" data-active-link={activeLink} data-variant={variant} />
  ),
}));

vi.mock("@/components/common/footer", () => ({
  Footer: ({ activeLink, variant }: { activeLink?: string; variant?: string }) => (
    <div data-testid="footer" data-active-link={activeLink} data-variant={variant} />
  ),
}));

const mockDictionary = {} as Dictionary;

describe("ActiveHeader", () => {
  it("passes pathname as activeLink to Header", () => {
    render(<ActiveHeader dictionary={mockDictionary} locale="vi" variant="full" />);
    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("data-active-link", "/awards");
    expect(header).toHaveAttribute("data-variant", "full");
  });
});

describe("ActiveFooter", () => {
  it("passes pathname as activeLink to Footer", () => {
    render(<ActiveFooter dictionary={mockDictionary} variant="full" />);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveAttribute("data-active-link", "/awards");
    expect(footer).toHaveAttribute("data-variant", "full");
  });
});
