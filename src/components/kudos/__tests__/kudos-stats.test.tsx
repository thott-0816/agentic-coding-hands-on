import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { KudosStats } from "../kudos-stats";
import type { KudosStats as KudosStatsType } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

const mockStats: KudosStatsType = {
  kudos_received: 25,
  kudos_sent: 10,
  hearts_received: 100,
  secret_boxes_opened: 3,
  secret_boxes_remaining: 2,
};

const mockDictionary = {
  "kudos.sidebar.kudosReceived": "Số Kudos bạn nhận được",
  "kudos.sidebar.kudosSent": "Số Kudos bạn đã gửi",
  "kudos.sidebar.heartsReceived": "Số tim bạn nhận được",
  "kudos.sidebar.secretBoxOpened": "Số Secret Box bạn đã mở",
  "kudos.sidebar.secretBoxRemaining": "Số Secret Box chưa mở",
  "kudos.sidebar.openSecretBox": "Mở Secret Box",
} as Dictionary;

describe("KudosStats", () => {
  it("renders all 5 metric labels", () => {
    render(<KudosStats stats={mockStats} dictionary={mockDictionary} />);
    expect(screen.getByText("Số Kudos bạn nhận được")).toBeInTheDocument();
    expect(screen.getByText("Số Kudos bạn đã gửi")).toBeInTheDocument();
    expect(screen.getByText("Số tim bạn nhận được")).toBeInTheDocument();
    expect(screen.getByText("Số Secret Box bạn đã mở")).toBeInTheDocument();
    expect(screen.getByText("Số Secret Box chưa mở")).toBeInTheDocument();
  });

  it("renders all 5 metric values in gold", () => {
    render(<KudosStats stats={mockStats} dictionary={mockDictionary} />);
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders Mở Secret Box button", () => {
    render(<KudosStats stats={mockStats} dictionary={mockDictionary} />);
    expect(screen.getByRole("button", { name: /Mở Secret Box/ })).toBeInTheDocument();
  });

  it("has gold border container", () => {
    const { container } = render(<KudosStats stats={mockStats} dictionary={mockDictionary} />);
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("border");
    expect(wrapper?.className).toContain("border-[var(--color-card-border)]");
  });
});
