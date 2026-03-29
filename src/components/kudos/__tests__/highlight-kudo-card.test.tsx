import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HighlightKudoCard } from "../highlight-kudo-card";
import type { Kudo } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

const mockKudo: Kudo = {
  id: "1",
  author_id: "u1",
  recipient_id: "u2",
  content: "Cảm ơn em bình thường nhưng phi thường",
  hashtags: ["#Dedicated", "#Inspring"],
  images: [],
  hearts_count: 1000,
  created_at: "2025-10-30T10:00:00Z",
  updated_at: "2025-10-30T10:00:00Z",
  author: { id: "u1", name: "Alice", email: "", avatar_url: "/av1.png", department: "CEVC1" },
  recipient: { id: "u2", name: "Bob", email: "", avatar_url: "/av2.png", department: "CEVC2" },
};

const mockDictionary = {
  "kudos.card.copyLink": "Copy Link",
  "kudos.card.viewDetail": "Xem chi tiết",
  "kudos.card.copiedToast": "Đã copy!",
} as Dictionary;

describe("HighlightKudoCard", () => {
  it("renders sender and recipient names", () => {
    render(<HighlightKudoCard kudo={mockKudo} dictionary={mockDictionary} bgColor="#FFF8E1" />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("renders content truncated to 3 lines", () => {
    render(<HighlightKudoCard kudo={mockKudo} dictionary={mockDictionary} bgColor="#FFF8E1" />);
    const content = screen.getByText(/Cảm ơn em/);
    expect(content.className).toContain("line-clamp-3");
  });

  it("renders hashtags", () => {
    render(<HighlightKudoCard kudo={mockKudo} dictionary={mockDictionary} bgColor="#FFF8E1" />);
    expect(screen.getByText("#Dedicated")).toBeInTheDocument();
  });

  it("renders heart count", () => {
    render(<HighlightKudoCard kudo={mockKudo} dictionary={mockDictionary} bgColor="#FFF8E1" />);
    expect(screen.getByText(/1[,.]?000/)).toBeInTheDocument();
  });

  it("applies correct Figma styles", () => {
    const { container } = render(<HighlightKudoCard kudo={mockKudo} dictionary={mockDictionary} bgColor="#FFF8E1" />);
    const card = container.firstChild as HTMLElement;
    expect(card.style.backgroundColor).toBe("rgb(255, 248, 225)");
    expect(card.className).toContain("border-[#FFEA9E]");
    expect(card.className).toContain("rounded-2xl");
  });
});
