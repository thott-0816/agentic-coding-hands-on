import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AwardsHeroBanner } from "../awards-hero-banner";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

describe("AwardsHeroBanner", () => {
  it("renders ROOT FURTHER image", () => {
    render(<AwardsHeroBanner />);
    expect(screen.getByAltText("ROOT FURTHER")).toBeInTheDocument();
  });

  it("renders background image as decorative", () => {
    render(<AwardsHeroBanner />);
    const bgImages = screen.getAllByRole("img", { hidden: true });
    expect(bgImages.length).toBeGreaterThan(0);
  });

  it("renders as section element", () => {
    const { container } = render(<AwardsHeroBanner />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
