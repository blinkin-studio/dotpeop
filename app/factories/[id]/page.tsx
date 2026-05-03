import { supabase } from "@/lib/supabase";
import type { Factory } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

async function getFactory(id: string): Promise<Factory | null> {
  const { data, error } = await supabase
    .from("factories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function FactoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const factory = await getFactory(id);

  if (!factory) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/factories"
        className="text-sm text-gray-500 hover:text-black transition-colors"
      >
        ← Back to Factories
      </Link>

      <div className="mt-6 border border-gray-200 px-6 py-6">
        <h1 className="text-2xl font-bold">{factory.company_name}</h1>
        <p className="text-gray-500 text-sm mt-1">{factory.country}</p>

        {factory.ai_intro && (
          <div className="mt-6 border-t border-gray-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
              About
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              {factory.ai_intro}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        ID: {factory.id}
      </div>
    </div>
  );
}
