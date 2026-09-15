import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand ${inverse ? "brand--inverse" : ""}`} href="/" aria-label="Fisk home">
      <svg className="brand-mark" aria-hidden="true" viewBox="0 0 28 28" fill="none"><rect x="1" y="1" width="26" height="26" rx="8"/><path d="M9 20V8h10M9 13h8"/><circle cx="19" cy="20" r="1.5" fill="currentColor" stroke="none"/></svg>
      <span>FISK</span>
    </Link>
  );
}
