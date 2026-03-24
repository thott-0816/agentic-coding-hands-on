import Image from "next/image";
import { cookies } from "next/headers";
import { getLocale, getDictionary } from "@/libs/i18n/config";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { HeroSection } from "@/components/login/hero-section";

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore.get("lang")?.value);
  const dictionary = getDictionary(locale);
  const error = params.error ?? null;

  return (
    <div className="relative min-h-screen w-full bg-[var(--color-bg-primary)]">
      {/* C_Keyvisual — Background artwork (fixed, covers entire viewport including footer) */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/login-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Gradient left-to-right overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)",
          }}
        />

        {/* Gradient bottom-to-top overlay (lighter to let bg show through at footer) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,16,26,0.85) 0%, rgba(0,16,26,0.5) 15%, transparent 45%)",
          }}
        />
      </div>

      {/* A_Header (full width, content aligned via padding) */}
      <Header dictionary={dictionary} locale={locale} />

      {/* Hero section (aligned via its own padding, same as header) */}
      <HeroSection dictionary={dictionary} initialError={error} />

      {/* D_Footer (full width) */}
      <Footer dictionary={dictionary} />
    </div>
  );
}
