"use client";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { AuthContext } from "@/components/auth-context";

function PrivyAuthBridge({children}:{children:React.ReactNode}) {
  const auth = usePrivy();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function Providers({children,appId}:{children:React.ReactNode;appId?:string}){
  if (!appId) return children;
  return <PrivyProvider appId={appId} config={{loginMethods:["email","google"],appearance:{theme:"light",accentColor:"#343434",logo:"/icon.svg"},embeddedWallets:{ethereum:{createOnLogin:"off"},solana:{createOnLogin:"off"},showWalletUIs:false}}}><PrivyAuthBridge>{children}</PrivyAuthBridge></PrivyProvider>
}
