import { describe, it, expect } from "vitest";
import { departments } from "../departments";

describe("departments data", () => {
  it("contains at least 40 departments", () => {
    expect(departments.length).toBeGreaterThanOrEqual(40);
  });

  it("each department has id and name", () => {
    departments.forEach((dept) => {
      expect(dept.id).toBeTruthy();
      expect(dept.name).toBeTruthy();
    });
  });

  it("all ids are unique", () => {
    const ids = departments.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("contains expected departments", () => {
    const names = departments.map((d) => d.name);
    expect(names).toContain("CTO");
    expect(names).toContain("CEVC1");
    expect(names).toContain("CEVC2");
    expect(names).toContain("SPD");
  });
});
