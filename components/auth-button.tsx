"use client";
import { useAuth as usePrivy } from "@/components/auth-context";

export function AuthButton({className=""}:{className?:string}){const{ready,authenticated,login,logout,user}=usePrivy();if(!ready)return<button className={className} disabled>Loading…</button>;return authenticated?<button className={className} onClick={logout} title={user?.email?.address}>Sign out</button>:<button className={className} onClick={login}>Sign in</button>}
