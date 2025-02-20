"use client";
import React, { useState, useEffect } from "react";
import {
  fetchKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from "@/service/kategori.api";
import DataTable from "./DataTable";
import { Kategori } from "@/types/kategori.type";
import { useRouter } from "next/navigation";

const Page = () => {
  const [kategori, setKategori] = useState<Kategori[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState<Kategori | null>(
    null
  );

  // Fetch users on component mount
  useEffect(() => {
    const loadKategori = async () => {
      const data = await fetchKategori();
      setKategori(data);
    };
    loadKategori();
  }, []);

  const router = useRouter();

  const handleAddKategoriClick = () => {
    router.push("/dashboard/admin/kategori/add");
  };

  // Handle create or update user
  const handleSubmit = async (kategori: Omit<Kategori, "id"> | Kategori) => {
    if ("id" in kategori) {
      // Update existing user
      const updatedKategori = await updateKategori(kategori);
      setKategori((prev) =>
        prev.map((u) => (u.id === updatedKategori.id ? updatedKategori : u))
      );
    } else {
      // Create new user
      const newKategori = await createKategori(kategori);
      setKategori((prev) => [...prev, newKategori]);
    }
    setShowForm(false);
    setSelectedKategori(null);
  };

  // Handle delete user
  const handleDelete = async (id: number) => {
    await deleteKategori(id);
    setKategori((prev) => prev.filter((kategori) => kategori.id !== id));
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
        onClick={handleAddKategoriClick}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
      >
        Add User
      </button>
      <DataTable
        data={kategori}
        onEdit={(kategori) => {
          setSelectedKategori(kategori);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
    // </div>
  );
};

export default Page;
