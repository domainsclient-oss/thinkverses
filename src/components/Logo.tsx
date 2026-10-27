import Image from "next/image";
import Link from "next/link";
import headerLogo from "../../public/logo/header-logo.webp";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Thinkverses Solutions home">
      <Image src={headerLogo} alt="Thinkverses" priority className="h-14 w-auto" sizes="168px" />
    </Link>
  );
}

export function FooterLogo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Thinkverses Solutions home">
      <Image src={headerLogo} alt="Thinkverses" className="h-16 w-auto" sizes="192px" />
    </Link>
  );
}
