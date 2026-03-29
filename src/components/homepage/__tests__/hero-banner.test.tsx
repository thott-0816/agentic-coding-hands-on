import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeroBanner } from "../hero-banner";
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
  "homepage.hero.comingSoon": "Sự kiện sẽ bắt đầu sau",
  "homepage.countdown.days": "NGÀY",
  "homepage.countdown.hours": "GIỜ",
  "homepage.countdown.minutes": "PHÚT",
  "homepage.event.time": "Thời gian",
  "homepage.event.venue": "Địa điểm",
  "homepage.event.livestream": "Livestream",
  "homepage.cta.aboutAwards": "Tìm hiểu giải thưởng",
  "homepage.cta.aboutKudos": "Tìm hiểu Kudos",
} as Dictionary;

describe("HeroBanner", () => {
  it("renders ROOT FURTHER image", () => {
    render(<HeroBanner dictionary={mockDictionary} />);
    expect(screen.getByAltText("ROOT FURTHER - Sun Annual Awards 2025")).toBeInTheDocument();
  });

  it("renders countdown section", () => {
    render(<HeroBanner dictionary={mockDictionary} />);
    expect(screen.getByText("NGÀY")).toBeInTheDocument();
    expect(screen.getByText("GIỜ")).toBeInTheDocument();
    expect(screen.getByText("PHÚT")).toBeInTheDocument();
  });

  it("renders event info", () => {
    render(<HeroBanner dictionary={mockDictionary} />);
    expect(screen.getByText("26/12/2025")).toBeInTheDocument();
    expect(screen.getByText("Âu Cơ Art Center")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HeroBanner dictionary={mockDictionary} />);
    expect(screen.getByText("Tìm hiểu giải thưởng")).toBeInTheDocument();
    expect(screen.getByText("Tìm hiểu Kudos")).toBeInTheDocument();
  });
});
