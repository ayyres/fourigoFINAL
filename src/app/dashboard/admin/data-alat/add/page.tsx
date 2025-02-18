"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "../UseForm";
import { createAlat } from "@/service/alat.api";
import { Alat } from "@/types/alat.type";

const AddAlatPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("Token:", localStorage.getItem("accessToken"));

  // Handle form submission
  const handleSubmit = async (alat: Omit<Alat, "alat_id">) => {
    try {
      setLoading(true);
      setError(null);

      await createAlat(alat);

      router.push("/dashboard/admin/data-alat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tambah Pengguna</h2>
      {error && <p className="text-red-500">{error}</p>}
      <UserForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/data-alat")}
        disabled={loading}
      />
      {loading && <p className="text-blue-500 mt-2">Loading...</p>}{" "}
    </div>
  );
};

export default AddAlatPage;
