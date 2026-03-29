interface SectionHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <hr className="h-px border-0 bg-[#2E3940]" />
      <div className="flex flex-wrap items-center justify-between gap-4 xl:flex-nowrap">
        <h2 className="font-sans text-[50px] font-medium leading-normal text-[var(--color-text-gold)] max-md:text-3xl md:max-lg:text-[40px]">
          {title}
        </h2>
        {children && <div className="flex w-full items-center gap-4 xl:w-auto">{children}</div>}
      </div>
    </div>
  );
}
