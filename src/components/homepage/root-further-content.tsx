import Image from "next/image";
import type { Dictionary } from "@/types/i18n";

interface RootFurtherContentProps {
  dictionary: Dictionary;
}

export function RootFurtherContent({ dictionary }: RootFurtherContentProps) {
  return (
    <section className="px-[var(--spacing-page-x)] py-[120px] max-md:px-4 max-md:py-12 md:max-lg:px-12 md:max-lg:py-16">
      <div className="flex flex-col gap-8">
        {/* ROOT FURTHER logo — stacked centered */}
        <div className="flex flex-col items-center gap-1">
          <Image
            src="/images/root-further-content-1.png"
            alt="ROOT"
            width={189}
            height={67}
            className="h-auto w-[189px] max-md:w-[120px]"
          />
          <Image
            src="/images/root-further-content-2.png"
            alt="FURTHER"
            width={290}
            height={67}
            className="h-auto w-[290px] max-md:w-[180px]"
          />
        </div>

        {/* Content paragraphs */}
        <div
          className="font-sans text-[20px] font-normal leading-8 text-white max-md:text-base max-md:leading-6"
          style={{ textAlign: "justify" }}
        >
          <p>{dictionary["homepage.content.p1"]}</p>
          <p>{dictionary["homepage.content.p2"]}</p>
          <p>{dictionary["homepage.content.p3"]}</p>

          <p className="my-8 text-center font-bold">
            {dictionary["homepage.content.quote"]}
            <br />
            {dictionary["homepage.content.quoteSource"]}
          </p>

          <p>{dictionary["homepage.content.p4"]}</p>
          <p>{dictionary["homepage.content.p5"]}</p>
        </div>
      </div>
    </section>
  );
}
