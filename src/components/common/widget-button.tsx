"use client";

import { PencilIcon } from "@/components/common/icons/pencil-icon";
import Image from "next/image";
import type { Dictionary } from "@/types/i18n";

interface WidgetButtonProps {
  dictionary: Dictionary;
}

export function WidgetButton({ dictionary }: WidgetButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        // Placeholder — quick actions menu will be implemented later
      }}
      aria-label={dictionary["common.header.quickActions"]}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-[105px] cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[var(--color-text-gold)] transition-all hover:border hover:border-[rgba(0,0,0,0.06)] hover:bg-white hover:shadow-[0_0_12px_0_#FAE287] active:scale-95"
      style={{ boxShadow: "0px 0px 6px 0px rgba(250,226,135,1), 0px 4px 4px 0px rgba(0,0,0,0.25)" }}
    >
      <PencilIcon className="h-5 w-5 text-[var(--color-bg-primary)]" />
      <span className="text-lg font-bold leading-none text-[var(--color-bg-primary)]">/</span>
      <Image
        src="/saa-logo.svg"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6"
        aria-hidden="true"
      />
    </button>
  );
}
