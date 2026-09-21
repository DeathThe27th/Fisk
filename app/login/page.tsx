"use client";
import Link from "next/link";
import { useAuth as usePrivy } from "@/components/auth-context";
import { FiskCatMark } from "@/components/fisk-cat";
import { Brand } from "@/components/brand";
import { ArrowUpRight, ShieldCheck } from "@/components/icons";

export default function Login(){const{ready,authenticated,login}=usePrivy();return <main className="login-page"><nav className="nav shell"><Brand/><Link href="/">Back to Fisk</Link></nav><section className="login-sheet"><div className="login-aperture"><FiskCatMark/></div><h1>{authenticated?"You’re signed in.":"Make yourself at home."}</h1><p>Save research, personalize your newsroom, and return to the original evidence. A familiar spot for a curious mind.</p>{authenticated?<p className="login-connection-status" role="status">Account connected</p>:<button onClick={login} disabled={!ready}>Continue with email or Google<ArrowUpRight size={17}/></button>}<small><ShieldCheck size={14}/> No wallet. No custody. No trading access.</small>{authenticated&&<Link className="button button-dark" href="/desk">Open your desk <ArrowUpRight size={15}/></Link>}</section></main>}
