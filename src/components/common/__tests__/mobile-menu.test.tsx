import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MobileMenu } from "../mobile-menu";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, onClick, ...props }: React.PropsWithChildren<{ href: string; onClick?: () => void }>) => (
    <a href={href} onClick={onClick} {...props}>{children}</a>
  ),
}));

const mockDictionary = {
  "common.header.nav.aboutSaa": "About SAA",
  "common.header.nav.awards": "Awards",
  "common.header.nav.kudos": "Kudos",
  "common.header.language.vi": "VN",
  "common.header.language.en": "EN",
} as Dictionary;

describe("MobileMenu", () => {
  it("renders hamburger button", () => {
    render(<MobileMenu dictionary={mockDictionary} locale="vi" />);
    expect(screen.getByLabelText("Menu")).toBeInTheDocument();
  });

  it("opens menu on click", () => {
    render(<MobileMenu dictionary={mockDictionary} locale="vi" />);
    fireEvent.click(screen.getByLabelText("Menu"));
    expect(screen.getByText("About SAA")).toBeInTheDocument();
    expect(screen.getByText("Awards")).toBeInTheDocument();
    expect(screen.getByText("Kudos")).toBeInTheDocument();
  });

  it("shows language options when open", () => {
    render(<MobileMenu dictionary={mockDictionary} locale="vi" />);
    fireEvent.click(screen.getByLabelText("Menu"));
    expect(screen.getByText("VN")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("highlights active nav link", () => {
    render(<MobileMenu dictionary={mockDictionary} locale="vi" activeLink="/awards" />);
    fireEvent.click(screen.getByLabelText("Menu"));
    const awardsLink = screen.getByText("Awards").closest("a");
    expect(awardsLink).toHaveAttribute("aria-current", "page");
  });

  it("closes menu on Escape", () => {
    render(<MobileMenu dictionary={mockDictionary} locale="vi" />);
    fireEvent.click(screen.getByLabelText("Menu"));
    expect(screen.getByText("About SAA")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("About SAA")).not.toBeInTheDocument();
  });

  it("closes menu on nav link click", () => {
    render(<MobileMenu dictionary={mockDictionary} locale="vi" />);
    fireEvent.click(screen.getByLabelText("Menu"));
    fireEvent.click(screen.getByText("Awards"));
    expect(screen.queryByText("About SAA")).not.toBeInTheDocument();
  });

  it("sets aria-expanded correctly", () => {
    render(<MobileMenu dictionary={mockDictionary} locale="vi" />);
    const btn = screen.getByLabelText("Menu");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });
});
