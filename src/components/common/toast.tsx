"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string | null;
  onDismiss?: () => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message, onDismiss]);

  if (!visible || !message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-center gap-3 rounded-lg bg-black/80 px-4 py-3 text-sm text-white shadow-lg backdrop-blur-sm"
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 11a1 1 0 110-2 1 1 0 010 2zm1-4a1 1 0 01-2 0V6a1 1 0 012 0v3z"
          fill="#FBBF24"
        />
      </svg>
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          onDismiss?.();
        }}
        className="shrink-0 text-white/60 hover:text-white"
        aria-label="Dismiss"
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
        </svg>
      </button>
    </div>
  );
}
