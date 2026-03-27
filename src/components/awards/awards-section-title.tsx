import type { Dictionary } from "@/types/i18n";

interface AwardsSectionTitleProps {
  dictionary: Dictionary;
}

export function AwardsSectionTitle({ dictionary }: AwardsSectionTitleProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="w-full border-b border-[var(--color-footer-border)] pb-4 text-center font-sans text-2xl font-normal leading-8 text-white">
        {dictionary["awards.page.subtitle"]}
      </p>
      <h1 className="text-center font-sans text-[57px] font-normal leading-[64px] tracking-[-0.25px] text-[var(--color-text-gold)] max-md:text-4xl max-md:leading-10">
        {dictionary["awards.page.title"]}
      </h1>
    </div>
  );
}
