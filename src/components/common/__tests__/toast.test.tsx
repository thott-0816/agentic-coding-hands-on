import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Toast } from "../toast";

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders message", () => {
    render(<Toast message="Error occurred" />);
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });

  it("has alert role and aria-live assertive", () => {
    render(<Toast message="Error" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("aria-live", "assertive");
  });

  it("renders dismiss button", () => {
    render(<Toast message="Error" />);
    expect(screen.getByLabelText("Dismiss")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button clicked", () => {
    const onDismiss = vi.fn();
    render(<Toast message="Error" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("auto-dismisses after 5 seconds", () => {
    const onDismiss = vi.fn();
    render(<Toast message="Error" onDismiss={onDismiss} />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("renders nothing when message is null", () => {
    const { container } = render(<Toast message={null} />);
    expect(container.firstChild).toBeNull();
  });
});
