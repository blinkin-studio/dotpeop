import { supabase } from "@/lib/supabase";
import type { Factory } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 0;

async function getFactories(): Promise<Factory[]> {
  const { data, error } = await supabase
    .from("factories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching factories:", error.message);
    return [];
  }

  return data ?? [];
}

export default async function FactoriesPage() {
  const factories = await getFactories();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Factories</h1>
        <Link
          href="/register-factory"
          className="border border-black px-3 py-1.5 text-sm font-medium hover:bg-black hover:text-white transition-colors"
        >
          + Register
        </Link>
      </div>

      {factories.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No factories registered yet.{" "}
          <Link href="/register-factory" className="underline">
            Register one now.
          </Link>
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {factories.map((factory) => (
            <li key={factory.id}>
              <Link
                href={`/factories/${factory.id}`}
                className="block border border-gray-200 px-4 py-3 hover:border-black transition-colors"
              >
                <p className="font-medium text-sm">{factory.company_name}</p>
                <p className="text-gray-500 text-sm mt-0.5">{factory.country}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
