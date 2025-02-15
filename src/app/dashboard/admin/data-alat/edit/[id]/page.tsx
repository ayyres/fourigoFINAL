"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchUserById, updateUser } from "@/service/api";
import { User } from "@/types/types";
import UserForm from "../../UseForm";

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams(); // Ambil parameter dari URL
  const userId = params.id as string; // Ambil ID dari URL

  const [user, setUser] = useState<User | null>(null);

  // Fetch user data based on ID
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserById(Number(userId));
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/dashboard/admin/data-pelanggan"); // Redirect jika gagal
      }
    };
    loadUser();
  }, [userId, router]);

  // Handle form submission
  const handleSubmit = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser);
      router.push("/dashboard/admin/data-pelanggan"); // Kembali ke halaman utama setelah update
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Tampilkan loading jika data belum diambil
  }

  return (
    <div>
      <h1>Edit User</h1>
      <UserForm
        initialData={user}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/data-pelanggan")}
      />
    </div>
  );
};

export default EditUserPage;
