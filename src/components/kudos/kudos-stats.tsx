import type { KudosStats as KudosStatsType } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

interface KudosStatsProps {
  stats: KudosStatsType;
  dictionary: Dictionary;
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="font-sans text-sm font-normal leading-5 text-white">{label}</span>
      <span className="font-sans text-2xl font-bold leading-8 text-[var(--color-text-gold)]">{value}</span>
    </div>
  );
}

export function KudosStats({ stats, dictionary }: KudosStatsProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[var(--color-card-border)] p-4">
      <StatRow label={dictionary["kudos.sidebar.kudosReceived"]} value={stats.kudos_received} />
      <StatRow label={dictionary["kudos.sidebar.kudosSent"]} value={stats.kudos_sent} />
      <StatRow label={dictionary["kudos.sidebar.heartsReceived"]} value={stats.hearts_received} />

      <hr className="h-px border-0 bg-[var(--color-footer-border)]" />

      <StatRow label={dictionary["kudos.sidebar.secretBoxOpened"]} value={stats.secret_boxes_opened} />
      <StatRow label={dictionary["kudos.sidebar.secretBoxRemaining"]} value={stats.secret_boxes_remaining} />

      <button
        type="button"
        className="mt-2 w-full cursor-pointer rounded-lg bg-[var(--color-text-gold)] px-6 py-3 font-sans text-base font-bold leading-6 text-[var(--color-bg-primary)] transition-all hover:brightness-110"
      >
        {dictionary["kudos.sidebar.openSecretBox"]} 🎁
      </button>
    </div>
  );
}
