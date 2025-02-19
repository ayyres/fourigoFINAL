"use client";

import { Kategori } from "@/types/kategori.type";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface KategoriFormProps {
  initialData?: Kategori;
  onSubmit: (kategori: Kategori | Omit<Kategori, "kategori_id">) => void;
  onCancel: () => void;
  disabled?: boolean;
}

const UserForm: React.FC<KategoriFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { id } = useParams();
  const [formData, setFormData] = useState<Kategori>({
    kategori_id: id || 0,
    kategori_nama: initialData?.kategori_nama || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        kategori_id: initialData.data.kategori_id,
        kategori_nama: initialData.data.kategori_nama || "",
      }));
    }
  }, [initialData]);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full mx-4 mt-10 border border-gray-200"
      >
        <h2 className="text-5xl font-extrabold mb-6 text-gray-800 dark:text-white">
          {initialData ? "Edit" : "Tambah"}{" "}
          <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
            Kategori
          </small>
        </h2>

        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">
            Nama Kategori:
          </label>
          <input
            type="text"
            name="kategori_nama"
            value={formData.kategori_nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
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
