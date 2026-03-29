import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeartButton } from "../heart-button";

describe("HeartButton", () => {
  it("renders heart count", () => {
    render(<HeartButton count={42} isLiked={false} onToggle={() => {}} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders inactive state when not liked", () => {
    const { container } = render(<HeartButton count={10} isLiked={false} onToggle={() => {}} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "none");
  });

  it("renders active state when liked", () => {
    const { container } = render(<HeartButton count={10} isLiked={true} onToggle={() => {}} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "var(--color-heart-active)");
  });

  it("calls onToggle when clicked", () => {
    const onToggle = vi.fn();
    render(<HeartButton count={10} isLiked={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it("has aria-pressed attribute", () => {
    render(<HeartButton count={10} isLiked={true} onToggle={() => {}} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
