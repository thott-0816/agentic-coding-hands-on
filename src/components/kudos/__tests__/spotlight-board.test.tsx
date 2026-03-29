import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SpotlightBoard } from "../spotlight-board";
import type { SpotlightData } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

const mockData: SpotlightData = {
  total_kudos: 388,
  entries: [
    { user_id: "u1", name: "Nguyễn Hoàng Long", kudos_count: 15 },
    { user_id: "u2", name: "Trần Văn A", kudos_count: 10 },
    { user_id: "u3", name: "Lê Thị B", kudos_count: 8 },
  ],
};

const mockDictionary = {
  "kudos.spotlight.searchPlaceholder": "Tìm kiếm",
} as Dictionary;

describe("SpotlightBoard", () => {
  it("renders total kudos count", () => {
    render(<SpotlightBoard data={mockData} dictionary={mockDictionary} />);
    expect(screen.getByText("388 KUDOS")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<SpotlightBoard data={mockData} dictionary={mockDictionary} />);
    expect(screen.getByPlaceholderText("Tìm kiếm")).toBeInTheDocument();
  });

  it("renders entry names", () => {
    render(<SpotlightBoard data={mockData} dictionary={mockDictionary} />);
    expect(screen.getByText("Nguyễn Hoàng Long")).toBeInTheDocument();
    expect(screen.getByText("Trần Văn A")).toBeInTheDocument();
  });

  it("search input has maxLength 100", () => {
    render(<SpotlightBoard data={mockData} dictionary={mockDictionary} />);
    const input = screen.getByPlaceholderText("Tìm kiếm");
    expect(input).toHaveAttribute("maxLength", "100");
  });
});
