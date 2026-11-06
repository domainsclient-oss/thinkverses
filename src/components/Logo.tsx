import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo/footer-logo.webp";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Thinkverses Solutions home">
      <Image src={logo} alt="Thinkverses" priority className="h-14 w-auto" sizes="176px" />
    </Link>
  );
}

export function FooterLogo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Thinkverses Solutions home">
      <Image src={logo} alt="Thinkverses" className="h-16 w-auto" sizes="200px" />
    </Link>
  );
}
