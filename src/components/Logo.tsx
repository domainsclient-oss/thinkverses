import Image from "next/image";
import Link from "next/link";
import headerLogo from "../../public/logo/header-logo.webp";
import footerLogo from "../../public/logo/footer-logo.webp";

export function Logo() {
  return (
    <Link href="/#top" className="inline-flex items-center" aria-label="Thinkverses Solutions home">
      <Image src={headerLogo} alt="Thinkverses" priority className="h-14 w-auto" sizes="168px" />
    </Link>
  );
}

export function FooterLogo() {
  return (
    <Link href="/#top" className="inline-flex items-center" aria-label="Thinkverses Solutions home">
      <Image src={footerLogo} alt="Thinkverses" className="h-16 w-auto" sizes="200px" />
    </Link>
  );
}
