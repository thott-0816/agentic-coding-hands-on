import Image from "next/image";
import { LoginButton } from "@/components/login/login-button";
import type { Dictionary } from "@/types/i18n";

interface HeroSectionProps {
  dictionary: Dictionary;
  initialError?: string | null;
}

export function HeroSection({ dictionary, initialError }: HeroSectionProps) {
  return (
    <section className="relative z-10 flex h-screen flex-col justify-center gap-[var(--spacing-hero-gap)] px-[var(--spacing-page-x)] max-md:gap-10 max-md:px-4 md:max-lg:gap-[60px] md:max-lg:px-12">
      {/* B.1 Key Visual */}
      <div>
        <Image
          src="/images/root-further.png"
          alt="ROOT FURTHER - Sun Annual Awards 2025"
          width={451}
          height={200}
          priority
          className="h-[200px] w-auto max-md:h-[120px] md:max-lg:h-[160px]"
        />
      </div>

      {/* B.2 Content + B.3 Login */}
      <div className="flex flex-col gap-[var(--spacing-content-gap)]">
        <p className="max-w-[480px] font-sans text-[20px] font-normal leading-[40px] tracking-[0.5px] text-white max-md:max-w-full">
          {dictionary["login.hero.description.line1.before"]}
          <strong className="font-bold">{dictionary["login.hero.description.line1.highlight"]}</strong>
          {dictionary["login.hero.description.line1.after"]}
          <br />
          {dictionary["login.hero.description.line2"]}
        </p>

        <LoginButton dictionary={dictionary} initialError={initialError} />
      </div>
    </section>
  );
}
