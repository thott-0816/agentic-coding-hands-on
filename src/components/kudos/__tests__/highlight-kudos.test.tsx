import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HighlightKudos } from "../highlight-kudos";
import type { Kudo } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

const makeKudo = (id: number, heartsCount: number): Kudo => ({
  id: `k${id}`,
  author_id: "u1",
  recipient_id: "u2",
  content: `Content ${id}`,
  hashtags: ["#Toàn diện"],
  images: [],
  hearts_count: heartsCount,
  created_at: "2025-10-30T10:00:00Z",
  updated_at: "2025-10-30T10:00:00Z",
  author: { id: "u1", name: `Author ${id}`, email: "", avatar_url: "", department: "CTO" },
  recipient: { id: "u2", name: `Recipient ${id}`, email: "", avatar_url: "", department: "SPD" },
});

const mockDictionary = {
  "kudos.highlight.subtitle": "Sun* Annual Awards 2025",
  "kudos.highlight.title": "HIGHLIGHT KUDOS",
  "kudos.highlight.filterHashtag": "Hashtag",
  "kudos.highlight.filterDepartment": "Phòng ban",
  "kudos.card.copyLink": "Copy Link",
  "kudos.card.viewDetail": "Xem chi tiết",
  "kudos.card.copiedToast": "Đã copy!",
  "kudos.filterEmpty": "Không có kết quả",
} as Dictionary;

describe("HighlightKudos", () => {
  it("limits carousel to maximum 5 cards even with more data", () => {
    const kudos = Array.from({ length: 10 }, (_, i) => makeKudo(i + 1, 1000 - i * 100));
    render(<HighlightKudos kudos={kudos} dictionary={mockDictionary} />);

    // Pagination should show /5 (not /10)
    expect(screen.getByText("/5")).toBeInTheDocument();
  });

  it("shows all cards when data has 5 or fewer items", () => {
    const kudos = Array.from({ length: 3 }, (_, i) => makeKudo(i + 1, 500 - i * 100));
    render(<HighlightKudos kudos={kudos} dictionary={mockDictionary} />);

    expect(screen.getByText("/3")).toBeInTheDocument();
  });

  it("selects top 5 by hearts_count descending", () => {
    const kudos = Array.from({ length: 8 }, (_, i) => makeKudo(i + 1, (i + 1) * 100));
    render(<HighlightKudos kudos={kudos} dictionary={mockDictionary} />);

    // Should show top 5 by hearts: k8(800), k7(700), k6(600), k5(500), k4(400)
    // Pagination shows 5
    expect(screen.getByText("/5")).toBeInTheDocument();

    // The card with highest hearts (Author 8) should be visible
    expect(screen.getAllByText("Author 8").length).toBeGreaterThan(0);
  });

  it("shows empty state when no kudos match filter", () => {
    render(<HighlightKudos kudos={[]} dictionary={mockDictionary} />);
    expect(screen.getByText("Không có kết quả")).toBeInTheDocument();
  });
});
