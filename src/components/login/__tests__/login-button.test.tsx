import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginButton } from "../login-button";
import type { Dictionary } from "@/types/i18n";

const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

const mockSignInWithOAuth = vi.fn();
vi.mock("@/libs/supabase/client", () => ({
  createClient: () => ({
    auth: { signInWithOAuth: mockSignInWithOAuth },
  }),
}));

vi.mock("@/components/common/icons/google-icon", () => ({
  GoogleIcon: () => <span data-testid="google-icon" />,
}));

vi.mock("@/components/common/toast", () => ({
  Toast: ({ message, onDismiss }: { message: string; onDismiss?: () => void }) => (
    <div data-testid="toast" onClick={onDismiss}>{message}</div>
  ),
}));

const mockDictionary = {
  "login.button.loginWithGoogle": "Login with Google",
  "login.button.ariaLabel": "Login",
  "login.button.loading": "Loading...",
  "login.error.cancelled": "Cancelled",
  "login.error.failed": "Login failed",
  "login.error.network": "Network error",
  "login.error.unauthorized": "Unauthorized",
  "login.error.serviceUnavailable": "Service unavailable",
} as Dictionary;

describe("LoginButton", () => {
  beforeEach(() => {
    mockSignInWithOAuth.mockReset();
    mockReplace.mockReset();
  });

  it("renders login text and Google icon", () => {
    render(<LoginButton dictionary={mockDictionary} />);
    expect(screen.getByText("Login with Google")).toBeInTheDocument();
    expect(screen.getByTestId("google-icon")).toBeInTheDocument();
  });

  it("has correct aria attributes", () => {
    render(<LoginButton dictionary={mockDictionary} />);
    const btn = screen.getByRole("button", { name: "Login" });
    expect(btn).toHaveAttribute("aria-busy", "false");
    expect(btn).toHaveAttribute("aria-disabled", "false");
  });

  it("shows loading state on click", async () => {
    mockSignInWithOAuth.mockResolvedValue({ error: null });
    render(<LoginButton dictionary={mockDictionary} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Login" }));
    });
    // After click, button shows loading text
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error toast on auth failure", async () => {
    mockSignInWithOAuth.mockResolvedValue({ error: new Error("fail") });
    render(<LoginButton dictionary={mockDictionary} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Login" }));
    });
    expect(screen.getByTestId("toast")).toHaveTextContent("Login failed");
  });

  it("shows error toast on network error", async () => {
    mockSignInWithOAuth.mockRejectedValue(new Error("network"));
    render(<LoginButton dictionary={mockDictionary} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Login" }));
    });
    expect(screen.getByTestId("toast")).toHaveTextContent("Network error");
  });

  it("shows initial error from URL param", () => {
    render(<LoginButton dictionary={mockDictionary} initialError="cancelled" />);
    expect(screen.getByTestId("toast")).toHaveTextContent("Cancelled");
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });
});
