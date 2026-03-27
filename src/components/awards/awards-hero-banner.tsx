import Image from "next/image";

export function AwardsHeroBanner() {
  return (
    <section className="relative flex h-[400px] w-full items-end overflow-hidden max-md:h-[250px] md:max-xl:h-[320px]">
      {/* Background artwork */}
      <Image
        src="/images/homepage-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "center 70%" }}
        aria-hidden="true"
      />
      {/* Gradient overlay — bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)",
        }}
        aria-hidden="true"
      />
      {/* ROOT FURTHER text/logo — căn trái */}
      <div className="relative z-10 w-full px-[var(--spacing-page-x)] pb-12 max-md:px-4 max-md:pb-6 md:max-xl:px-12 md:max-xl:pb-8">
        <Image
          src="/images/root-further.png"
          alt="ROOT FURTHER"
          width={338}
          height={127}
          className="h-auto w-[338px] max-md:w-[200px] md:max-xl:w-[280px]"
          priority
        />
      </div>
    </section>
  );
}
