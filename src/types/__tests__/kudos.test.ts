import { describe, it, expect } from "vitest";
import type { Kudo, Heart, SecretBox, KudosStats, SpotlightData, Hashtag, Department } from "../kudos";

describe("kudos types", () => {
  it("Kudo type has all required fields", () => {
    const kudo: Kudo = {
      id: "1",
      author_id: "user-1",
      recipient_id: "user-2",
      content: "Great work!",
      hashtags: ["Dedicated"],
      images: [],
      hearts_count: 10,
      created_at: "2026-03-27T10:00:00Z",
      updated_at: "2026-03-27T10:00:00Z",
      author: { id: "user-1", name: "Alice", email: "a@sun.com", avatar_url: "", department: "CEVC1" },
      recipient: { id: "user-2", name: "Bob", email: "b@sun.com", avatar_url: "", department: "CEVC2" },
    };
    expect(kudo.id).toBe("1");
    expect(kudo.author_id).toBeTruthy();
    expect(kudo.recipient_id).toBeTruthy();
    expect(kudo.content).toBeTruthy();
    expect(kudo.hashtags).toHaveLength(1);
    expect(kudo.hearts_count).toBe(10);
  });

  it("Heart type has required fields", () => {
    const heart: Heart = {
      id: "h1",
      kudo_id: "1",
      user_id: "user-1",
    };
    expect(heart.id).toBeTruthy();
    expect(heart.kudo_id).toBeTruthy();
    expect(heart.user_id).toBeTruthy();
  });

  it("SecretBox type has required fields", () => {
    const box: SecretBox = {
      id: "sb1",
      user_id: "user-1",
      is_opened: false,
      opened_at: null,
    };
    expect(box.id).toBeTruthy();
    expect(box.is_opened).toBe(false);
    expect(box.opened_at).toBeNull();
  });

  it("KudosStats type has all 5 metrics", () => {
    const stats: KudosStats = {
      kudos_received: 25,
      kudos_sent: 10,
      hearts_received: 100,
      secret_boxes_opened: 3,
      secret_boxes_remaining: 2,
    };
    expect(stats.kudos_received).toBe(25);
    expect(stats.kudos_sent).toBe(10);
    expect(stats.hearts_received).toBe(100);
    expect(stats.secret_boxes_opened).toBe(3);
    expect(stats.secret_boxes_remaining).toBe(2);
  });

  it("SpotlightData type has entries", () => {
    const data: SpotlightData = {
      total_kudos: 388,
      entries: [
        { user_id: "u1", name: "Alice", kudos_count: 15 },
      ],
    };
    expect(data.total_kudos).toBe(388);
    expect(data.entries).toHaveLength(1);
  });

  it("Hashtag type has id and name", () => {
    const tag: Hashtag = { id: "1", name: "Dedicated", slug: "dedicated" };
    expect(tag.name).toBe("Dedicated");
  });

  it("Department type has id and name", () => {
    const dept: Department = { id: "1", name: "CEVC1" };
    expect(dept.name).toBe("CEVC1");
  });
});
