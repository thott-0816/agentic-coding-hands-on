import Image from "next/image";
import { cookies } from "next/headers";
import { getLocale, getDictionary } from "@/libs/i18n/config";
import { HeroBanner } from "@/components/homepage/hero-banner";
import { RootFurtherContent } from "@/components/homepage/root-further-content";
import { AwardSection } from "@/components/homepage/award-section";
import { KudosPromo } from "@/components/homepage/kudos-promo";

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore.get("lang")?.value);
  const dictionary = getDictionary(locale);

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-bg-primary)]">
      {/* Background image — covers hero + extends into content, then fades out */}
      <div className="absolute inset-x-0 top-0 z-0 h-[140vh]" aria-hidden="true">
        <Image
          src="/images/homepage-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "30% top" }}
          sizes="100vw"
        />
        {/* Left gradient — lighter than before */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,16,26,0.5) 0%, rgba(0,16,26,0.15) 18%, transparent 50%)",
          }}
        />
        {/* Bottom fade — gradual fade to page bg color */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #00101A 0%, rgba(0,16,26,0.6) 20%, rgba(0,16,26,0.15) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Content — all relative z-10 above background */}
      <div className="relative z-10">
        <HeroBanner dictionary={dictionary} />
        <RootFurtherContent dictionary={dictionary} />
        <AwardSection dictionary={dictionary} />
        <div className="py-16 max-md:py-8">
          <KudosPromo dictionary={dictionary} />
        </div>
      </div>
    </main>
  );
}
