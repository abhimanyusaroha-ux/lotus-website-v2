import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investor Portal · Lotus Property Group",
};

export default function Investors() {
  return (
    <main className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6">
        <p className="caption font-sans text-gray-600 uppercase mb-6">
          By invitation only
        </p>
        <h1 className="display-md font-sans font-bold text-ink text-center max-w-[480px]">
          Investor Portal
        </h1>
        <p className="body-md font-sans text-gray-600 text-center max-w-[400px] mt-6">
          The investor portal is open to current partners. If you're not in yet and would like to be considered, please reach out through the <Link href="/contact" className="text-ink underline underline-offset-2 decoration-[1px] hover:decoration-2 transition-all duration-150">contact page</Link>. We work with a small group and add new partners carefully.
        </p>
        <div className="mt-12">
          <Link
            href="/"
            className="body-sm font-sans text-ink underline underline-offset-2 decoration-[1px] hover:decoration-2 transition-all duration-150"
          >
            ← Back to home
          </Link>
        </div>
    </main>
  );
}
