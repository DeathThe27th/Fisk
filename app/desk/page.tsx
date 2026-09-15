import { Brand } from "@/components/brand";
import { AuthButton } from "@/components/auth-button";
import { Search } from "@/components/icons";
import { MarketRibbon } from "@/components/market-ribbon";
import { ResearchWorkbench } from "@/components/research-workbench";

const watches=[["NVDA","$199.34","+1.74%"],["TSLA","$421.18","−0.61%"],["AAPL","$238.24","+0.22%"],["COIN","$312.90","+2.06%"]];
export default async function Desk({searchParams}:{searchParams:Promise<{q?:string}>}){const{q}=await searchParams;const question=q||"How exposed is NVDA to this weekend’s semiconductor news, what is the market pricing in, and what would invalidate the bullish thesis?";return <main className="desk"><header className="desk-topbar"><Brand inverse/><div className="desk-symbol"><Search size={14}/><b>NVDA</b><span>NVIDIA Corporation</span></div><div className="desk-actions"><button>Share research</button><AuthButton/></div></header><MarketRibbon dark/><div className="desk-grid"><aside className="desk-rail"><h2>WATCHLIST</h2>{watches.map(([ticker,price,delta],i)=><div className={`watch-item ${i===0?"active":""}`} key={ticker}><b>{ticker}</b><span>{price}</span><em className={delta.startsWith("+")?"up":"down"}>{delta}</em></div>)}<h2 style={{marginTop:36}}>RESEARCH LENS</h2><div className="lens-note">Weekend catalyst<br/><span>Underlying + rToken</span></div></aside><ResearchWorkbench initialQuery={question}/></div></main>}
