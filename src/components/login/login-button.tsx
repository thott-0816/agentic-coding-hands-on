"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/libs/supabase/client";
import { GoogleIcon } from "@/components/common/icons/google-icon";
import { Toast } from "@/components/common/toast";
import type { Dictionary } from "@/types/i18n";

interface LoginButtonProps {
  dictionary: Dictionary;
  initialError?: string | null;
}

const ERROR_KEY_MAP: Record<string, keyof Dictionary> = {
  cancelled: "login.error.cancelled",
  failed: "login.error.failed",
  network: "login.error.network",
  unauthorized: "login.error.unauthorized",
  serviceUnavailable: "login.error.serviceUnavailable",
};

export function LoginButton({ dictionary, initialError }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Auto-focus login button on mount
  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (initialError) {
      const key = ERROR_KEY_MAP[initialError];
      setError(key ? dictionary[key] : dictionary["login.error.failed"]);
      router.replace("/login");
    }
  }, [initialError, dictionary, router]);

  const handleLogin = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        setError(dictionary["login.error.failed"]);
        setIsLoading(false);
      }
    } catch {
      setError(dictionary["login.error.network"]);
      setIsLoading(false);
    }
  }, [isLoading, dictionary]);

  const handleDismissError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {error && <Toast message={error} onDismiss={handleDismissError} />}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleLogin}
        disabled={isLoading}
        aria-label={dictionary["login.button.ariaLabel"]}
        aria-busy={isLoading}
        aria-disabled={isLoading}
        className={`flex w-fit min-w-[300px] appearance-none cursor-pointer items-center gap-2 rounded-lg border-none bg-[var(--color-btn-login)] px-6 py-4 font-sans text-[22px] font-normal leading-7 text-[var(--color-btn-login-text)] outline-none transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:bg-[#fff8e1] hover:shadow-[0_4px_12px_rgba(255,234,158,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-btn-login)] active:translate-y-0 active:bg-[var(--color-btn-login-active)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none ${isLoading ? "justify-center" : ""}`}
      >
        {isLoading ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                fill="currentColor"
                className="opacity-75"
              />
            </svg>
            <span>{dictionary["login.button.loading"]}</span>
          </>
        ) : (
          <>
            <span>{dictionary["login.button.loginWithGoogle"]}</span>
            <GoogleIcon />
          </>
        )}
      </button>
    </div>
  );
}
