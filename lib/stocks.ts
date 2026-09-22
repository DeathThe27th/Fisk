export type StockSector = "Technology" | "Finance" | "Consumer" | "Healthcare" | "Energy" | "Crypto-linked";

export type StockRegistryEntry = {
  ticker: string;
  companyName: string;
  sector: StockSector;
  logoPath: string;
};

export const STOCK_REGISTRY: StockRegistryEntry[] = [
  { ticker: "NVDA", companyName: "NVIDIA", sector: "Technology", logoPath: "/assets/stocks/nvidia.svg" },
  { ticker: "AAPL", companyName: "Apple", sector: "Technology", logoPath: "/assets/stocks/apple.svg" },
  { ticker: "MSFT", companyName: "Microsoft", sector: "Technology", logoPath: "/assets/stocks/microsoft.svg" },
  { ticker: "GOOGL", companyName: "Alphabet", sector: "Technology", logoPath: "/assets/stocks/google.svg" },
  { ticker: "AMZN", companyName: "Amazon", sector: "Consumer", logoPath: "/assets/stocks/amazon.svg" },
  { ticker: "META", companyName: "Meta Platforms", sector: "Technology", logoPath: "/assets/stocks/meta.svg" },
  { ticker: "TSLA", companyName: "Tesla", sector: "Consumer", logoPath: "/assets/stocks/tesla.svg" },
  { ticker: "AMD", companyName: "Advanced Micro Devices", sector: "Technology", logoPath: "/assets/stocks/amd.svg" },
  { ticker: "INTC", companyName: "Intel", sector: "Technology", logoPath: "/assets/stocks/intel.svg" },
  { ticker: "NFLX", companyName: "Netflix", sector: "Consumer", logoPath: "/assets/stocks/netflix.svg" },
  { ticker: "JPM", companyName: "JPMorgan Chase", sector: "Finance", logoPath: "/assets/stocks/jpmorgan.svg" },
  { ticker: "BAC", companyName: "Bank of America", sector: "Finance", logoPath: "/assets/stocks/bankofamerica.svg" },
  { ticker: "V", companyName: "Visa", sector: "Finance", logoPath: "/assets/stocks/visa.svg" },
  { ticker: "KO", companyName: "Coca-Cola", sector: "Consumer", logoPath: "/assets/stocks/cocacola.svg" },
  { ticker: "PFE", companyName: "Pfizer", sector: "Healthcare", logoPath: "/assets/stocks/pfizer.svg" },
  { ticker: "XOM", companyName: "Exxon Mobil", sector: "Energy", logoPath: "/assets/stocks/exxonmobil.svg" },
  { ticker: "CVX", companyName: "Chevron", sector: "Energy", logoPath: "/assets/stocks/chevron.svg" },
  { ticker: "COIN", companyName: "Coinbase", sector: "Crypto-linked", logoPath: "/assets/stocks/coinbase.svg" },
];

export function getStockDefinition(ticker: string) {
  return STOCK_REGISTRY.find((stock) => stock.ticker === ticker.toUpperCase()) ?? null;
}

export function tickerMonogram(ticker: string) {
  return ticker.slice(0, 2).toUpperCase();
}
