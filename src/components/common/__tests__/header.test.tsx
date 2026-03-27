import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "../header";
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

vi.mock("@/components/common/language-selector", () => ({
  LanguageSelector: () => <div data-testid="language-selector" />,
}));

vi.mock("@/components/common/profile-dropdown", () => ({
  ProfileDropdown: () => <div data-testid="profile-dropdown" />,
}));

vi.mock("@/components/common/mobile-menu", () => ({
  MobileMenu: () => <div data-testid="mobile-menu" />,
}));

vi.mock("@/components/common/icons/bell-icon", () => ({
  BellIcon: ({ className }: { className?: string }) => <span data-testid="bell-icon" className={className} />,
}));

const mockDictionary = {
  "common.header.nav.aboutSaa": "About SAA",
  "common.header.nav.awards": "Awards",
  "common.header.nav.kudos": "Kudos",
  "common.header.notifications": "Notifications",
  "common.header.language.ariaLabel": "Language",
} as Dictionary;

describe("Header", () => {
  it("renders logo with link to /countdown", () => {
    render(<Header dictionary={mockDictionary} locale="vi" />);
    const logoLink = screen.getByAltText("Sun Annual Awards 2025").closest("a");
    expect(logoLink).toHaveAttribute("href", "/countdown");
  });

  it("does not render nav links in simple variant", () => {
    render(<Header dictionary={mockDictionary} locale="vi" variant="simple" />);
    expect(screen.queryByText("About SAA")).not.toBeInTheDocument();
    expect(screen.queryByText("Awards")).not.toBeInTheDocument();
  });

  it("renders nav links in full variant", () => {
    render(<Header dictionary={mockDictionary} locale="vi" variant="full" />);
    expect(screen.getByText("About SAA")).toBeInTheDocument();
    expect(screen.getByText("Awards")).toBeInTheDocument();
    expect(screen.getByText("Kudos")).toBeInTheDocument();
  });

  it("highlights active nav link", () => {
    render(<Header dictionary={mockDictionary} locale="vi" variant="full" activeLink="/awards" />);
    const awardsLink = screen.getByText("Awards").closest("a");
    expect(awardsLink).toHaveAttribute("aria-current", "page");
  });

  it("renders bell icon in full variant", () => {
    render(<Header dictionary={mockDictionary} locale="vi" variant="full" />);
    expect(screen.getByTestId("bell-icon")).toBeInTheDocument();
  });

  it("does not render bell icon in simple variant", () => {
    render(<Header dictionary={mockDictionary} locale="vi" variant="simple" />);
    expect(screen.queryByTestId("bell-icon")).not.toBeInTheDocument();
  });

  it("renders language selector", () => {
    render(<Header dictionary={mockDictionary} locale="vi" />);
    expect(screen.getByTestId("language-selector")).toBeInTheDocument();
  });

  it("renders profile dropdown and mobile menu in full variant", () => {
    render(<Header dictionary={mockDictionary} locale="vi" variant="full" />);
    expect(screen.getByTestId("profile-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  it("does not render profile/mobile in simple variant", () => {
    render(<Header dictionary={mockDictionary} locale="vi" variant="simple" />);
    expect(screen.queryByTestId("profile-dropdown")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
});
