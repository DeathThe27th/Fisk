import Link from "next/link";
import { Brand } from "@/components/brand";
import { AuthButton } from "@/components/auth-button";
import { DeskWorkspace, type DiscoveryStock } from "@/components/desk-workspace";
import { getRwaStocks } from "@/lib/providers/bitget";
import { FiskCornerCameo } from "@/components/fisk-corner-cameo";

export const dynamic="force-dynamic";
const catalog:DiscoveryStock[]=[
  {ticker:"NVDA",name:"NVIDIA",sector:"Technology"},{ticker:"AAPL",name:"Apple",sector:"Technology"},{ticker:"MSFT",name:"Microsoft",sector:"Technology"},{ticker:"GOOGL",name:"Alphabet",sector:"Technology"},
  {ticker:"AMZN",name:"Amazon",sector:"Consumer"},{ticker:"META",name:"Meta Platforms",sector:"Technology"},{ticker:"TSLA",name:"Tesla",sector:"Consumer"},{ticker:"AMD",name:"Advanced Micro Devices",sector:"Technology"},
  {ticker:"INTC",name:"Intel",sector:"Technology"},{ticker:"NFLX",name:"Netflix",sector:"Consumer"},{ticker:"JPM",name:"JPMorgan Chase",sector:"Finance"},{ticker:"BAC",name:"Bank of America",sector:"Finance"},
  {ticker:"V",name:"Visa",sector:"Finance"},{ticker:"KO",name:"Coca-Cola",sector:"Consumer"},{ticker:"PFE",name:"Pfizer",sector:"Healthcare"},{ticker:"XOM",name:"Exxon Mobil",sector:"Energy"},
  {ticker:"CVX",name:"Chevron",sector:"Energy"},{ticker:"COIN",name:"Coinbase",sector:"Crypto-linked"}
];

export default async function Desk({searchParams}:{searchParams:Promise<{q?:string;stock?:string}>}){
  const{q="",stock}=await searchParams;
  const[rwa]=await Promise.allSettled([getRwaStocks()]);
  const providerStocks=rwa.status==="fulfilled"?rwa.value.value:[];
  const stocks=catalog.map(stock=>{const match=providerStocks.find(item=>item.ticker===stock.ticker);return{...stock,name:match?.name||stock.name,icon:match?.icon,freshness:rwa.status==="fulfilled"?(rwa.value.cached?"Cached · Bitget Wallet":"Bitget Wallet RWA"):"Market data unavailable"}});
  return <main className="fisk-desk"><header className="fisk-desk-nav"><Brand/><nav aria-label="Desk navigation"><Link className="active" href="/desk">Desk</Link><Link href="/watchlist">Watchlist</Link><Link href="/journal">Journal</Link><Link href="/methodology">Methodology</Link></nav><div className="desk-nav-actions"><AuthButton className="desk-signin"/></div></header><DeskWorkspace initialQuestion={q} initialStock={stock?.toUpperCase()} stocks={stocks}/><FiskCornerCameo /></main>;
}
