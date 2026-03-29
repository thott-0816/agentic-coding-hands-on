import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { KudosBanner } from "../kudos-banner";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

const mockDictionary = {
  "kudos.banner.title": "Hệ thống ghi nhận và cảm ơn",
  "kudos.banner.inputPlaceholder": "Hôm nay, bạn muốn gửi lời cảm ơn?",
  "kudos.banner.searchPlaceholder": "Tìm kiếm profile Sunner",
} as Dictionary;

describe("KudosBanner", () => {
  it("renders banner title in gold color", () => {
    render(<KudosBanner dictionary={mockDictionary} users={[]} />);
    const title = screen.getByText("Hệ thống ghi nhận và cảm ơn");
    expect(title).toBeInTheDocument();
    expect(title.className).toContain("text-[var(--color-text-gold)]");
  });

  it("renders KUDOS logo image from Figma asset", () => {
    render(<KudosBanner dictionary={mockDictionary} users={[]} />);
    const logo = screen.getByAltText("SAA KUDOS");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/kudos/kudos-logo.svg");
  });

  it("renders pill input trigger", () => {
    render(<KudosBanner dictionary={mockDictionary} users={[]} />);
    expect(screen.getByText("Hôm nay, bạn muốn gửi lời cảm ơn?")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<KudosBanner dictionary={mockDictionary} users={[]} />);
    expect(screen.getByPlaceholderText("Tìm kiếm profile Sunner")).toBeInTheDocument();
  });

  it("renders as section element", () => {
    const { container } = render(<KudosBanner dictionary={mockDictionary} users={[]} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("content is left-aligned (no items-center)", () => {
    const { container } = render(<KudosBanner dictionary={mockDictionary} users={[]} />);
    const section = container.querySelector("section");
    expect(section?.className).not.toContain("items-center");
  });
});
