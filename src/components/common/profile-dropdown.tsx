"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UserIcon } from "@/components/common/icons/user-icon";
import { ChevronDownIcon } from "@/components/common/icons/chevron-down-icon";
import { logout } from "@/actions/auth";
import type { Dictionary } from "@/types/i18n";

interface ProfileDropdownProps {
  dictionary: Dictionary;
}

export function ProfileDropdown({ dictionary }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    },
    [isOpen]
  );

  const handleLogout = useCallback(async () => {
    setIsOpen(false);
    await logout();
  }, []);

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10"
      >
        <UserIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 flex min-w-[160px] animate-[fadeIn_150ms_ease-out] flex-col rounded-lg border border-[var(--color-card-border)] bg-[var(--color-section-bg)] p-1.5 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              router.push("/profile");
            }}
            className="flex w-full items-center gap-1 whitespace-nowrap rounded-sm bg-[rgba(255,234,158,0.1)] p-4 text-base font-normal text-white transition-colors hover:bg-[rgba(255,234,158,0.2)]"
            style={{ textShadow: "0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287" }}
          >
            <span>{dictionary["common.header.profile"]}</span>
            <UserIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-1 whitespace-nowrap rounded-sm p-4 text-base font-normal text-white transition-colors hover:bg-[rgba(255,234,158,0.1)]"
          >
            <span>{dictionary["common.header.logout"]}</span>
            <ChevronDownIcon className="-rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
}
