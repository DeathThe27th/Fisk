"use client";
import { PrivyProvider } from "@privy-io/react-auth";

export function Providers({children,appId}:{children:React.ReactNode;appId:string}){
  return <PrivyProvider appId={appId} config={{loginMethods:["email","google"],appearance:{theme:"light",accentColor:"#6357e8",logo:"/icon.svg"},embeddedWallets:{ethereum:{createOnLogin:"off"},solana:{createOnLogin:"off"},showWalletUIs:false}}}>{children}</PrivyProvider>
}
