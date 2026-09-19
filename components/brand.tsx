import Link from "next/link";
import { FiskCatMark } from "@/components/fisk-cat";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand ${inverse ? "brand--inverse" : ""}`} href="/" aria-label="Fisk home">
      <FiskCatMark className="brand-mark" accent={inverse}/>
      <span>FISK</span>
    </Link>
  );
}
