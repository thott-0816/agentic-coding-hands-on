import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/types/i18n";

interface FooterProps {
  dictionary: Dictionary;
  variant?: "simple" | "full";
}

const FOOTER_LINKS = [
  { href: "/", label: "About SAA 2025" },
  { href: "/awards", label: "Award Information" },
  { href: "/kudos", label: "Sun* Kudos" },
  { href: "/community-standards", label: "Tiêu chuẩn chung" },
];

export function Footer({ dictionary, variant = "simple" }: FooterProps) {
  if (variant === "simple") {
    return (
      <footer className="absolute bottom-0 z-10 flex h-[74px] w-full items-center justify-center border-t border-[var(--color-footer-border)] px-[var(--spacing-page-x)] max-md:px-4 md:max-lg:px-12">
        <p className="text-center font-[family-name:var(--font-montserrat-alternates)] text-base font-normal leading-6 text-white max-md:text-sm">
          {dictionary["common.footer.copyright"]}
        </p>
      </footer>
    );
  }

  return (
    <footer className="flex h-[74px] w-full items-center justify-between border-t border-[var(--color-footer-border)] bg-[var(--color-bg-primary)] px-[var(--spacing-page-x)] max-md:h-auto max-md:flex-col max-md:gap-4 max-md:px-4 max-md:py-6 md:max-lg:px-12">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/saa-logo.png"
          alt="Sun Annual Awards 2025"
          width={52}
          height={48}
          className="h-auto w-[52px]"
        />
      </Link>

      {/* Nav Links - hidden below xl */}
      <nav className="hidden items-center gap-8 xl:flex">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-sans text-sm font-normal text-white/70 transition-colors hover:text-[var(--color-text-gold)]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Copyright */}
      <p className="font-[family-name:var(--font-montserrat-alternates)] text-base font-normal leading-6 text-white/50 max-md:text-sm">
        {dictionary["common.footer.copyright"]}
      </p>
    </footer>
  );
}
