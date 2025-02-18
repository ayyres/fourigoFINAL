"use client";

import { Alat } from "@/types/alat.type";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface AlatFormProps {
  initialData?: Alat;
  onSubmit: (user: Alat | Omit<Alat, "alat_id">) => void;
  onCancel: () => void;
  disabled?: boolean;
}

const UserForm: React.FC<AlatFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { id } = useParams();
  const [formData, setFormData] = useState<Alat>({
    alat_id: id || 0,
    alat_nama: initialData?.alat_nama || "",
    alat_deskripsi: initialData?.alat_deskripsi || "",
    alat_hargaperhari: initialData?.alat_hargaperhari || "",
    alat_stok: initialData?.alat_stok || "",
    kategori_id: initialData?.alat_kategori_id || "", // Tambahkan kategori_id
  });

  const [categories, setCategories] = useState<{ id: number; nama: string }[]>(
    []
  );
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  const getToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  useEffect(() => {
    // Fetch data kategori dari API
    const fetchCategories = async () => {
      const token = getToken();
      try {
        const response = await fetch(
          "https://final-project-app.aran8276.site/api/v1/kategori",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Ganti dengan URL API kategori yang benar
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Gagal mengambil data kategori:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full mx-4 mt-10 border border-gray-200"
      >
        <h2 className="text-5xl font-extrabold mb-6 text-gray-800 dark:text-white">
          {initialData ? "Update" : "Create"}
          <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
            Alat
          </small>
        </h2>

        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">
            Nama Barang:
          </label>
          <input
            type="text"
            name="alat_nama"
            value={formData.alat_nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Deskripsi:</label>
          <input
            type="text"
            name="alat_deskripsi"
            value={formData.alat_deskripsi}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">
            Harga Per-Hari:
          </label>
          <input
            type="text"
            name="alat_hargaperhari"
            value={formData.alat_hargaperhari}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Stok:</label>
          <input
            type="text"
            name="alat_stok"
            value={formData.alat_stok}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Dropdown untuk kategori */}
        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Kategori:</label>
          {loadingCategories ? (
            <p className="text-gray-500">Loading kategori...</p>
          ) : (
            <select
              name="kategori_id"
              value={formData.alat_kategori_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nama}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
