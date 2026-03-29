import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SunnerSearch } from "../sunner-search";
import type { KudoUser } from "@/types/kudos";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const mockUsers: KudoUser[] = [
  { id: "u1", name: "Nguyễn Hoàng Long", email: "", avatar_url: "", department: "CTO" },
  { id: "u2", name: "Trần Thị Minh Anh", email: "", avatar_url: "", department: "CEVC1" },
  { id: "u3", name: "Phạm Minh Đức", email: "", avatar_url: "", department: "SPD" },
];

describe("SunnerSearch", () => {
  it("renders search input with placeholder", () => {
    render(<SunnerSearch users={mockUsers} placeholder="Tìm kiếm profile Sunner" />);
    expect(screen.getByPlaceholderText("Tìm kiếm profile Sunner")).toBeInTheDocument();
  });

  it("shows suggestions when typing matching text", () => {
    render(<SunnerSearch users={mockUsers} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Nguyễn" } });
    expect(screen.getByText("Nguyễn Hoàng Long")).toBeInTheDocument();
    expect(screen.getByText("CTO")).toBeInTheDocument();
  });

  it("filters suggestions based on query", () => {
    render(<SunnerSearch users={mockUsers} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Minh" } });
    expect(screen.getByText("Trần Thị Minh Anh")).toBeInTheDocument();
    expect(screen.getByText("Phạm Minh Đức")).toBeInTheDocument();
    expect(screen.queryByText("Nguyễn Hoàng Long")).not.toBeInTheDocument();
  });

  it("shows no suggestions when query is empty", () => {
    render(<SunnerSearch users={mockUsers} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "" } });
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("links to user profile page", () => {
    render(<SunnerSearch users={mockUsers} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Long" } });
    const link = screen.getByText("Nguyễn Hoàng Long").closest("a");
    expect(link).toHaveAttribute("href", "/profile/u1");
  });

  it("renders avatar initials for each suggestion", () => {
    render(<SunnerSearch users={mockUsers} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Nguyễn" } });
    expect(screen.getByText("L")).toBeInTheDocument();
  });

  it("closes suggestions on Escape", () => {
    render(<SunnerSearch users={mockUsers} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Nguyễn" } });
    expect(screen.getByText("Nguyễn Hoàng Long")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("CTO")).not.toBeInTheDocument();
  });
});
