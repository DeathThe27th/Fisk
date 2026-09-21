import { PhotographicHero, SourceStrip, ProductIntroduction, CapabilityPanels, FaqSection, Newsroom, ClosingInvitation } from "@/components/landing/editorial";
import { getCompanyNews } from "@/lib/providers/finnhub";
export const revalidate=600;
export default async function Home(){
  const now=new Date();
  const feed=await getCompanyNews("NVDA",new Date(now.getTime()-10*864e5).toISOString().slice(0,10),now.toISOString().slice(0,10));
  return <main className="editorial-site" id="top"><PhotographicHero/><SourceStrip/><ProductIntroduction/><CapabilityPanels/><FaqSection/><Newsroom news={feed.items} error={feed.error}/><ClosingInvitation/></main>;
}
