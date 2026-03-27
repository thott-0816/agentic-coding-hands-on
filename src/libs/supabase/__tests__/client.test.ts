import { describe, it, expect, vi } from "vitest";

const mockCreateBrowserClient = vi.fn().mockReturnValue({ auth: {} });
vi.mock("@supabase/ssr", () => ({
  createBrowserClient: mockCreateBrowserClient,
}));

describe("supabase client", () => {
  it("creates browser client with env variables", async () => {
    const { createClient } = await import("../client");
    const client = createClient();
    expect(mockCreateBrowserClient).toHaveBeenCalled();
    expect(client).toBeDefined();
  });
});
