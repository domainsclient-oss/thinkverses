import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink pt-24 text-white">
      <div className="absolute inset-0 -z-10 bg-blueprint" aria-hidden="true" />
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <h1 className="display h-hero">This page has no twin.</h1>
        <p className="lede mt-6 text-white/70">The address may have changed or been mistyped. Head back home or contact our team.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/#contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
