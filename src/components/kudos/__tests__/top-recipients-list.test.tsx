import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TopRecipientsList } from "../top-recipients-list";
import type { Dictionary } from "@/types/i18n";

const mockRecipients = [
  { id: "1", name: "Huỳnh Dương Xuân", avatar_url: "/av1.png", info: "Nhận được 1 sổ phong SAA" },
  { id: "2", name: "Nguyễn Văn A", avatar_url: "/av2.png", info: "Nhận được 1 sổ phong SAA" },
];

const mockDictionary = {
  "kudos.sidebar.topRecipients": "10 SUNNER NHẬN QUÀ MỚI NHẤT",
} as Dictionary;

describe("TopRecipientsList", () => {
  it("renders title centered", () => {
    render(<TopRecipientsList recipients={mockRecipients} dictionary={mockDictionary} />);
    const title = screen.getByText("10 SUNNER NHẬN QUÀ MỚI NHẤT");
    expect(title).toBeInTheDocument();
    expect(title.className).toContain("text-center");
  });

  it("renders all recipient names in gold", () => {
    render(<TopRecipientsList recipients={mockRecipients} dictionary={mockDictionary} />);
    expect(screen.getByText("Huỳnh Dương Xuân")).toBeInTheDocument();
    expect(screen.getByText("Nguyễn Văn A")).toBeInTheDocument();
  });

  it("renders avatar initials instead of images", () => {
    render(<TopRecipientsList recipients={mockRecipients} dictionary={mockDictionary} />);
    // Last initial: "Huỳnh Dương Xuân" → "X", "Nguyễn Văn A" → "A"
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders fixed info text for all recipients", () => {
    render(<TopRecipientsList recipients={mockRecipients} dictionary={mockDictionary} />);
    const infoTexts = screen.getAllByText("Nhận được 1 áo phông SAA");
    expect(infoTexts).toHaveLength(2);
  });

  it("has gold border container", () => {
    const { container } = render(<TopRecipientsList recipients={mockRecipients} dictionary={mockDictionary} />);
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("border");
    expect(wrapper?.className).toContain("border-[var(--color-card-border)]");
  });
});
