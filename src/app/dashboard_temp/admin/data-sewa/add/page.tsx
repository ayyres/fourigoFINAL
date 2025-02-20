"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "../UseForm";
import { createSewa } from "@/service/sewa.api";
import { Sewa } from "@/types/sewa.type";

const AddSewaPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("Token:", localStorage.getItem("accessToken"));

  // Handle form submission
  const handleSubmit = async (sewa: Omit<Sewa, "id">) => {
    try {
      setLoading(true);
      setError(null);

      await createSewa(sewa);

      router.push("/dashboard/admin/data-sewa");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <UserForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/data-sewa")}
        disabled={loading}
      />
      {loading && <p className="text-blue-500 mt-2">Loading...</p>}{" "}
    </div>
  );
};

export default AddSewaPage;
