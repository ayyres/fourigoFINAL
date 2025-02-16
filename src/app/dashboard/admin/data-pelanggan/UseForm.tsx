"use client";

import { User } from "@/types/types";
import React, { useState } from "react";

interface UserFormProps {
  initialData?: User;
  onSubmit: (user: Omit<User, "id"> | User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<User, "id"> | User>(
    initialData || { name: "", email: "", phone: "", address: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-800 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl max-w-lg w-full mx-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white text-center">
            {initialData ? "Update" : "Create"}{" "}
            <span className="text-blue-600 dark:text-blue-400">User</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            {initialData
              ? "Update user details below."
              : "Fill out the form to create a new user."}
          </p>

          <div className="mb-4">
            <label className="block text-base text-gray-600 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-base text-gray-600 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-base text-gray-600 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-base text-gray-600 dark:text-gray-300 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
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
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
