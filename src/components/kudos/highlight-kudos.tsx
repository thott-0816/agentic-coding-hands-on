"use client";

import { useState, useMemo } from "react";
import { HighlightHeader } from "@/components/kudos/highlight-header";
import { KudosCarousel } from "@/components/kudos/kudos-carousel";
import { hashtags } from "@/data/hashtags";
import { departments } from "@/data/departments";
import type { Kudo } from "@/types/kudos";
import type { Dictionary } from "@/types/i18n";

interface HighlightKudosProps {
  kudos: Kudo[];
  dictionary: Dictionary;
}

export function HighlightKudos({ kudos, dictionary }: HighlightKudosProps) {
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const filteredKudos = useMemo(() => {
    let result = kudos;

    // Filter by hashtag (match if card has any hashtag containing the selected name)
    if (selectedHashtag) {
      const tag = hashtags.find((h) => h.id === selectedHashtag);
      if (tag) {
        const tagName = `#${tag.name}`;
        result = result.filter((k) => k.hashtags.some((h) => h === tagName));
      }
    }

    // Filter by department (match if author OR recipient belongs to selected dept)
    if (selectedDepartment) {
      const dept = departments.find((d) => d.id === selectedDepartment);
      if (dept) {
        result = result.filter(
          (k) => k.author.department === dept.name || k.recipient.department === dept.name
        );
      }
    }

    // Sort by hearts descending, take top 5
    return result.sort((a, b) => b.hearts_count - a.hearts_count).slice(0, 5);
  }, [kudos, selectedHashtag, selectedDepartment]);

  return (
    <section className="flex flex-col gap-16">
      <HighlightHeader
        dictionary={dictionary}
        selectedHashtag={selectedHashtag}
        selectedDepartment={selectedDepartment}
        onHashtagChange={setSelectedHashtag}
        onDepartmentChange={setSelectedDepartment}
        onClearFilters={() => {
          setSelectedHashtag(null);
          setSelectedDepartment(null);
        }}
      />
      {filteredKudos.length > 0 ? (
        <KudosCarousel kudos={filteredKudos} dictionary={dictionary} />
      ) : (
        <p className="py-10 text-center text-white/50">{dictionary["kudos.filterEmpty"]}</p>
      )}
    </section>
  );
}
