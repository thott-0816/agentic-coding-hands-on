import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AwardsSidebar } from "../awards-sidebar";
import type { AwardCategory } from "@/data/awards";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

const mockAwards: AwardCategory[] = [
  { name: "Top Talent", slug: "top-talent", description: "", imagePath: "" },
  { name: "Top Project", slug: "top-project", description: "", imagePath: "" },
  { name: "MVP", slug: "mvp", description: "", imagePath: "" },
];

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  mockObserve.mockReset();
  mockDisconnect.mockReset();
  vi.stubGlobal("IntersectionObserver", class {
    observe = mockObserve;
    disconnect = mockDisconnect;
    unobserve = vi.fn();
    constructor(_cb: unknown, _opts?: unknown) {}
  });
});

describe("AwardsSidebar", () => {
  it("renders all award names as buttons", () => {
    render(<AwardsSidebar awards={mockAwards} />);
    expect(screen.getByText("Top Talent")).toBeInTheDocument();
    expect(screen.getByText("Top Project")).toBeInTheDocument();
    expect(screen.getByText("MVP")).toBeInTheDocument();
  });

  it("renders navigation landmark", () => {
    render(<AwardsSidebar awards={mockAwards} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Award categories");
  });

  it("first item is active by default", () => {
    render(<AwardsSidebar awards={mockAwards} />);
    const firstButton = screen.getByText("Top Talent").closest("button");
    expect(firstButton).toHaveAttribute("aria-current", "true");
  });

  it("other items are not active by default", () => {
    render(<AwardsSidebar awards={mockAwards} />);
    const secondButton = screen.getByText("Top Project").closest("button");
    expect(secondButton).not.toHaveAttribute("aria-current");
  });

  it("calls scrollIntoView on click", () => {
    // Create target element in DOM
    const targetEl = document.createElement("div");
    targetEl.id = "top-project";
    targetEl.scrollIntoView = vi.fn();
    document.body.appendChild(targetEl);

    render(<AwardsSidebar awards={mockAwards} />);
    fireEvent.click(screen.getByText("Top Project"));

    expect(targetEl.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });

    document.body.removeChild(targetEl);
  });

  it("sets up IntersectionObserver for each award", () => {
    // Create target elements in DOM
    const elements = mockAwards.map((award) => {
      const el = document.createElement("div");
      el.id = award.slug;
      document.body.appendChild(el);
      return el;
    });

    render(<AwardsSidebar awards={mockAwards} />);
    expect(mockObserve).toHaveBeenCalledTimes(3);

    elements.forEach((el) => document.body.removeChild(el));
  });

  it("is hidden below xl breakpoint", () => {
    render(<AwardsSidebar awards={mockAwards} />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("hidden");
    expect(nav.className).toContain("xl:block");
  });
});
