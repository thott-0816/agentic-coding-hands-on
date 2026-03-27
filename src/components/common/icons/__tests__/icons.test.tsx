import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ArrowRightIcon } from "../arrow-right-icon";
import { BellIcon } from "../bell-icon";
import { ChevronDownIcon } from "../chevron-down-icon";
import { GoogleIcon } from "../google-icon";
import { PencilIcon } from "../pencil-icon";
import { UserIcon } from "../user-icon";

describe("Icon components", () => {
  it("ArrowRightIcon renders SVG with aria-hidden", () => {
    const { container } = render(<ArrowRightIcon className="test" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("test");
  });

  it("BellIcon renders SVG with aria-hidden", () => {
    const { container } = render(<BellIcon className="test" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("ChevronDownIcon renders SVG and rotates when open", () => {
    const { container, rerender } = render(<ChevronDownIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveClass("rotate-180");

    rerender(<ChevronDownIcon open />);
    expect(container.querySelector("svg")).toHaveClass("rotate-180");
  });

  it("GoogleIcon renders SVG with aria-hidden", () => {
    const { container } = render(<GoogleIcon className="test" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("PencilIcon renders SVG with aria-hidden", () => {
    const { container } = render(<PencilIcon className="test" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("UserIcon renders SVG with aria-hidden", () => {
    const { container } = render(<UserIcon className="test" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
