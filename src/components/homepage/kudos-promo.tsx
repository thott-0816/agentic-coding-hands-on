import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/icons/arrow-right-icon";
import type { Dictionary } from "@/types/i18n";

interface KudosPromoProps {
  dictionary: Dictionary;
  className?: string;
}

export function KudosPromo({ dictionary, className }: KudosPromoProps) {
  return (
    <section className={className ?? "mx-[var(--spacing-page-x)] max-md:mx-4 md:max-lg:mx-12"}>
      <div className="relative overflow-hidden rounded-xl bg-[var(--color-kudos-bg)]">
        {/* Background illustration */}
        <Image
          src="/images/kudos-illustration.png"
          alt=""
          fill
          className="object-cover object-right"
          aria-hidden="true"
          loading="lazy"
        />

        {/* Content: flex row (text left, logo right) */}
        <div className="relative z-10 flex items-center justify-between gap-8 p-10 max-md:flex-col max-md:p-6 md:max-lg:p-8">
          {/* Text content - left */}
          <div className="flex max-w-[500px] flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-sans text-2xl font-normal leading-8 text-white max-md:text-base">
                {dictionary["homepage.kudos.label"]}
              </p>
              <h2 className="font-sans text-[57px] font-normal leading-[64px] tracking-[-0.25px] text-[var(--color-text-gold)] max-md:text-3xl">
                {dictionary["homepage.kudos.title"]}
              </h2>
              <p
                className="whitespace-pre-line font-sans text-base font-normal leading-6 tracking-[0.5px] text-white"
                style={{ textAlign: "justify" }}
              >
                {dictionary["homepage.kudos.description"]}
              </p>
            </div>
            <Link
              href="/kudos"
              className="flex w-fit items-center gap-2 rounded bg-[var(--color-text-gold)] px-4 py-4 font-sans text-base font-normal leading-6 tracking-[0.15px] text-[var(--color-bg-primary)] transition-all duration-150 hover:brightness-110"
            >
              {dictionary["homepage.kudos.detail"]}
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>

          {/* Kudos logo - right */}
          <div className="flex shrink-0 items-center max-md:w-full max-md:justify-center">
            <Image
              src="/images/kudos-logo.png"
              alt="Sun* Kudos"
              width={350}
              height={72}
              className="h-16 w-auto max-xl:h-14 max-lg:h-12 max-md:h-8"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
