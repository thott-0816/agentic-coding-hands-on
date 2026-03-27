import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeroSection } from "../hero-section";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock("@/components/login/login-button", () => ({
  LoginButton: ({ initialError }: { initialError?: string | null }) => (
    <div data-testid="login-button" data-error={initialError} />
  ),
}));

const mockDictionary = {
  "login.hero.description.line1.before": "Chào mừng đến ",
  "login.hero.description.line1.highlight": "SAA 2025",
  "login.hero.description.line1.after": " - sự kiện lớn nhất",
  "login.hero.description.line2": "của Sun* trong năm",
} as Dictionary;

describe("HeroSection", () => {
  it("renders ROOT FURTHER image", () => {
    render(<HeroSection dictionary={mockDictionary} />);
    expect(screen.getByAltText("ROOT FURTHER - Sun Annual Awards 2025")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<HeroSection dictionary={mockDictionary} />);
    expect(screen.getByText("SAA 2025")).toBeInTheDocument();
    // "của Sun* trong năm" is part of a <p> with mixed inline elements + <br>
    const paragraph = screen.getByText((_content, element) => {
      return element?.tagName === "P" && !!element.textContent?.includes("của Sun* trong năm");
    });
    expect(paragraph).toBeInTheDocument();
  });

  it("renders login button component", () => {
    render(<HeroSection dictionary={mockDictionary} />);
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("passes initialError to login button", () => {
    render(<HeroSection dictionary={mockDictionary} initialError="network" />);
    expect(screen.getByTestId("login-button")).toHaveAttribute("data-error", "network");
  });
});
