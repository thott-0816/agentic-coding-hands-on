import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { KudosPostCard } from "../kudos-post-card";
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
  content: "Cảm ơn em bình thường nhưng phi thường :D",
  hashtags: ["#Dedicated", "#Inspring"],
  images: [],
  hearts_count: 1000,
  created_at: "2025-10-30T10:00:00Z",
  updated_at: "2025-10-30T10:00:00Z",
  author: { id: "u1", name: "Huỳnh Dương Xuân Nhật", email: "", avatar_url: "/avatar1.png", department: "CEVC1" },
  recipient: { id: "u2", name: "Huỳnh Dương Xuân", email: "", avatar_url: "/avatar2.png", department: "CEVC2" },
};

const mockDictionary = {
  "kudos.card.copyLink": "Copy Link",
  "kudos.card.copiedToast": "Đã copy!",
} as Dictionary;

describe("KudosPostCard", () => {
  it("renders sender name", () => {
    render(<KudosPostCard kudo={mockKudo} dictionary={mockDictionary} />);
    expect(screen.getByText("Huỳnh Dương Xuân Nhật")).toBeInTheDocument();
  });

  it("renders recipient name", () => {
    render(<KudosPostCard kudo={mockKudo} dictionary={mockDictionary} />);
    expect(screen.getByText("Huỳnh Dương Xuân")).toBeInTheDocument();
  });

  it("renders content in gold box", () => {
    render(<KudosPostCard kudo={mockKudo} dictionary={mockDictionary} />);
    expect(screen.getByText(/Cảm ơn em bình thường/)).toBeInTheDocument();
  });

  it("renders hashtags in red", () => {
    render(<KudosPostCard kudo={mockKudo} dictionary={mockDictionary} />);
    expect(screen.getByText("#Dedicated")).toBeInTheDocument();
    expect(screen.getByText("#Inspring")).toBeInTheDocument();
  });

  it("renders heart count", () => {
    render(<KudosPostCard kudo={mockKudo} dictionary={mockDictionary} />);
    expect(screen.getByText(/1[,.]?000/)).toBeInTheDocument();
  });

  it("renders as article element", () => {
    const { container } = render(<KudosPostCard kudo={mockKudo} dictionary={mockDictionary} />);
    expect(container.querySelector("article")).toBeInTheDocument();
  });

  it("renders sender and recipient avatars when avatar_url provided", () => {
    render(<KudosPostCard kudo={mockKudo} dictionary={mockDictionary} />);
    expect(screen.getByAltText("Huỳnh Dương Xuân Nhật")).toBeInTheDocument();
    expect(screen.getByAltText("Huỳnh Dương Xuân")).toBeInTheDocument();
  });

  it("renders initials when avatar_url is empty", () => {
    const kudoNoAvatar: Kudo = {
      ...mockKudo,
      author: { ...mockKudo.author, avatar_url: "" },
      recipient: { ...mockKudo.recipient, avatar_url: "" },
    };
    render(<KudosPostCard kudo={kudoNoAvatar} dictionary={mockDictionary} />);
    // Last name initial for "Huỳnh Dương Xuân Nhật" → "N", "Huỳnh Dương Xuân" → "X"
    expect(screen.getByText("N")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("renders department for sender and recipient", () => {
    render(<KudosPostCard kudo={mockKudo} dictionary={mockDictionary} />);
    expect(screen.getByText("CEVC1")).toBeInTheDocument();
    expect(screen.getByText("CEVC2")).toBeInTheDocument();
  });

  it("renders category when present", () => {
    const kudoWithCategory: Kudo = { ...mockKudo, category: "IDOL GIỚI TRẺ" };
    render(<KudosPostCard kudo={kudoWithCategory} dictionary={mockDictionary} />);
    expect(screen.getByText("IDOL GIỚI TRẺ")).toBeInTheDocument();
  });

  it("renders copy link button", () => {
    render(<KudosPostCard kudo={mockKudo} dictionary={mockDictionary} />);
    expect(screen.getByText("Copy Link")).toBeInTheDocument();
  });
});
