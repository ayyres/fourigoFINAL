"use client";
import React, { useState } from "react";
import {
  fetchAlats,
  createAlat,
  updateAlat,
  deleteAlat,
} from "@/service/alat.api";
import DataTable from "./DataTable";
import { Alat } from "@/types/alat.type";
import { useRouter } from "next/navigation";

const Page = () => {
  const [alats, setAlats] = useState<Alat[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAlat, setSelectedAlat] = useState<Alat | null>(null);

  // Fetch users on component mount
  React.useEffect(() => {
    const loadAlats = async () => {
      const data = await fetchAlats();
      setAlats(data);
    };
    loadAlats();
  }, []);

  const router = useRouter();

  const handleAddUserClick = () => {
    router.push("/dashboard/admin/data-alat/add");
  };

  // Handle create or update user
  const handleSubmit = async (alat: Omit<Alat, "id"> | Alat) => {
    if ("id" in alat) {
      // Update existing user
      const updatedAlat = await updateAlat(alat);
      setAlats((prev) =>
        prev.map((u) => (u.alat_id === updatedAlat.alat_id ? updatedAlat : u))
      );
    } else {
      // Create new user
      const newAlat = await createAlat(alat);
      setAlats((prev) => [...prev, newAlat]);
    }
    setShowForm(false);
    setSelectedAlat(null);
  };

  // Handle delete user
  const handleDelete = async (id: number) => {
    await deleteAlat(id);
    setAlats((prev) => prev.filter((alat) => alat.alat_id !== id));
  };

  return (
    <div>
      <h1>Alat Data</h1>
      <button onClick={handleAddUserClick}>Add Alat</button>
      <DataTable
        data={alats}
        onEdit={(alat) => {
          setSelectedAlat(alat);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Page;
