export default function CrossLines({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2576 1449"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    >
      <line
        x1="130"
        y1="0"
        x2="1272"
        y2="1449"
        stroke="#E8E8E8"
        strokeWidth="3"
      />
      <line
        x1="457"
        y1="1449"
        x2="2576"
        y2="76"
        stroke="#E8E8E8"
        strokeWidth="3"
      />
    </svg>
  );
}
