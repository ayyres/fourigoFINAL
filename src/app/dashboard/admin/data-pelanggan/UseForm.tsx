"use client";

import { User } from "@/types/types";
import React, { useState } from "react";
import { useParams } from "next/navigation";

interface UserFormProps {
  initialData?: User;
  onSubmit: (user: User | Omit<User, "pelanggan_id">) => void;
  onCancel: () => void;
  disabled?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const {id}=useParams();
  const [formData, setFormData] = useState<User>({
    pelanggan_id: id || 0,
    pelanggan_nama: initialData?.pelanggan_nama || "",
    pelanggan_email: initialData?.pelanggan_email || "",
    pelanggan_notelp: initialData?.pelanggan_notelp || "",
    pelanggan_alamat: initialData?.pelanggan_alamat || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData.pelanggan_id);

    if (!("pelanggan_id" in formData)) {
      console.error("Error: pelanggan_id is missing!");
      return;
    }

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
            User
          </small>
        </h2>

        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Name:</label>
          <input
            type="text"
            name="pelanggan_nama"
            value={formData.pelanggan_nama}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Email:</label>
          <input
            type="email"
            name="pelanggan_email"
            value={formData.pelanggan_email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Phone:</label>
          <input
            type="text"
            name="pelanggan_notelp"
            value={formData.pelanggan_notelp}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg text-gray-600 mb-2">Address:</label>
          <input
            type="text"
            name="pelanggan_alamat"
            value={formData.pelanggan_alamat}
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
