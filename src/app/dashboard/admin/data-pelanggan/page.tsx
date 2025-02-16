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
      {/* <div className="bg-white shadow-md rounded-lg p-6"> */}

      <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl text-center mb-8">
        <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500
 transition duration-300"
        >
          User
        </span>{" "}
        Data
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
