"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UseForm from "./UseForm";
import { createKategori } from "@/service/api";
import { Kategori } from "@/types/kategori.type";

const AddKategoriPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (kategori: Omit<Kategori, "kategori_id">) => {
    try {
      setLoading(true);
      setError(null);

      await createKategori(kategori);

      router.push("/dashboard/admin/kategori");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tambah Kategori</h2>
      {error && <p className="text-red-500">{error}</p>}
      <UseForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/kategori")}
        disabled={loading}
      />
      {loading && <p className="text-blue-500 mt-2">Loading...</p>}
    </div>
  );
};

export default AddKategoriPage;
