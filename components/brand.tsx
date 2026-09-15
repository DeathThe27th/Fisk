import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand ${inverse ? "brand--inverse" : ""}`} href="/" aria-label="Fisk home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>Fisk</span>
    </Link>
  );
}
