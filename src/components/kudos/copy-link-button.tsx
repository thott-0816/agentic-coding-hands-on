"use client";

import { useCallback } from "react";
import type { Dictionary } from "@/types/i18n";

interface CopyLinkButtonProps {
  kudoId: string;
  dictionary: Dictionary;
  variant?: "dark" | "light";
}

export function CopyLinkButton({ kudoId, dictionary, variant = "dark" }: CopyLinkButtonProps) {
  const handleCopy = useCallback(() => {
    const url = `${window.location.origin}/kudos#${kudoId}`;
    navigator.clipboard.writeText(url);
  }, [kudoId]);

  const colorClass = variant === "light"
    ? "text-[#00101A] hover:text-[#D4271D]"
    : "text-white hover:text-[var(--color-text-gold)]";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={dictionary["kudos.card.copyLink"]}
      className={`flex cursor-pointer items-center gap-1 font-sans text-base font-bold leading-6 transition-colors ${colorClass}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      <span>{dictionary["kudos.card.copyLink"]}</span>
    </button>
  );
}
