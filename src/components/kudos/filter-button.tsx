"use client";

import { useState, useRef, useEffect } from "react";
import { FilterDropdown } from "@/components/kudos/filter-dropdown";

interface FilterButtonProps {
  label: string;
  items: { id: string; label: string }[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function FilterButton({ label, items, selectedId, onSelect }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLabel = selectedId ? items.find((i) => i.id === selectedId)?.label : null;
  const displayText = selectedLabel ?? label;

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--color-text-gold)] px-4 font-sans text-base font-normal leading-6 transition-colors ${
          selectedId
            ? "bg-[rgba(255,234,158,0.1)] text-[var(--color-text-gold)]"
            : "text-white hover:bg-[rgba(255,234,158,0.05)]"
        }`}
      >
        {displayText}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-2 animate-[fadeIn_150ms_ease-out]">
          <FilterDropdown
            items={items}
            selectedId={selectedId}
            onSelect={(id) => {
              onSelect(id === selectedId ? null : id);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
