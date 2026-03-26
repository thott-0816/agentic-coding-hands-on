import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/icons/arrow-right-icon";
import type { AwardCategory } from "@/data/awards";
import type { Dictionary } from "@/types/i18n";

interface AwardCardProps {
  award: AwardCategory;
  dictionary: Dictionary;
}

export function AwardCard({ award, dictionary }: AwardCardProps) {
  const href = `/awards#${award.slug}`;

  return (
    <article className="group flex w-full flex-col gap-3 transition-transform duration-200 hover:-translate-y-1">
      {/* Award Image */}
      <Link href={href} className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl">
        {/* Ring frame */}
        <Image
          src="/images/awards/award-ring.png"
          alt=""
          fill
          className="z-0 object-contain"
          aria-hidden="true"
        />
        {/* Award name label (centered inside ring) */}
        <Image
          src={award.imagePath}
          alt={award.name}
          width={222}
          height={36}
          className="relative z-10 w-[60%] h-auto"
          loading="lazy"
        />
      </Link>

      {/* Text content */}
      <div className="flex flex-col gap-1">
        <Link href={href}>
          <h3 className="font-sans text-2xl font-normal leading-8 text-[var(--color-text-gold)]">
            {award.name}
          </h3>
        </Link>
        <p className="line-clamp-2 font-sans text-base font-normal leading-6 tracking-[0.5px] text-white">
          {award.description}
        </p>
      </div>

      {/* Detail link */}
      <Link
        href={href}
        className="flex items-center gap-1 font-sans text-sm font-semibold leading-5 text-white transition-colors hover:text-[var(--color-text-gold)]"
      >
        {dictionary["homepage.awards.detail"]}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </article>
  );
}
