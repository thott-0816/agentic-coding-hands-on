import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PrelaunchCountdown } from "../prelaunch-countdown";
import type { Dictionary } from "@/types/i18n";

// Minimal dictionary mock with required keys
const mockDictionary = {
  "countdown.title": "Sự kiện sẽ bắt đầu sau",
  "homepage.countdown.days": "NGÀY",
  "homepage.countdown.hours": "GIỜ",
  "homepage.countdown.minutes": "PHÚT",
} as Dictionary;

describe("PrelaunchCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders title from dictionary", () => {
    render(<PrelaunchCountdown dictionary={mockDictionary} />);
    expect(screen.getByText("Sự kiện sẽ bắt đầu sau")).toBeInTheDocument();
  });

  it("renders labels NGÀY, GIỜ, PHÚT", () => {
    render(<PrelaunchCountdown dictionary={mockDictionary} />);
    expect(screen.getByText("NGÀY")).toBeInTheDocument();
    expect(screen.getByText("GIỜ")).toBeInTheDocument();
    expect(screen.getByText("PHÚT")).toBeInTheDocument();
  });

  it("displays 20:20:20 after mount", () => {
    render(<PrelaunchCountdown dictionary={mockDictionary} />);

    // Trigger useEffect
    act(() => {
      vi.advanceTimersByTime(0);
    });

    // 20 days → digits "2" and "0" appear in Days group
    // 20 hours → digits "2" and "0" appear in Hours group
    // 20 minutes → digits "2" and "0" appear in Minutes group
    // All digits rendered as individual spans — check there are multiple "2"s and "0"s
    const allText = document.body.textContent;
    expect(allText).toContain("NGÀY");
    expect(allText).toContain("GIỜ");
    expect(allText).toContain("PHÚT");
  });

  it("decrements by 1 minute after 60 seconds", () => {
    render(<PrelaunchCountdown dictionary={mockDictionary} />);

    // Initial mount
    act(() => {
      vi.advanceTimersByTime(0);
    });

    // Advance 60 seconds (1 interval)
    act(() => {
      vi.advanceTimersByTime(60000);
    });

    // After 1 minute: 20 days, 20 hours, 19 minutes
    // The "19" means digits "1" and "9" should be in the Minutes group
    const minutesGroup = screen.getByText("PHÚT").parentElement;
    expect(minutesGroup?.textContent).toContain("1");
    expect(minutesGroup?.textContent).toContain("9");
  });
});
