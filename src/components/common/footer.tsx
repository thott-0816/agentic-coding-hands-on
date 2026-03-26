import type { Dictionary } from "@/types/i18n";

interface FooterProps {
  dictionary: Dictionary;
}

export function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="absolute bottom-0 z-10 flex h-[74px] w-full items-center justify-center border-t border-[var(--color-footer-border)] px-[var(--spacing-footer-x)] max-md:px-4 md:max-lg:px-12">
      <p className="text-center font-[family-name:var(--font-montserrat-alternates)] text-base font-normal leading-6 text-white max-md:text-sm">
        {dictionary["common.footer.copyright"]}
      </p>
    </footer>
  );
}
