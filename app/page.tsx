import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dotpeop</h1>
      <p className="text-gray-500 mb-8 text-sm">Factory registration platform</p>
      <nav className="flex flex-col gap-3">
        <Link
          href="/register-factory"
          className="inline-block border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors w-fit"
        >
          Register Factory
        </Link>
        <Link
          href="/factories"
          className="inline-block border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors w-fit"
        >
          View Factories
        </Link>
      </nav>
    </div>
  );
}
