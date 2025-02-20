"use client";

import { Alat } from "@/types/alat.type";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DataTable: React.FC = () => {
  const [data, setData] = useState<Alat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ambil token dari localStorage
  const getToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = getToken();
    if (!token) {
      setError("Unauthorized: Token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://final-project-app.aran8276.site/api/v1/alat",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success === false) {
        throw new Error(result.message || "API returned an error");
      }

      if (Array.isArray(result.data)) {
        setData(result.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (alat_id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this alat?"
    );
    if (!confirmDelete) return;

    const token = getToken();
    if (!token) {
      alert("Unauthorized: Token not found");
      return;
    }

    try {
      const response = await fetch(
        `https://final-project-app.aran8276.site/api/v1/alat/${alat_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete alat");
      }

      setData((prevData) =>
        prevData.filter((alat) => alat.alat_id !== alat_id)
      );
    } catch (error) {
      console.error("Error deleting alat:", error);
      alert(error instanceof Error ? error.message : "Failed to delete alat");
    }
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (data.length === 0)
    return <p className="text-center text-gray-600">Data masih kosong</p>;

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl  mx-24">
  <table className="min-w-full text-lg text-left text-gray-800 dark:text-gray-200">
    <thead className="text-xl font-semibold uppercase bg-blue-100 dark:bg-gray-800 dark:text-gray-300">
      <tr>
        <th className="px-6 py-4">ID</th>
        <th className="px-6 py-4">Name</th>
        <th className="px-6 py-4">Deskripsi</th>
        <th className="px-6 py-4">Harga per-Hari</th>
        <th className="px-6 py-4">Stok</th>
        <th className="px-6 py-4">Kategori</th>
        <th className="px-6 py-4">Action</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-300 dark:bg-gray-900 dark:divide-gray-700">
      {data.map((alat, index) => (
        <tr
          key={alat.alat_id || index}
          className="hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-300"
        >
          <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
            {alat.alat_id}
          </td>
          <td className="px-6 py-4">{alat.alat_nama}</td>
          <td className="px-6 py-4">{alat.alat_deskripsi}</td>
          <td className="px-6 py-4">{alat.alat_hargaperhari}</td>
          <td className="px-6 py-4">{alat.alat_stok}</td>
          <td className="px-6 py-4">{alat.alat_kategori_id}</td>
          <td className="px-6 py-4 flex justify-center space-x-3">
            <Link
              href={
                alat.alat_id
                  ? `/dashboard/admin/data-alat/edit/${alat.alat_id}`
                  : "#"
              }
              className="flex items-center space-x-2 px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            >
              <Image
                src="/edit.jpg"
                alt="Edit"
                width={20}
                height={20}
                className="invert"
              />
              <span>Edit</span>
            </Link>
            <button
              onClick={() => handleDelete(alat.alat_id)}
              className="flex items-center space-x-2 px-4 py-2 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
            >
              <Image
                src="/delete.jpg"
                alt="Delete"
                width={20}
                height={20}
                className="invert"
              />
              <span>Delete</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default DataTable;
