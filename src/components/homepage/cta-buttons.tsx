import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/icons/arrow-right-icon";
import type { Dictionary } from "@/types/i18n";

interface CTAButtonsProps {
  dictionary: Dictionary;
}

export function CTAButtons({ dictionary }: CTAButtonsProps) {
  return (
    <div className="flex gap-4 max-md:flex-col">
      <Link
        href="/awards"
        className="group flex items-center gap-2 rounded-lg border border-[var(--color-text-gold)] bg-[var(--color-text-gold)] px-6 py-4 font-sans text-base font-bold leading-6 text-[var(--color-bg-primary)] transition-all duration-150 hover:brightness-110 max-md:justify-center"
      >
        {dictionary["homepage.cta.aboutAwards"]}
        <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <Link
        href="/kudos"
        className="group flex items-center gap-2 rounded-lg border border-[var(--color-text-gold)] bg-transparent px-6 py-4 font-sans text-base font-bold leading-6 text-[var(--color-text-gold)] transition-all duration-150 hover:bg-[var(--color-text-gold)] hover:text-[var(--color-bg-primary)] max-md:justify-center"
      >
        {dictionary["homepage.cta.aboutKudos"]}
        <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
