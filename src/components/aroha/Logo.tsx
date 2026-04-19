type Props = { size?: number; className?: string };

export const AromaLogo = ({ size = 44, className = "" }: Props) => (
  <div
    className={`relative inline-flex items-center justify-center rounded-2xl shadow-glow ${className}`}
    style={{ width: size, height: size, background: "var(--gradient-sunrise)" }}
    aria-hidden="true"
  >
    {/* inner glow */}
    <div className="absolute inset-1 rounded-[14px] bg-white/25 backdrop-blur-sm" />
    <svg
      viewBox="0 0 48 48"
      width={size * 0.66}
      height={size * 0.66}
      className="relative z-10"
      fill="none"
    >
      {/* horizon */}
      <path
        d="M6 32 Q24 18 42 32"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* sun rays */}
      <circle cx="24" cy="30" r="5" fill="white" opacity="0.95" />
      {/* leaf */}
      <path
        d="M24 22 C24 16 28 13 32 12 C32 16 30 20 24 22 Z"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M24 22 L24 14"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  </div>
);
