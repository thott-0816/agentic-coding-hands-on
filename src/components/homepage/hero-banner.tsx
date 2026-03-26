import Image from "next/image";
import { CountdownTimer } from "@/components/homepage/countdown-timer";
import { EventInfo } from "@/components/homepage/event-info";
import { CTAButtons } from "@/components/homepage/cta-buttons";
import type { Dictionary } from "@/types/i18n";

interface HeroBannerProps {
  dictionary: Dictionary;
}

export function HeroBanner({ dictionary }: HeroBannerProps) {
  return (
    <section className="relative min-h-screen w-full">
      {/* Content */}
      <div className="relative z-10 flex h-screen flex-col justify-center gap-10 px-[var(--spacing-page-x)] max-md:px-4 md:max-lg:px-12">
        {/* ROOT FURTHER title */}
        <Image
          src="/images/root-further.png"
          alt="ROOT FURTHER - Sun Annual Awards 2025"
          width={451}
          height={200}
          priority
          className="h-auto w-full max-w-[451px] max-md:max-w-[250px] md:max-lg:max-w-[350px]"
        />

        {/* Countdown + Event Info + CTA */}
        <div className="flex flex-col gap-6">
          <CountdownTimer dictionary={dictionary} />
          <EventInfo dictionary={dictionary} />
          <CTAButtons dictionary={dictionary} />
        </div>
      </div>
    </section>
  );
}
