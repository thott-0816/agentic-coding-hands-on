import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CountdownTimer } from "../countdown-timer";
import type { Dictionary } from "@/types/i18n";

const mockDictionary = {
  "homepage.hero.comingSoon": "Sự kiện sẽ bắt đầu sau",
  "homepage.countdown.days": "NGÀY",
  "homepage.countdown.hours": "GIỜ",
  "homepage.countdown.minutes": "PHÚT",
} as Dictionary;

describe("CountdownTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders coming soon text", () => {
    render(<CountdownTimer dictionary={mockDictionary} />);
    expect(screen.getByText("Sự kiện sẽ bắt đầu sau")).toBeInTheDocument();
  });

  it("renders countdown labels", () => {
    render(<CountdownTimer dictionary={mockDictionary} />);
    expect(screen.getByText("NGÀY")).toBeInTheDocument();
    expect(screen.getByText("GIỜ")).toBeInTheDocument();
    expect(screen.getByText("PHÚT")).toBeInTheDocument();
  });

  it("displays initial countdown 20:20:20 after mount", () => {
    render(<CountdownTimer dictionary={mockDictionary} />);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    const body = document.body.textContent;
    expect(body).toContain("20");
    expect(body).toContain("NGÀY");
    expect(body).toContain("GIỜ");
    expect(body).toContain("PHÚT");
  });

  it("decrements by 1 minute after 60 seconds", () => {
    render(<CountdownTimer dictionary={mockDictionary} />);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    act(() => {
      vi.advanceTimersByTime(60000);
    });
    const minutesGroup = screen.getByText("PHÚT").parentElement;
    expect(minutesGroup?.textContent).toContain("1");
    expect(minutesGroup?.textContent).toContain("9");
  });

  it("has aria-live polite for accessibility", () => {
    const { container } = render(<CountdownTimer dictionary={mockDictionary} />);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });
});
