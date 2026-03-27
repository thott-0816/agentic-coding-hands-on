import Image from "next/image";
import type { AwardCategory } from "@/data/awards";
import type { Dictionary, TranslationKey } from "@/types/i18n";

interface AwardDetailCardProps {
  award: AwardCategory;
  dictionary: Dictionary;
  index: number;
}

function Divider() {
  return <hr className="my-6 h-px w-full border-0 bg-[#2E3940]" />;
}

export function AwardDetailCard({ award, dictionary, index }: AwardDetailCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <div
      className={`flex items-start gap-10 max-md:flex-col max-md:items-center max-md:gap-6 md:max-xl:gap-6 ${
        isReversed ? "flex-row-reverse" : ""
      }`}
    >
      {/* Award Image — card style with ring frame */}
      <div className="relative flex aspect-square w-[336px] shrink-0 items-center justify-center overflow-hidden rounded-xl max-md:w-[280px] md:max-xl:w-[240px]">
        <Image
          src="/images/awards/award-ring.png"
          alt=""
          fill
          className="z-0 object-contain"
          aria-hidden="true"
        />
        <Image
          src={award.imagePath}
          alt={award.name}
          width={222}
          height={36}
          className="relative z-10 h-auto w-[60%]"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Title — icon-target + 24px gold */}
        <div className="flex items-center gap-2">
          <Image src="/images/awards/icon-target.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0" aria-hidden="true" />
          <h2 className="font-sans text-2xl font-medium leading-8 text-[var(--color-text-gold)]">
            {award.name}
          </h2>
        </div>

        {/* Description */}
        {award.fullDescription && (
          <>
            <p className="mt-4 font-sans font-normal text-justify text-base leading-6 md:leading-7 tracking-[0.5px] text-white">
              {award.fullDescription}
            </p>
          </>
        )}

        {/* Quantity — icon-diamond + label + number + unit on one line */}
        {award.quantity !== undefined && (
          <>
            <Divider />
            <div className="flex flex-wrap items-baseline gap-2">
              <Image src="/images/awards/icon-diamond.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0 self-center" aria-hidden="true" />
              <span className="font-sans text-2xl font-bold leading-8 text-[var(--color-text-gold)]">
                {dictionary["awards.quantity.label"]}
              </span>
              <span className="font-sans text-[40px] font-bold leading-none text-white">
                {String(award.quantity).padStart(2, "0")}
              </span>
              {award.unit && (
                <span className="font-sans text-sm font-normal leading-5 text-white">
                  {dictionary[award.unit as TranslationKey]}
                </span>
              )}
            </div>
          </>
        )}

        {/* Prize Value — icon-prize + 24px gold label */}
        {award.prizeValue && (
          <>
            <Divider />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src="/images/awards/icon-prize.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="font-sans text-2xl font-bold leading-8 text-[var(--color-text-gold)]">
                  {dictionary["awards.prize.label"]}
                </span>
              </div>
              <p className="pl-8 font-sans text-4xl font-bold leading-[44px] text-white">
                {award.prizeValue}
              </p>
              {award.prizeNote && (
                <p className="pl-8 font-sans text-sm font-normal leading-5 text-white">
                  {dictionary[award.prizeNote as TranslationKey]}
                </p>
              )}
            </div>
          </>
        )}

        {/* Second Prize (Signature 2025 - team) */}
        {award.prizeValueTeam && (
          <>
            <Divider />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src="/images/awards/icon-prize.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="font-sans text-2xl font-bold leading-8 text-[var(--color-text-gold)]">
                  {dictionary["awards.prize.label"]}
                </span>
              </div>
              <p className="pl-8 font-sans text-4xl font-bold leading-[44px] text-white">
                {award.prizeValueTeam}
              </p>
              {award.prizeNoteTeam && (
                <p className="pl-8 font-sans text-sm font-normal leading-5 text-white">
                  {dictionary[award.prizeNoteTeam as TranslationKey]}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
