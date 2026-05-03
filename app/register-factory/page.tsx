"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";

export default function RegisterFactory() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!companyName.trim() || !country.trim()) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase.from("factories").insert([
      {
        id: uuidv4(),
        company_name: companyName.trim(),
        country: country.trim(),
      },
    ]);

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.push("/factories");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Register Factory</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <div className="flex flex-col gap-1">
          <label htmlFor="company_name" className="text-sm font-medium">
            Company Name
          </label>
          <input
            id="company_name"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Acme Manufacturing"
            className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. South Korea"
            className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="border border-black px-4 py-2 text-sm font-medium bg-black text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-fit"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
