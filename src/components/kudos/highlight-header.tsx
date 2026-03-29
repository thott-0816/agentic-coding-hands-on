"use client";

import { SectionHeader } from "@/components/kudos/section-header";
import { FilterButton } from "@/components/kudos/filter-button";
import { hashtags } from "@/data/hashtags";
import { departments } from "@/data/departments";
import type { Dictionary } from "@/types/i18n";

interface HighlightHeaderProps {
  dictionary: Dictionary;
  selectedHashtag: string | null;
  selectedDepartment: string | null;
  onHashtagChange: (id: string | null) => void;
  onDepartmentChange: (id: string | null) => void;
  onClearFilters: () => void;
}

export function HighlightHeader({ dictionary, selectedHashtag, selectedDepartment, onHashtagChange, onDepartmentChange, onClearFilters }: HighlightHeaderProps) {
  const hashtagItems = hashtags.map((h) => ({ id: h.id, label: `#${h.name}` }));
  const departmentItems = departments.map((d) => ({ id: d.id, label: d.name }));
  const hasActiveFilter = selectedHashtag !== null || selectedDepartment !== null;

  return (
    <SectionHeader title={dictionary["kudos.highlight.title"]}>
      <div className="flex-1 xl:flex-none">
        <FilterButton
          label={dictionary["kudos.highlight.filterHashtag"]}
          items={hashtagItems}
          selectedId={selectedHashtag}
          onSelect={onHashtagChange}
        />
      </div>
      <div className="flex-1 xl:flex-none">
        <FilterButton
          label={dictionary["kudos.highlight.filterDepartment"]}
          items={departmentItems}
          selectedId={selectedDepartment}
          onSelect={onDepartmentChange}
        />
      </div>
      <button
        type="button"
        onClick={onClearFilters}
        disabled={!hasActiveFilter}
        className="flex h-[50px] shrink-0 cursor-pointer items-center rounded-lg border border-[var(--color-text-gold)] px-4 font-sans text-base font-normal leading-6 text-[var(--color-text-gold)] transition-colors hover:bg-[rgba(255,234,158,0.1)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        {dictionary["kudos.filter.clear"]}
      </button>
    </SectionHeader>
  );
}
