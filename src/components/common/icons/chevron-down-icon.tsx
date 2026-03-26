interface ChevronDownIconProps {
  open?: boolean;
  className?: string;
}

export function ChevronDownIcon({ open, className }: ChevronDownIconProps) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-150 ease-out ${open ? "rotate-180" : ""} ${className ?? ""}`}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
