"use client";

import { Kategori } from "@/types/kategori.type"; // Change User to Category
import React, { useState } from "react";
import { useParams } from "next/navigation";

interface CategoryFormProps {
  initialData?: Kategori; // Change User to Kategori
  onSubmit: (category: Kategori | Omit<Kategori, "kategori_id">) => void; // Change User to Category
  onCancel: () => void;
  disabled?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { id } = useParams();
  const [formData, setFormData] = useState<Kategori>({
    kategori_id: id ? parseInt(id) : 0, // Handle the case where id is a string
    kategori_nama: initialData?.kategori_nama || "", // Set default to initialData if provided
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData.kategori_id); // Log category_id

    if (!("kategori_id" in formData)) { // Check for kategori_id
      console.error("Error: kategori_id is missing!");
      return;
    }

    onSubmit(formData); // Submit form data
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full mx-4 mt-10 border border-gray-200"
      >
        <h2 className="text-5xl font-extrabold mb-6 text-gray-800 dark:text-white">
          {initialData ? "Update" : "Create"}{" "}
          <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
            Category
          </small>
        </h2>

        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Category Name:</label>
          <input
            type="text"
            name="kategori_nama" // Use kategori_nama instead of category_name
            value={formData.kategori_nama} // Bind to kategori_nama
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

export default CategoryForm;
