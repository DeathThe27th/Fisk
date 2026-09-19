"use client";
import { useSyncExternalStore } from "react";
import { useAuth as usePrivy } from "@/components/auth-context";

const subscribe=()=>()=>{};
export function AuthButton({className="",authenticatedOnly=false}:{className?:string;authenticatedOnly?:boolean}){const mounted=useSyncExternalStore(subscribe,()=>true,()=>false);const{ready,authenticated,login,logout,user}=usePrivy();if(authenticatedOnly&&(!mounted||!authenticated))return null;if(!mounted||!ready)return<button className={className} disabled>Loading…</button>;return authenticated?<button className={className} onClick={logout} title={user?.email?.address}>Sign out</button>:<button className={className} onClick={login}>Sign in</button>}
