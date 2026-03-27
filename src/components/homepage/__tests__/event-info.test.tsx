import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EventInfo } from "../event-info";
import type { Dictionary } from "@/types/i18n";

const mockDictionary = {
  "homepage.event.time": "Thời gian",
  "homepage.event.venue": "Địa điểm",
  "homepage.event.livestream": "Phát trực tiếp trên kênh YouTube Sun*",
} as Dictionary;

describe("EventInfo", () => {
  it("renders time label and date", () => {
    render(<EventInfo dictionary={mockDictionary} />);
    expect(screen.getByText(/Thời gian/)).toBeInTheDocument();
    expect(screen.getByText("26/12/2025")).toBeInTheDocument();
  });

  it("renders venue label and location", () => {
    render(<EventInfo dictionary={mockDictionary} />);
    expect(screen.getByText(/Địa điểm/)).toBeInTheDocument();
    expect(screen.getByText("Âu Cơ Art Center")).toBeInTheDocument();
  });

  it("renders livestream info", () => {
    render(<EventInfo dictionary={mockDictionary} />);
    expect(screen.getByText("Phát trực tiếp trên kênh YouTube Sun*")).toBeInTheDocument();
  });
});
