import { Clock3 } from "@/components/icons";

const tape = [
  ["S&P 500", "5,842.21", "+0.38%", "up"],
  ["NVDA", "$138.85", "+1.74%", "up"],
  ["BTC", "$68,420", "−0.42%", "down"],
  ["NVDA rToken", "$139.02", "+0.12%", "up"],
];

export function MarketRibbon({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`market-ribbon ${dark ? "market-ribbon--dark" : ""}`}>
      <div className="session-state"><i /> <span>US market closed</span><b>rTokens trading 24/7</b></div>
      <div className="tape" aria-label="Illustrative market snapshot">
        {tape.map(([name, price, change, direction]) => <span key={name}><b>{name}</b> <em>{price}</em> <i className={direction}>{change}</i></span>)}
      </div>
      <div className="freshness"><Clock3 size={13} /> Demo snapshot</div>
    </div>
  );
}
