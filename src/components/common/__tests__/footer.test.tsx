import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "../footer";
import type { Dictionary } from "@/types/i18n";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const mockDictionary = {
  "common.footer.copyright": "© 2025 Sun* Inc.",
} as Dictionary;

describe("Footer", () => {
  describe("simple variant", () => {
    it("renders copyright text", () => {
      render(<Footer dictionary={mockDictionary} variant="simple" />);
      expect(screen.getByText("© 2025 Sun* Inc.")).toBeInTheDocument();
    });

    it("does not render nav links", () => {
      render(<Footer dictionary={mockDictionary} variant="simple" />);
      expect(screen.queryByText("About SAA 2025")).not.toBeInTheDocument();
    });

    it("does not render logo", () => {
      render(<Footer dictionary={mockDictionary} variant="simple" />);
      expect(screen.queryByAltText("Sun Annual Awards 2025")).not.toBeInTheDocument();
    });
  });

  describe("full variant", () => {
    it("renders logo", () => {
      render(<Footer dictionary={mockDictionary} variant="full" />);
      expect(screen.getByAltText("Sun Annual Awards 2025")).toBeInTheDocument();
    });

    it("renders all footer nav links", () => {
      render(<Footer dictionary={mockDictionary} variant="full" />);
      expect(screen.getByText("About SAA 2025")).toBeInTheDocument();
      expect(screen.getByText("Award Information")).toBeInTheDocument();
      expect(screen.getByText("Sun* Kudos")).toBeInTheDocument();
    });

    it("renders copyright", () => {
      render(<Footer dictionary={mockDictionary} variant="full" />);
      expect(screen.getByText("© 2025 Sun* Inc.")).toBeInTheDocument();
    });

    it("highlights active link", () => {
      render(<Footer dictionary={mockDictionary} variant="full" activeLink="/awards" />);
      const link = screen.getByText("Award Information").closest("a");
      expect(link).toHaveAttribute("aria-current", "page");
    });
  });
});
