import { awards } from "@/data/awards";
import { AwardCard } from "@/components/homepage/award-card";
import type { Dictionary } from "@/types/i18n";

interface AwardSectionProps {
  dictionary: Dictionary;
}

export function AwardSection({ dictionary }: AwardSectionProps) {
  return (
    <section className="flex flex-col gap-[80px] px-[var(--spacing-page-x)] py-16 max-md:gap-10 max-md:px-4 md:max-lg:px-12">
      {/* Section Header */}
      <div className="flex flex-col gap-6">
        <p className="border-b border-white/15 pb-6 font-sans text-2xl font-normal leading-8 text-white">
          {dictionary["homepage.awards.caption"]}
        </p>
        <h2 className="font-sans text-[57px] font-normal leading-[64px] tracking-[-0.25px] text-[var(--color-text-gold)] max-md:text-3xl">
          {dictionary["homepage.awards.title"]}
        </h2>
      </div>

      {/* Award Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,336px)] justify-center gap-6 sm:justify-around">
        {awards.map((award) => (
          <AwardCard key={award.slug} award={award} dictionary={dictionary} />
        ))}
      </div>
    </section>
  );
}
