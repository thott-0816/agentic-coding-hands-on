import { cookies } from "next/headers";
import { getLocale, getDictionary } from "@/libs/i18n/config";
import { SectionHeader } from "@/components/kudos/section-header";
import { KudosBanner } from "@/components/kudos/kudos-banner";
import { HighlightKudos } from "@/components/kudos/highlight-kudos";
import { SpotlightBoard } from "@/components/kudos/spotlight-board";
import { KudosFeed } from "@/components/kudos/kudos-feed";
import { KudosSidebar } from "@/components/kudos/kudos-sidebar";
import { MOCK_KUDOS, users as MOCK_USERS } from "@/data/mock-kudos";
import type { KudosStats as KudosStatsType, SpotlightData } from "@/types/kudos";

const PAGE_SIZE = 4;

const MOCK_STATS: KudosStatsType = {
  kudos_received: 25,
  kudos_sent: 25,
  hearts_received: 25,
  secret_boxes_opened: 3,
  secret_boxes_remaining: 2,
};

const MOCK_SPOTLIGHT: SpotlightData = {
  total_kudos: MOCK_KUDOS.length,
  entries: [
    { user_id: "u1", name: "Nguyễn Hoàng Long", kudos_count: 15 },
    { user_id: "u2", name: "Trần Thị Minh Anh", kudos_count: 12 },
    { user_id: "u3", name: "Phạm Minh Đức", kudos_count: 10 },
    { user_id: "u4", name: "Lê Thanh Hà", kudos_count: 9 },
    { user_id: "u5", name: "Vũ Quang Huy", kudos_count: 8 },
    { user_id: "u6", name: "Đỗ Thị Hương", kudos_count: 7 },
    { user_id: "u7", name: "Hoàng Văn Nam", kudos_count: 6 },
    { user_id: "u8", name: "Nguyễn Bá Châu", kudos_count: 5 },
  ],
};

const MOCK_RECIPIENTS = [
  { id: "1", name: "Nguyễn Hoàng Long", avatar_url: "", info: "Nhận được 1 sổ phong SAA" },
  { id: "2", name: "Trần Thị Minh Anh", avatar_url: "", info: "Nhận được 1 sổ phong SAA" },
  { id: "3", name: "Phạm Minh Đức", avatar_url: "", info: "Nhận được 1 sổ phong SAA" },
  { id: "4", name: "Lê Thanh Hà", avatar_url: "", info: "Nhận được 1 sổ phong SAA" },
  { id: "5", name: "Vũ Quang Huy", avatar_url: "", info: "Nhận được 1 sổ phong SAA" },
];

export default async function KudosPage() {
  const cookieStore = await cookies();
  const locale = getLocale(cookieStore.get("lang")?.value);
  const dictionary = getDictionary(locale);

  // MOCK_KUDOS already sorted by hearts_count desc
  const allKudos = MOCK_KUDOS;
  const firstPage = allKudos.slice(0, PAGE_SIZE);
  const stats = MOCK_STATS;
  const recipients = MOCK_RECIPIENTS;
  const spotlightData = MOCK_SPOTLIGHT;

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-bg-primary)]">
      {/* A: KV Banner */}
      <KudosBanner dictionary={dictionary} users={MOCK_USERS} />

      {/* Page content */}
      <div className="relative z-10 flex flex-col gap-[120px] px-[var(--spacing-page-x)] pb-16 max-md:gap-16 max-md:px-4 md:max-lg:px-12 lg:max-xl:px-[calc(var(--spacing-page-x)/2)]">
        {/* B: Highlight Kudos — pass all kudos, component handles filtering + top by hearts */}
        <HighlightKudos kudos={allKudos} dictionary={dictionary} />

        {/* B.6+B.7: Spotlight Board */}
        <section>
          <SectionHeader title={dictionary["kudos.spotlight.title"]} />
          <div className="mt-16">
            <SpotlightBoard data={spotlightData} dictionary={dictionary} />
          </div>
        </section>

        {/* C+D: All Kudos Feed (page size 4) + Sidebar */}
        <section>
          <SectionHeader title={dictionary["kudos.allKudos.title"]} />
          <div className="mt-16 flex gap-10 max-xl:flex-col">
            <div className="flex-1">
              <KudosFeed initialKudos={firstPage} allKudos={allKudos} dictionary={dictionary} />
            </div>
            <KudosSidebar stats={stats} recipients={recipients} dictionary={dictionary} />
          </div>
        </section>
      </div>
    </main>
  );
}
