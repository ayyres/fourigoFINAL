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
      <h3 className="mb-4 text-2xl font-extrabold font-serif text-center leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
        Data{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          User
        </span>
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
  );
};

export default Page;
