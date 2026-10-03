import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page flex min-h-[70vh] flex-col items-start justify-center gap-4 pt-24">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">This page isn&apos;t part of the build.</h1>
      <Link href="/" className="text-cyan underline underline-offset-4">Go back home</Link>
    </section>
  );
}
