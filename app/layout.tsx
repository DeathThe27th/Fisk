import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import "./extended.css";
import "./redesign.css";
import "./editorial.css";
import "./desk-discovery.css";
import "./stock-research.css";
import "./account.css";
import "./performance.css";
import { Providers } from "@/components/providers";
import { FiskRouteTransition } from "@/components/fisk-route-transition";

export const metadata: Metadata = {
  title: "Fisk — Your real-time research partner",
  description: "Fisk connects live market context, reporting, filings, and your own documents into a cited research answer.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  icons: { icon: "/icon.svg?v=2" },
  openGraph: { title: "Fisk — Your real-time research partner", description: "AI research with evidence, counterarguments, and useful next steps. You make the final call.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><Providers appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}>{children}<FiskRouteTransition /></Providers></body>
    </html>
  );
}
