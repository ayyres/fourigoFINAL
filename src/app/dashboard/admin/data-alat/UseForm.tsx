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

const AlatForm: React.FC<AlatFormProps> = ({
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
    kategori_id: initialData?.alat_kategori_id || "",
  });

  const [categories, setCategories] = useState<{ id: number; nama: string }[]>(
    []
  );
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  const getToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  useEffect(() => {
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
        );
        const data = await response.json();
        setCategories(data.data);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-800 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-4xl font-serif font-bold mb-6 text-gray-800 dark:text-white text-center">
          {initialData ? "Edit" : "Tambah"}{" "}
          <span className="text-blue-600 dark:text-blue-400">Alat</span>
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400 text-center mb-8">
          {initialData
            ? "Update data alat di bawah ini."
            : "Isi form berikut untuk menambah data alat baru."}
        </p>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Nama Barang:
          </label>
          <input
            type="text"
            name="alat_nama"
            value={formData.alat_nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Deskripsi:
          </label>
          <input
            type="text"
            name="alat_deskripsi"
            value={formData.alat_deskripsi}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Harga Per-Hari:
          </label>
          <input
            type="text"
            name="alat_hargaperhari"
            value={formData.alat_hargaperhari}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Stok:
          </label>
          <input
            type="text"
            name="alat_stok"
            value={formData.alat_stok}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Kategori:
          </label>
          {loadingCategories ? (
            <p className="text-gray-500">Loading kategori...</p>
          ) : (
            <select
              name="alat_kategori_id"
              value={formData.alat_kategori_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Pilih Kategori</option>
              {categories?.map((category) => (
                <option key={category.kategori_id} value={category.kategori_id}>
                  {category.kategori_nama}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {initialData ? "Edit" : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlatForm;
