import Link from "next/link";
import { Brand } from "@/components/brand";
import { AuthButton } from "@/components/auth-button";
export function AccountShell({children}:{children:React.ReactNode}){return <main className="account-page"><nav className="nav shell"><Brand/><div className="nav-links"><Link href="/desk">Research desk</Link><Link href="/stock/NVDA">Markets</Link></div><AuthButton className="account-auth"/></nav><div className="shell">{children}</div></main>}
