import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocale } from "@/hooks/use-locale";

describe("useLocale", () => {
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  it("returns 'vi' as default locale when no cookie", () => {
    const { result } = renderHook(() => useLocale());
    expect(result.current.locale).toBe("vi");
  });

  it("returns 'en' when lang cookie is 'en'", () => {
    document.cookie = "lang=en";
    const { result } = renderHook(() => useLocale());
    expect(result.current.locale).toBe("en");
  });

  it("setLocale sets cookie and reloads page", () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });

    const { result } = renderHook(() => useLocale());
    act(() => {
      result.current.setLocale("en");
    });

    expect(document.cookie).toContain("lang=en");
    expect(reloadMock).toHaveBeenCalled();
  });
});
