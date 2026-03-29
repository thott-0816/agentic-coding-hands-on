"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { KudoUser } from "@/types/kudos";

interface SunnerSearchProps {
  users: KudoUser[];
  placeholder: string;
}

const AVATAR_COLORS = [
  "#E57373", "#F06292", "#BA68C8", "#9575CD", "#7986CB",
  "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getLastInitial(name: string): string {
  const parts = name.trim().split(/\s+/);
  const last = parts[parts.length - 1] || "?";
  return last.charAt(0).toUpperCase();
}

export function SunnerSearch({ users, placeholder }: SunnerSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = query.length > 0
    ? users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="relative w-1/3 max-md:w-full">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true" className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => { if (query.length > 0) setIsOpen(true); }}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-full border border-white/20 bg-white/10 py-4 pl-10 pr-4 font-sans text-base text-white placeholder:text-white focus:border-[var(--color-text-gold)] focus:outline-none"
      />

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[320px] overflow-y-auto rounded-lg border border-[var(--color-card-border)] bg-[var(--color-section-bg)] p-2 shadow-xl">
          {suggestions.map((user) => {
            const initial = getLastInitial(user.name);
            const bgColor = getAvatarColor(user.name);
            return (
              <Link
                key={user.id}
                href={`/profile/${user.id}`}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-white/10"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-sm font-bold text-white"
                  style={{ backgroundColor: bgColor }}
                >
                  {initial}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-bold text-white">{user.name}</span>
                  <span className="font-sans text-xs text-white/50">{user.department}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
