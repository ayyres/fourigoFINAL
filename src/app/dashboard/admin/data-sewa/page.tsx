"use client";
import React, { useState, useEffect } from "react";
import {
  fetchSewas,
  createSewa,
  updateSewa,
  deleteSewa,
} from "@/service/sewa.api";
import DataTable from "./DataTable";
import { Sewa } from "@/types/sewa.type";
import { useRouter } from "next/navigation";

const Page = () => {
  const [sewas, setSewas] = useState<Sewa[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSewa, setSelectedSewa] = useState<Sewa | null>(null);

  // Fetch users on component mount
  useEffect(() => {
    const loadSewas = async () => {
      const data = await fetchSewas();
      setSewas(data);
    };
    loadSewas();
  }, []);

  const router = useRouter();

  const handleAddSewaClick = () => {
    router.push("/dashboard/admin/data-sewa/add");
  };

  // Handle create or update user
  const handleSubmit = async (sewa: Omit<Sewa, "id"> | Sewa) => {
    if ("id" in sewa) {
      // Update existing user
      const updatedSewa = await updateSewa(sewa);
      setSewas((prev) =>
        prev.map((u) => (u.id === updatedSewa.id ? updatedSewa : u))
      );
    } else {
      // Create new user
      const newSewa = await createSewa(sewa);
      setSewas((prev) => [...prev, newSewa]);
    }
    setShowForm(false);
    setSelectedSewa(null);
  };

  // Handle delete user
  const handleDelete = async (id: number) => {
    await deleteSewa(id);
    setSewas((prev) => prev.filter((sewa) => sewa.id !== id));
  };

  return (
    <div className="p-6">
      {/* <div className="bg-white shadow-md rounded-lg p-6"> */}

      <h3 className="mb-4 text-2xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
        Sewa{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          Data
        </span>
      </h3>

      <button
        onClick={handleAddSewaClick}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
      >
        Add Sewa
      </button>
      <DataTable
        data={sewas}
        onEdit={(sewa) => {
          setSelectedSewa(sewa);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
    // </div>
  );
};

export default Page;
