import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CopyLinkButton } from "../copy-link-button";
import type { Dictionary } from "@/types/i18n";

const mockDictionary = {
  "kudos.card.copyLink": "Copy Link",
  "kudos.card.copiedToast": "Đã copy link!",
} as Dictionary;

describe("CopyLinkButton", () => {
  it("renders copy link text", () => {
    render(<CopyLinkButton kudoId="123" dictionary={mockDictionary} />);
    expect(screen.getByText("Copy Link")).toBeInTheDocument();
  });

  it("copies URL to clipboard on click", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<CopyLinkButton kudoId="123" dictionary={mockDictionary} />);
    fireEvent.click(screen.getByRole("button"));
    expect(writeText).toHaveBeenCalled();
  });

  it("has aria-label", () => {
    render(<CopyLinkButton kudoId="123" dictionary={mockDictionary} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Copy Link");
  });
});
