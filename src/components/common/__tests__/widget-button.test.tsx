import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { WidgetButton } from "../widget-button";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock("@/components/common/icons/pencil-icon", () => ({
  PencilIcon: ({ className }: { className?: string }) => (
    <span data-testid="pencil-icon" className={className} />
  ),
}));

const mockDictionary = {
  "common.header.quickActions": "Quick actions",
} as Dictionary;

describe("WidgetButton", () => {
  it("renders with correct aria-label", () => {
    render(<WidgetButton dictionary={mockDictionary} />);
    expect(screen.getByLabelText("Quick actions")).toBeInTheDocument();
  });

  it("renders pencil icon", () => {
    render(<WidgetButton dictionary={mockDictionary} />);
    expect(screen.getByTestId("pencil-icon")).toBeInTheDocument();
  });

  it("renders slash separator", () => {
    render(<WidgetButton dictionary={mockDictionary} />);
    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("is a button element", () => {
    render(<WidgetButton dictionary={mockDictionary} />);
    expect(screen.getByRole("button", { name: "Quick actions" })).toBeInTheDocument();
  });
});
