import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RootFurtherContent } from "../root-further-content";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

const mockDictionary = {
  "homepage.content.p1": "Đoạn văn 1",
  "homepage.content.p2": "Đoạn văn 2",
  "homepage.content.p3": "Đoạn văn 3",
  "homepage.content.quote": "Câu trích dẫn",
  "homepage.content.quoteSource": "Nguồn trích dẫn",
  "homepage.content.p4": "Đoạn văn 4",
  "homepage.content.p5": "Đoạn văn 5",
} as Dictionary;

describe("RootFurtherContent", () => {
  it("renders all content paragraphs", () => {
    render(<RootFurtherContent dictionary={mockDictionary} />);
    expect(screen.getByText("Đoạn văn 1")).toBeInTheDocument();
    expect(screen.getByText("Đoạn văn 2")).toBeInTheDocument();
    expect(screen.getByText("Đoạn văn 3")).toBeInTheDocument();
    expect(screen.getByText("Đoạn văn 4")).toBeInTheDocument();
    expect(screen.getByText("Đoạn văn 5")).toBeInTheDocument();
  });

  it("renders quote and source", () => {
    render(<RootFurtherContent dictionary={mockDictionary} />);
    // Quote and source are in the same <p> separated by <br/>, so use a function matcher
    const quoteEl = screen.getByText((_content, element) => {
      return element?.tagName === "P" && !!element.textContent?.includes("Câu trích dẫn") && !!element.textContent?.includes("Nguồn trích dẫn");
    });
    expect(quoteEl).toBeInTheDocument();
  });

  it("renders ROOT and FURTHER images", () => {
    render(<RootFurtherContent dictionary={mockDictionary} />);
    expect(screen.getByAltText("ROOT")).toBeInTheDocument();
    expect(screen.getByAltText("FURTHER")).toBeInTheDocument();
  });
});
