"use client";

interface HeartButtonProps {
  count: number;
  isLiked: boolean;
  onToggle: () => void;
}

export function HeartButton({ count, isLiked, onToggle }: HeartButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isLiked}
      aria-label={isLiked ? "Unlike this kudos" : "Like this kudos"}
      className="flex cursor-pointer items-center gap-1 transition-transform hover:scale-110 active:scale-125"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isLiked ? "var(--color-heart-active)" : "none"}
        stroke={isLiked ? "var(--color-heart-active)" : "var(--color-heart-inactive)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="font-sans text-sm font-bold leading-5 text-white">
        {count.toLocaleString()}
      </span>
    </button>
  );
}
