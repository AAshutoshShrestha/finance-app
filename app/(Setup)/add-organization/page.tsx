/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Setup)/add-organization/page.tsx
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddOrganization() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const create = async () => {
    if (!name) {
      toast.error("Organization name required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/setup/org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success("Organization created");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold">
          Create Organization
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          This will be your workspace
        </p>

        <input
          className="w-full border rounded-lg p-3 mt-6 focus:ring-2 focus:ring-black outline-none"
          placeholder="Organization name"
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={create}
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Organization"}
        </button>
      </div>
    </div>
  );
}