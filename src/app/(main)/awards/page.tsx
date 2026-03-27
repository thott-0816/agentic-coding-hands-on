import Image from "next/image";
import { cookies } from "next/headers";
import { getLocale, getDictionary } from "@/libs/i18n/config";
import { awards } from "@/data/awards";
import { AwardsSectionTitle } from "@/components/awards/awards-section-title";
import { AwardsSidebar } from "@/components/awards/awards-sidebar";
import { AwardDetailCard } from "@/components/awards/award-detail-card";
import { KudosPromo } from "@/components/homepage/kudos-promo";

export default async function AwardsPage() {
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore.get("lang")?.value);
  const dictionary = getDictionary(locale);

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-bg-primary)]">
      {/* Background image — covers hero + section title area, then fades */}
      <div className="absolute inset-x-0 top-0 z-0 h-[700px]" aria-hidden="true">
        <Image
          src="/images/homepage-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 70%" }}
        />
        {/* Gradient fade to page bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #00101A 0%, rgba(0,16,26,0.9) 22%, rgba(0,16,26,0.55) 40%, rgba(0,16,26,0.25) 55%, rgba(0,19,32,0) 72%)",
          }}
        />
      </div>

      {/* ROOT FURTHER logo */}
      <div className="relative z-10 px-[var(--spacing-page-x)] pt-48 max-md:px-4 max-md:pt-32 md:max-lg:px-12 lg:max-xl:px-[120px] md:max-xl:pt-40">
        <Image
          src="/images/root-further.png"
          alt="ROOT FURTHER"
          width={338}
          height={127}
          className="h-auto w-[338px] max-md:w-[200px] md:max-xl:w-[280px]"
          priority
        />
      </div>

      {/* Page content */}
      <div className="relative z-10 px-[var(--spacing-page-x)] pt-24 pb-16 max-md:px-4 max-md:pt-12 max-md:pb-8 md:max-lg:px-12 lg:max-xl:px-[120px] md:max-xl:pt-16 md:max-xl:pb-12">
        <AwardsSectionTitle dictionary={dictionary} />

        <div className="mt-[120px] flex gap-20 max-md:mt-10 md:max-xl:mt-16">
          <AwardsSidebar awards={awards} />

          <div className="flex flex-1 flex-col gap-20 max-md:gap-10">
            {awards.map((award, index) => (
              <div key={award.slug}>
                {index > 0 && <hr className="mb-20 h-px w-full border-0 bg-[#2E3940] max-md:mb-10" />}
                <div id={award.slug}>
                  <AwardDetailCard award={award} dictionary={dictionary} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[120px] max-md:mt-10 md:max-xl:mt-16">
          <KudosPromo dictionary={dictionary} className="" />
        </div>
      </div>
    </main>
  );
}
