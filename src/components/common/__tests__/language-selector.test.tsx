import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LanguageSelector } from "../language-selector";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock("@/components/common/icons/chevron-down-icon", () => ({
  ChevronDownIcon: ({ open }: { open?: boolean }) => (
    <span data-testid="chevron" data-open={open} />
  ),
}));

const mockDictionary = {
  "common.header.language.vi": "VN",
  "common.header.language.en": "EN",
  "common.header.language.ariaLabel": "Chọn ngôn ngữ",
} as Dictionary;

describe("LanguageSelector", () => {
  it("renders current locale label", () => {
    render(<LanguageSelector dictionary={mockDictionary} initialLocale="vi" />);
    expect(screen.getByText("VN")).toBeInTheDocument();
  });

  it("has correct aria attributes on trigger", () => {
    render(<LanguageSelector dictionary={mockDictionary} initialLocale="vi" />);
    const trigger = screen.getByRole("button", { name: "Chọn ngôn ngữ" });
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens dropdown on click", () => {
    render(<LanguageSelector dictionary={mockDictionary} initialLocale="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Chọn ngôn ngữ" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("shows both language options when open", () => {
    render(<LanguageSelector dictionary={mockDictionary} initialLocale="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Chọn ngôn ngữ" }));
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
  });

  it("marks current locale as selected", () => {
    render(<LanguageSelector dictionary={mockDictionary} initialLocale="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Chọn ngôn ngữ" }));
    const viOption = screen.getAllByRole("option")[0];
    expect(viOption).toHaveAttribute("aria-selected", "true");
  });

  it("closes on Escape key", () => {
    render(<LanguageSelector dictionary={mockDictionary} initialLocale="vi" />);
    fireEvent.click(screen.getByRole("button", { name: "Chọn ngôn ngữ" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("listbox").parentElement!, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
