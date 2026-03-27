import { describe, it, expect, vi } from "vitest";

const mockSignOut = vi.fn();
vi.mock("@/libs/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: { signOut: mockSignOut },
  }),
}));

const mockRedirect = vi.fn();
vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

describe("auth actions", () => {
  it("logout calls signOut and redirects to /login", async () => {
    // Dynamic import after mocks are set up
    const { logout } = await import("../auth");
    await logout();
    expect(mockSignOut).toHaveBeenCalled();
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });
});
