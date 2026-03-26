import type { Dictionary } from "@/types/i18n";

interface EventInfoProps {
  dictionary: Dictionary;
}

export function EventInfo({ dictionary }: EventInfoProps) {
  return (
    <div className="flex flex-col gap-2 font-sans">
      <p className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <span>
          <span className="text-base font-bold leading-6 tracking-[0.15px] text-white">
            {dictionary["homepage.event.time"]}:{" "}
          </span>
          <span className="text-2xl font-bold leading-8 text-[var(--color-text-gold)]">
            26/12/2025
          </span>
        </span>
        <span>
          <span className="text-base font-bold leading-6 tracking-[0.15px] text-white">
            {dictionary["homepage.event.venue"]}:{" "}
          </span>
          <span className="text-2xl font-bold leading-8 text-[var(--color-text-gold)]">
            Âu Cơ Art Center
          </span>
        </span>
      </p>
      <p className="text-base font-bold leading-6 tracking-[0.5px] text-white">
        {dictionary["homepage.event.livestream"]}
      </p>
    </div>
  );
}
