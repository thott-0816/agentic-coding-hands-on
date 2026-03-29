import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { KudosCarousel } from "../kudos-carousel";
import type { Kudo } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

const makeKudo = (id: string, name: string): Kudo => ({
  id,
  author_id: "u1",
  recipient_id: "u2",
  content: `Content for ${name}`,
  hashtags: ["#Test"],
  images: [],
  hearts_count: 100,
  created_at: "2025-10-30T10:00:00Z",
  updated_at: "2025-10-30T10:00:00Z",
  author: { id: "u1", name, email: "", avatar_url: "", department: "Dept" },
  recipient: { id: "u2", name: "Recipient", email: "", avatar_url: "", department: "Dept" },
});

const mockKudos = [
  makeKudo("1", "Alice"),
  makeKudo("2", "Bob"),
  makeKudo("3", "Charlie"),
  makeKudo("4", "Dave"),
  makeKudo("5", "Eve"),
];

const mockDictionary = {
  "kudos.card.copyLink": "Copy Link",
  "kudos.card.viewDetail": "Xem chi tiết",
  "kudos.card.copiedToast": "Đã copy!",
} as Dictionary;

describe("KudosCarousel", () => {
  it("renders carousel region", () => {
    render(<KudosCarousel kudos={mockKudos} dictionary={mockDictionary} />);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it("renders pagination with current slide number", () => {
    render(<KudosCarousel kudos={mockKudos} dictionary={mockDictionary} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("/5")).toBeInTheDocument();
  });

  it("renders prev and next buttons", () => {
    render(<KudosCarousel kudos={mockKudos} dictionary={mockDictionary} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("navigates to next slide on next click", () => {
    render(<KudosCarousel kudos={mockKudos} dictionary={mockDictionary} />);
    const nextBtn = screen.getByLabelText("Next slide");
    fireEvent.click(nextBtn);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("prev button wraps to last slide from first", () => {
    render(<KudosCarousel kudos={mockKudos} dictionary={mockDictionary} />);
    const prevBtn = screen.getByLabelText("Previous slide");
    fireEvent.click(prevBtn);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
