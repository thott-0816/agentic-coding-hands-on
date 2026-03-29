import Image from "next/image";
import { SunnerSearch } from "@/components/kudos/sunner-search";
import type { KudoUser } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

interface KudosBannerProps {
  dictionary: Dictionary;
  users: KudoUser[];
}

export function KudosBanner({ dictionary, users }: KudosBannerProps) {
  return (
    <section className="relative z-20 flex h-[512px] w-full flex-col justify-end pb-12 max-md:h-[300px] max-md:pb-6">
      {/* Background artwork */}
      <Image
        src="/images/homepage-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "center 70%" }}
        aria-hidden="true"
      />
      {/* Gradient overlay — stronger fade covering text area */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, #00101A 0%, rgba(0,16,26,0.95) 25%, rgba(0,16,26,0.7) 45%, rgba(0,16,26,0.3) 65%, rgba(0,19,32,0) 80%)",
        }}
        aria-hidden="true"
      />

      {/* Content — left-aligned per Figma */}
      <div className="relative z-10 flex w-full flex-col gap-6 px-[var(--spacing-page-x)] max-md:gap-4 max-md:px-4 md:max-lg:px-12 lg:max-xl:px-[calc(var(--spacing-page-x)/2)]">
        {/* Title — gold, left-aligned, larger font per Figma */}
        <p className="font-sans text-[32px] font-normal leading-10 text-[var(--color-text-gold)] max-md:text-xl">
          {dictionary["kudos.banner.title"]}
        </p>

        {/* SAA KUDOS logo — exported from Figma as SVG asset */}
        <Image
          src="/images/kudos/kudos-logo.svg"
          alt="SAA KUDOS"
          width={600}
          height={140}
          className="h-auto w-[600px] max-md:w-[300px] md:max-lg:w-[450px]"
          priority
        />

        {/* Input row: pill input + search */}
        <div className="mt-[36px] flex w-full items-center gap-4 max-md:mt-4 max-md:flex-col">
          {/* Pill input trigger — 2/3 width */}
          <button
            type="button"
            className="flex w-2/3 cursor-pointer items-center gap-3 rounded-full border border-[var(--color-card-border)] bg-white/10 px-6 py-4 text-left font-sans text-base font-normal text-white transition-all hover:bg-white/20 max-md:w-full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="shrink-0">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <span>{dictionary["kudos.banner.inputPlaceholder"]}</span>
          </button>

          {/* Search input with autocomplete */}
          <SunnerSearch users={users} placeholder={dictionary["kudos.banner.searchPlaceholder"]} />
        </div>
      </div>
    </section>
  );
}
