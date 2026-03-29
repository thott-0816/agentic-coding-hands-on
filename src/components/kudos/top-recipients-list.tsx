import type { Dictionary } from "@/types/i18n";

interface Recipient {
  id: string;
  name: string;
  avatar_url: string;
  info: string;
}

interface TopRecipientsListProps {
  recipients: Recipient[];
  dictionary: Dictionary;
}

const AVATAR_COLORS = [
  "#E57373", "#F06292", "#BA68C8", "#9575CD", "#7986CB",
  "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784",
  "#AED581", "#FFD54F", "#FFB74D", "#FF8A65", "#A1887F",
];

function getLastInitial(name: string): string {
  const parts = name.trim().split(/\s+/);
  const last = parts[parts.length - 1] || "?";
  return last.charAt(0).toUpperCase();
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function TopRecipientsList({ recipients, dictionary }: TopRecipientsListProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[var(--color-card-border)] p-4">
      <h3 className="text-center font-sans text-sm font-bold leading-5 text-[var(--color-text-gold)]">
        {dictionary["kudos.sidebar.topRecipients"]}
      </h3>
      <div className="flex flex-col gap-3">
        {recipients.map((r) => {
          const initial = getLastInitial(r.name);
          const bgColor = getAvatarColor(r.name);

          return (
            <div key={r.id} className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-sm font-bold text-white"
                style={{ backgroundColor: bgColor }}
                aria-label={r.name}
              >
                {initial}
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm font-bold leading-5 text-[var(--color-text-gold)]">{r.name}</span>
                <span className="font-sans text-xs font-medium leading-4 text-white">Nhận được 1 áo phông SAA</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
