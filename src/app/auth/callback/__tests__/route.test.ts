import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockExchangeCodeForSession = vi.fn();
const mockSignOut = vi.fn();

vi.mock("@/libs/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      exchangeCodeForSession: (...args: unknown[]) =>
        mockExchangeCodeForSession(...args),
      signOut: (...args: unknown[]) => mockSignOut(...args),
    },
  }),
}));

function createRequest(url: string): NextRequest {
  return new NextRequest(new URL(url, "http://localhost:3000"));
}

describe("GET /auth/callback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to /login?error=failed when no code param", async () => {
    const { GET } = await import("@/app/auth/callback/route");
    const request = createRequest("/auth/callback");
    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("/login?error=failed");
  });

  it("redirects to / when email is @sun-asterisk.com", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: {
        session: { user: { email: "user@sun-asterisk.com" } },
      },
      error: null,
    });

    const { GET } = await import("@/app/auth/callback/route");
    const request = createRequest("/auth/callback?code=valid-code");
    const response = await GET(request);

    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("valid-code");
    expect(response.status).toBe(307);
    expect(new URL(response.headers.get("location")!).pathname).toBe("/");
  });

  it("signs out and redirects with error=unauthorized for non-@sun-asterisk.com", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: {
        session: { user: { email: "user@gmail.com" } },
      },
      error: null,
    });

    const { GET } = await import("@/app/auth/callback/route");
    const request = createRequest("/auth/callback?code=valid-code");
    const response = await GET(request);

    expect(mockSignOut).toHaveBeenCalled();
    expect(response.headers.get("location")).toContain(
      "/login?error=unauthorized"
    );
  });

  it("redirects with error=failed when exchange fails", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: { session: null },
      error: new Error("Exchange failed"),
    });

    const { GET } = await import("@/app/auth/callback/route");
    const request = createRequest("/auth/callback?code=bad-code");
    const response = await GET(request);

    expect(response.headers.get("location")).toContain("/login?error=failed");
  });
});
