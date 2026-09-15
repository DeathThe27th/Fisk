import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import "./extended.css";
import "./redesign.css";
import "@designcodeio/threeui/style.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Fisk — AI Market Intelligence",
  description: "Evidence-led market research for US equities and their tokenized counterparts.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  icons: { icon: "/icon.svg" },
  openGraph: { title: "Fisk — See what the market is missing", description: "AI market intelligence with evidence, counterarguments, and human final control.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><Providers appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}>{children}</Providers></body>
    </html>
  );
}
