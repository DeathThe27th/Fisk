"use client";
import Link from "next/link";
import { useAuth as usePrivy } from "@/components/auth-context";
import { Brand } from "@/components/brand";
import { ArrowUpRight, ShieldCheck } from "@/components/icons";

export default function Login(){const{ready,authenticated,login}=usePrivy();return <main className="login-page"><nav className="nav shell"><Brand/><Link href="/">Back to market pulse</Link></nav><section className="login-sheet"><div className="login-aperture"><span/><span/><span/></div><h1>{authenticated?"You’re signed in.":"Let Fisk remember."}</h1><p>Save research, personalize your newsroom, and return to decisions with the original evidence intact.</p><button onClick={authenticated?undefined:login} disabled={!ready||authenticated}>{authenticated?"Account connected":"Continue with email or Google"}<ArrowUpRight size={17}/></button><small><ShieldCheck size={14}/> No wallet. No custody. No trading access.</small>{authenticated&&<Link className="button button-dark" href="/desk">Open your desk <ArrowUpRight size={15}/></Link>}</section></main>}
