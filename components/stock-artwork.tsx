"use client";

import type { CSSProperties } from "react";

const palettes: Record<string, { from: string; to: string; accent: string; ink: string }> = {
  NVDA: { from: "#dff5bc", to: "#6cae42", accent: "#1d5a32", ink: "#103722" },
  AAPL: { from: "#e9edf3", to: "#7f8b9a", accent: "#ffffff", ink: "#202b3b" },
  MSFT: { from: "#d9ecff", to: "#6794e8", accent: "#f5b341", ink: "#183a76" },
  GOOGL: { from: "#fff0d7", to: "#e6a25d", accent: "#4285f4", ink: "#663814" },
  AMZN: { from: "#f7dfb5", to: "#ce7f37", accent: "#172337", ink: "#513013" },
  META: { from: "#e1dbff", to: "#7565dc", accent: "#35a7f0", ink: "#31267f" },
  TSLA: { from: "#ffe0e2", to: "#dd6670", accent: "#ffffff", ink: "#7b1b2d" },
  AMD: { from: "#f2ddd7", to: "#b95b4b", accent: "#ffffff", ink: "#632820" },
  INTC: { from: "#d7f1ee", to: "#4ba5ac", accent: "#e9ffff", ink: "#175862" },
  NFLX: { from: "#ffdfe4", to: "#d92b4b", accent: "#ffffff", ink: "#731226" },
  JPM: { from: "#d8e8ff", to: "#467ac7", accent: "#ffffff", ink: "#183e79" },
  BAC: { from: "#d9e7ff", to: "#5b85cb", accent: "#ffffff", ink: "#1b3e78" },
  V: { from: "#e4e9ff", to: "#6576db", accent: "#f7b942", ink: "#253579" },
  KO: { from: "#ffe2e2", to: "#d46a71", accent: "#ffffff", ink: "#7b1f2c" },
  PFE: { from: "#d8f0ff", to: "#5ba3d1", accent: "#ffffff", ink: "#1a4b6c" },
  XOM: { from: "#ffe5c8", to: "#d98242", accent: "#ffffff", ink: "#6f3519" },
  CVX: { from: "#fff0c9", to: "#d9a448", accent: "#ffffff", ink: "#6d4818" },
  COIN: { from: "#d8e9ff", to: "#4e8ce0", accent: "#ffffff", ink: "#173c78" },
};

export function StockArtwork({ ticker, name, icon }: { ticker: string; name: string; icon?: string }) {
  const palette = palettes[ticker] ?? { from: "#eaf0ff", to: "#7395e6", accent: "#ffffff", ink: "#173477" };
  const safeTicker = ticker.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return <div className="stock-artwork" style={{ "--art-from": palette.from, "--art-to": palette.to, "--art-accent": palette.accent, "--art-ink": palette.ink } as CSSProperties} role="img" aria-label={`${name} visual`}>
    <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`art-gradient-${safeTicker}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={palette.from} /><stop offset="1" stopColor={palette.to} /></linearGradient>
        <filter id={`art-shadow-${safeTicker}`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor={palette.ink} floodOpacity=".2" /></filter>
      </defs>
      <rect width="640" height="420" fill={`url(#art-gradient-${safeTicker})`} />
      <circle cx="540" cy="-20" r="210" fill={palette.accent} opacity=".18" />
      <circle cx="-30" cy="386" r="190" fill={palette.accent} opacity=".12" />
      <path d="M-30 346C90 242 142 366 260 274s176-126 410-46" fill="none" stroke={palette.accent} strokeOpacity=".42" strokeWidth="2" />
      <path d="M-18 366C104 260 152 384 270 292s178-124 394-44" fill="none" stroke={palette.ink} strokeOpacity=".12" strokeWidth="1" />
      <g fill="none" stroke={palette.accent} strokeOpacity=".28">
        <path d="M370 36h220M402 64h188M434 92h156" />
        <path d="M492 20v156M528 20v156M564 20v156" />
      </g>
      <g filter={`url(#art-shadow-${safeTicker})`} transform="rotate(-8 320 216)">
        <rect x="202" y="112" width="236" height="188" rx="30" fill={palette.accent} fillOpacity=".72" />
        <rect x="222" y="132" width="196" height="148" rx="22" fill={palette.ink} fillOpacity=".82" />
        <text x="320" y="225" fill={palette.accent} textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="56" fontWeight="800" letterSpacing="-4">{ticker}</text>
        <path d="M260 246h120" stroke={palette.accent} strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
    {icon && <img className="stock-artwork-logo" src={icon} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
  </div>;
}
