"use client";
import React, { useState, useEffect } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/service/api";
import DataTable from "./DataTable";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const router = useRouter();

  const handleAddUserClick = () => {
    router.push("/dashboard/admin/data-pelanggan/add");
  };

  // Handle create or update user
  const handleSubmit = async (user: Omit<User, "id"> | User) => {
    if ("id" in user) {
      // Update existing user
      const updatedUser = await updateUser(user);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    } else {
      // Create new user
      const newUser = await createUser(user);
      setUsers((prev) => [...prev, newUser]);
    }
    setShowForm(false);
    setSelectedUser(null);
  };

  // Handle delete user
  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h3 className="mb-4 text-2xl font-extrabold font-serif text-center leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
        Data{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          Pengguna
        </span>
      </h3>

      <button
        onClick={handleAddUserClick}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
      >
        Add User
      </button>
      <DataTable
        data={users}
        onEdit={(user) => {
          setSelectedUser(user);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
    // </div>
  );
};

export default Page;
