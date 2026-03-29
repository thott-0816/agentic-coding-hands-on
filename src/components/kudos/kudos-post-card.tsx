"use client";

import Image from "next/image";
import { CopyLinkButton } from "@/components/kudos/copy-link-button";
import type { Kudo } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

interface KudosPostCardProps {
  kudo: Kudo;
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

function UserBlock({ name, department, avatarUrl }: { name: string; department: string; avatarUrl: string }) {
  const initial = getLastInitial(name);
  const bgColor = getAvatarColor(name);
  const hasAvatar = avatarUrl && avatarUrl.length > 0;

  return (
    <div className="flex flex-col items-center gap-1">
      {hasAvatar ? (
        <Image
          src={avatarUrl}
          alt={name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full border-2 border-white object-cover"
        />
      ) : (
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white font-sans text-2xl font-bold text-white"
          style={{ backgroundColor: bgColor }}
          aria-label={name}
        >
          {initial}
        </div>
      )}
      <span className="text-center font-sans text-base font-bold leading-6 text-[#00101A]">{name}</span>
      <span className="text-center font-sans text-sm font-bold leading-5 text-[#999]">{department}</span>
    </div>
  );
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${hh}:${mm} - ${month}/${day}/${year}`;
}

export function KudosPostCard({ kudo, dictionary }: KudosPostCardProps) {
  return (
    <article
      className="flex flex-col gap-4 rounded-2xl border-4 border-[#FFEA9E]"
      style={{ backgroundColor: "#FFF8E1", padding: "24px 24px 16px 24px" }}
    >
      {/* Sender → Recipient — avatar on top, centered, space-between */}
      <div className="flex items-start justify-between">
        <UserBlock name={kudo.author.name} department={kudo.author.department} avatarUrl={kudo.author.avatar_url} />
        <Image src="/images/kudos/icon-send.svg" alt="" width={32} height={32} className="mt-4 h-8 w-8 shrink-0" aria-hidden="true" />
        <UserBlock name={kudo.recipient.name} department={kudo.recipient.department} avatarUrl={kudo.recipient.avatar_url} />
      </div>

      {/* Divider */}
      <hr className="h-px border-0 bg-[#FFEA9E]" />

      {/* Time */}
      <p className="font-sans text-base font-bold leading-6 text-[#999]">{formatTime(kudo.created_at)}</p>

      {/* Category */}
      {kudo.category && (
        <p className="text-center font-sans text-base font-bold leading-6 text-[#00101A]">{kudo.category}</p>
      )}

      {/* Content — truncate 5 lines, in gold box */}
      <div className="rounded-xl border border-[#FFEA9E] bg-[#FFEA9E66] p-4">
        <p className="line-clamp-5 font-sans text-[20px] font-bold leading-8 text-[#00101A]">{kudo.content}</p>
      </div>

      {/* Images */}
      {kudo.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {kudo.images.map((img, i) => (
            <Image key={i} src={img} alt="" width={80} height={80} className="h-20 w-20 shrink-0 rounded-lg object-cover" />
          ))}
        </div>
      )}

      {/* Hashtags — red bold text */}
      {kudo.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {kudo.hashtags.map((tag, i) => (
            <span key={`${tag}-${i}`} className="font-sans text-base font-bold leading-6 text-[#D4271D]">{tag}</span>
          ))}
        </div>
      )}

      {/* Divider */}
      <hr className="h-px border-0 bg-[#FFEA9E]" />

      {/* Actions: heart count | Copy Link */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="font-sans text-2xl font-bold leading-8 text-[#00101A]">{kudo.hearts_count.toLocaleString()}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-heart-active)" stroke="var(--color-heart-active)" strokeWidth="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <CopyLinkButton kudoId={kudo.id} dictionary={dictionary} variant="light" />
      </div>
    </article>
  );
}
