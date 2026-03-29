"use client";

interface FilterDropdownItem {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  items: FilterDropdownItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FilterDropdown({ items, selectedId, onSelect }: FilterDropdownProps) {
  return (
    <div
      role="listbox"
      className="kudos-scrollbar flex min-w-fit max-h-[400px] flex-col overflow-y-auto rounded-lg border border-[var(--color-card-border)] bg-[var(--color-section-bg)] p-1.5"
    >
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        return (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelect(item.id)}
            className={`cursor-pointer whitespace-nowrap rounded px-4 py-4 text-left font-sans text-base font-bold leading-6 tracking-[0.5px] text-white transition-colors hover:bg-[rgba(255,234,158,0.1)] ${
              isSelected ? "bg-[rgba(255,234,158,0.1)]" : ""
            }`}
            style={isSelected ? { textShadow: "0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287" } : undefined}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
