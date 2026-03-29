import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeader } from "../section-header";

describe("SectionHeader", () => {
  it("renders hr divider", () => {
    const { container } = render(<SectionHeader title="HIGHLIGHT KUDOS" />);
    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
    expect(hr?.className).toContain("bg-[#2E3940]");
  });

  it("renders title text", () => {
    render(<SectionHeader title="HIGHLIGHT KUDOS" />);
    expect(screen.getByText("HIGHLIGHT KUDOS")).toBeInTheDocument();
  });

  it("title uses gold color", () => {
    render(<SectionHeader title="Title" />);
    const title = screen.getByText("Title");
    expect(title.className).toContain("text-[var(--color-text-gold)]");
  });

  it("renders children when provided", () => {
    render(
      <SectionHeader title="Title">
        <button>Filter</button>
      </SectionHeader>
    );
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });
});
