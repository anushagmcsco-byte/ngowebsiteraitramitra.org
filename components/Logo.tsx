import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function RaitaMitraLogo({ className = "", size = "md" }: LogoProps) {
  // Height scale helper
  const heightClasses = {
    sm: "h-8 sm:h-9",
    md: "h-10 sm:h-11",
    lg: "h-12 sm:h-14"
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${heightClasses} ${className}`}>
      <svg
        viewBox="0 0 540 145"
        className="h-full w-auto max-w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients matching exact logo colors */}
          <linearGradient id="goldTreeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          <linearGradient id="greenLeafDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f721c" />
            <stop offset="100%" stopColor="#1a4207" />
          </linearGradient>

          <linearGradient id="greenLeafBright" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#90d82d" />
            <stop offset="100%" stopColor="#62a212" />
          </linearGradient>
        </defs>

        {/* ======================================= */}
        {/* EMBLEM (LEFT): GOLD TREE & GREEN LEAVES  */}
        {/* ======================================= */}
        <g id="Emblem" transform="translate(10, 5)">
          {/* GOLD SPROUTING TREE BRANCHES */}
          <g id="GoldTree" fill="url(#goldTreeGrad)">
            {/* Center Trunk */}
            <path d="M50 15 L54 15 L53 65 L47 65 Z" />

            {/* Top central seed node */}
            <circle cx="52" cy="10" r="4.5" />

            {/* Branch Level 1 (Top) */}
            <path d="M52 22 L63 16 L65 19 L52 26 Z" />
            <path d="M52 22 L41 16 L39 19 L52 26 Z" />
            <circle cx="65" cy="16" r="3.5" />
            <circle cx="39" cy="16" r="3.5" />

            {/* Vertical tip sprouts off top branches */}
            <path d="M63 16 L63 8 L66 8 L66 16 Z" />
            <path d="M41 16 L41 8 L38 8 L38 16 Z" />
            <circle cx="64.5" cy="6" r="3" />
            <circle cx="39.5" cy="6" r="3" />

            {/* Branch Level 2 (Upper Middle) */}
            <path d="M52 32 L72 22 L74 25 L52 37 Z" />
            <path d="M52 32 L32 22 L30 25 L52 37 Z" />
            <circle cx="74" cy="22" r="3.5" />
            <circle cx="30" cy="22" r="3.5" />

            <path d="M72 22 L72 12 L75 12 L75 22 Z" />
            <path d="M32 22 L32 12 L29 12 L29 22 Z" />
            <circle cx="73.5" cy="10" r="3" />
            <circle cx="30.5" cy="10" r="3" />

            {/* Branch Level 3 (Lower Middle) */}
            <path d="M52 43 L81 29 L84 32 L52 48 Z" />
            <path d="M52 43 L23 29 L20 32 L52 48 Z" />
            <circle cx="83" cy="29" r="3.5" />
            <circle cx="21" cy="29" r="3.5" />

            <path d="M81 29 L81 18 L84 18 L84 29 Z" />
            <path d="M23 29 L23 18 L20 18 L20 29 Z" />
            <circle cx="82.5" cy="16" r="3" />
            <circle cx="21.5" cy="16" r="3" />

            {/* Branch Level 4 (Bottom) */}
            <path d="M52 54 L89 38 L92 41 L52 59 Z" />
            <path d="M52 54 L15 38 L12 41 L52 59 Z" />
            <circle cx="91" cy="38" r="3.5" />
            <circle cx="13" cy="38" r="3.5" />

            <path d="M89 38 L89 26 L92 26 L92 38 Z" />
            <path d="M15 38 L15 26 L12 26 L12 38 Z" />
            <circle cx="90.5" cy="24" r="3" />
            <circle cx="13.5" cy="24" r="3" />
          </g>

          {/* GREEN BOTTOM LEAVES */}
          <g id="GreenLeaves" transform="translate(0, 50)">
            {/* Outer Left Leaf */}
            <path
              d="M52 35 C30 20 5 22 2 45 C25 60 48 48 52 35 Z"
              fill="url(#greenLeafDark)"
              stroke="#2e5910"
              strokeWidth="1.5"
            />
            <path
              d="M52 35 C33 24 12 25 8 42 C26 53 46 45 52 35 Z"
              fill="url(#greenLeafBright)"
            />

            {/* Outer Right Leaf */}
            <path
              d="M52 35 C74 20 99 22 102 45 C79 60 56 48 52 35 Z"
              fill="url(#greenLeafDark)"
              stroke="#2e5910"
              strokeWidth="1.5"
            />
            <path
              d="M52 35 C71 24 92 25 96 42 C78 53 58 45 52 35 Z"
              fill="url(#greenLeafBright)"
            />

            {/* Center Left Leaf */}
            <path
              d="M52 38 C35 32 15 45 10 65 C32 75 48 55 52 38 Z"
              fill="url(#greenLeafDark)"
              stroke="#224709"
              strokeWidth="1.5"
            />
            <path
              d="M52 38 C38 35 22 47 16 62 C34 70 47 53 52 38 Z"
              fill="url(#greenLeafBright)"
            />

            {/* Center Right Leaf */}
            <path
              d="M52 38 C69 32 89 45 94 65 C72 75 56 55 52 38 Z"
              fill="url(#greenLeafDark)"
              stroke="#224709"
              strokeWidth="1.5"
            />
            <path
              d="M52 38 C66 35 82 47 88 62 C70 70 57 53 52 38 Z"
              fill="url(#greenLeafBright)"
            />

            {/* Middle Upward Sprout Leaf */}
            <path
              d="M52 28 C45 42 40 58 52 70 C64 58 59 42 52 28 Z"
              fill="#82c71f"
              stroke="#3a6a12"
              strokeWidth="1"
            />
            <path
              d="M52 28 Q52 70 52 70"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        </g>

        {/* ======================================= */}
        {/* TYPOGRAPHY (RIGHT): RAITA MITRA          */}
        {/* ======================================= */}
        <g id="LogoText" transform="translate(125, 0)">
          {/* RAITA - Bold Serif Typography in Black */}
          <text
            x="0"
            y="75"
            fill="#000000"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="900"
            fontSize="68"
            letterSpacing="-1.5"
          >
            Raita
          </text>

          {/* MITRA - Bold Serif Typography in Bright Leaf Green */}
          <text
            x="170"
            y="75"
            fill="#81c422"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="900"
            fontSize="68"
            letterSpacing="-1.5"
          >
            Mitra
          </text>

          {/* SUBTEXT: Social Trust® with horizontal accent lines */}
          <g transform="translate(0, 115)">
            {/* Left accent line */}
            <line x1="10" y1="-8" x2="105" y2="-8" stroke="#a3e635" strokeWidth="1" />

            {/* Social Trust® */}
            <text
              x="200"
              y="0"
              fill="#000000"
              fontFamily="Courier, Monaco, monospace, sans-serif"
              fontWeight="800"
              fontSize="22"
              letterSpacing="5"
              textAnchor="middle"
            >
              Social Trust®
            </text>

            {/* Right accent line */}
            <line x1="295" y1="-8" x2="390" y2="-8" stroke="#a3e635" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default RaitaMitraLogo;
