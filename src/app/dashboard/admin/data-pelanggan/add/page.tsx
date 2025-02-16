"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "../UseForm";
import { createUser } from "@/service/api";
import { User } from "@/types/types";

const AddUserPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("Token:", localStorage.getItem("accessToken"));

  // Handle form submission
  const handleSubmit = async (user: Omit<User, "id">) => {
    try {
      setLoading(true);
      setError(null);

      await createUser(user);

      router.push("/dashboard/admin/data-pelanggan");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tambah Pengguna</h2>
      {error && <p className="text-red-500">{error}</p>}{" "}
      <UserForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/data-pelanggan")}
        disabled={loading}
      />
      {loading && <p className="text-blue-500 mt-2">Loading...</p>}{" "}
    </div>
  );
};

export default AddUserPage;
