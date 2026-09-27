interface SearchProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
}

export default function Search({
  size = 25,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: SearchProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15 15L21 21" />
    </svg>
  );
}
