import { KudosStats } from "@/components/kudos/kudos-stats";
import { TopRecipientsList } from "@/components/kudos/top-recipients-list";
import type { KudosStats as KudosStatsType } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

interface Recipient {
  id: string;
  name: string;
  avatar_url: string;
  info: string;
}

interface KudosSidebarProps {
  stats: KudosStatsType;
  recipients: Recipient[];
  dictionary: Dictionary;
}

export function KudosSidebar({ stats, recipients, dictionary }: KudosSidebarProps) {
  return (
    <aside className="hidden w-[280px] shrink-0 xl:block">
      <div className="sticky top-[120px] flex flex-col gap-10">
        <KudosStats stats={stats} dictionary={dictionary} />
        <TopRecipientsList recipients={recipients} dictionary={dictionary} />
      </div>
    </aside>
  );
}
