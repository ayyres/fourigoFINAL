"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/service/api";
import { User } from "@/types/types";
import UserForm from "../UseForm";

const AddUserPage = () => {
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (user: Omit<User, "id">) => {
    await createUser(user);
    router.push("/dashboard/admin/data-pelanggan"); // Kembali ke halaman utama setelah submit
  };

  return (
    <div>
      <h1>Add New User</h1>
      <UserForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/data-pelanggan")}
      />
    </div>
  );
};

export default AddUserPage;
