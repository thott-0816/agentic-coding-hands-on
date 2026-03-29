import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProfileDropdown } from "../profile-dropdown";
import type { Dictionary } from "@/types/i18n";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/components/common/icons/user-icon", () => ({
  UserIcon: ({ className }: { className?: string }) => <span data-testid="user-icon" className={className} />,
}));

vi.mock("@/components/common/icons/chevron-down-icon", () => ({
  ChevronDownIcon: () => <span data-testid="chevron" />,
}));

vi.mock("@/actions/auth", () => ({
  logout: vi.fn(),
}));

const mockDictionary = {
  "common.header.profile": "Profile",
  "common.header.logout": "Logout",
} as Dictionary;

describe("ProfileDropdown", () => {
  it("renders trigger button with user icon", () => {
    render(<ProfileDropdown dictionary={mockDictionary} />);
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("has correct aria attributes on trigger", () => {
    render(<ProfileDropdown dictionary={mockDictionary} />);
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens menu on click", () => {
    render(<ProfileDropdown dictionary={mockDictionary} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders menu items with menuitem role", () => {
    render(<ProfileDropdown dictionary={mockDictionary} />);
    fireEvent.click(screen.getByRole("button"));
    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(2);
  });

  it("navigates to /profile on Profile click", () => {
    render(<ProfileDropdown dictionary={mockDictionary} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Profile"));
    expect(mockPush).toHaveBeenCalledWith("/profile");
  });

  it("closes on Escape", () => {
    render(<ProfileDropdown dictionary={mockDictionary} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("menu").parentElement!, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
