"use client";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { AuthContext } from "@/components/auth-context";

function PrivyAuthBridge({children}:{children:React.ReactNode}) {
  const auth = usePrivy();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function Providers({children,appId}:{children:React.ReactNode;appId?:string}){
  if (!appId?.startsWith("cl") || appId.length < 20) return children;
  return <PrivyProvider appId={appId} config={{loginMethods:["email","google"],appearance:{theme:"light",accentColor:"#6357e8",logo:"/icon.svg"},embeddedWallets:{ethereum:{createOnLogin:"off"},solana:{createOnLogin:"off"},showWalletUIs:false}}}><PrivyAuthBridge>{children}</PrivyAuthBridge></PrivyProvider>
}
