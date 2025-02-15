"use client";
import React, { useState } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/service/api";
import DataTable from "./DataTable";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users on component mount
  React.useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const router = useRouter();

  const handleAddUserClick = () => {
    router.push("/dashboard/admin/data-alat/add");
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
    <div>
      <h1>User Data</h1>
      <button onClick={handleAddUserClick}>Add User</button>
      <DataTable
        data={users}
        onEdit={(user) => {
          setSelectedUser(user);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Page;
