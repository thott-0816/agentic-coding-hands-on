import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterDropdown } from "../filter-dropdown";

const items = [
  { id: "1", label: "#Dedicated" },
  { id: "2", label: "#Inspring" },
  { id: "3", label: "#Aim High" },
];

describe("FilterDropdown", () => {
  it("renders all items", () => {
    render(<FilterDropdown items={items} selectedId={null} onSelect={() => {}} />);
    expect(screen.getByText("#Dedicated")).toBeInTheDocument();
    expect(screen.getByText("#Inspring")).toBeInTheDocument();
    expect(screen.getByText("#Aim High")).toBeInTheDocument();
  });

  it("marks selected item with aria-selected", () => {
    render(<FilterDropdown items={items} selectedId="1" onSelect={() => {}} />);
    const selected = screen.getByText("#Dedicated").closest("button");
    expect(selected).toHaveAttribute("aria-selected", "true");
  });

  it("calls onSelect when item clicked", () => {
    const onSelect = vi.fn();
    render(<FilterDropdown items={items} selectedId={null} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("#Inspring"));
    expect(onSelect).toHaveBeenCalledWith("2");
  });

  it("has listbox role", () => {
    render(<FilterDropdown items={items} selectedId={null} onSelect={() => {}} />);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("items have option role", () => {
    render(<FilterDropdown items={items} selectedId={null} onSelect={() => {}} />);
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
  });

  it("selected item has glow text-shadow style", () => {
    render(<FilterDropdown items={items} selectedId="1" onSelect={() => {}} />);
    const selected = screen.getByText("#Dedicated").closest("button");
    expect(selected?.className).toContain("bg-[rgba(255,234,158,0.1)]");
  });
});
