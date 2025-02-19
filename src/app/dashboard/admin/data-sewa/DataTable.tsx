"use client";

import { Sewa } from "@/types/sewa.type";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DataTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<Sewa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://final-project-app.aran8276.site/api/v1/penyewaan"
      );
      const result = await response.json();

      console.log("API Response:", result); // Debugging

      if (Array.isArray(result.data)) {
        setData(result.data);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (penyewaan_id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://final-project-app.aran8276.site/api/v1/penyewaan/${penyewaan_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setData((prevData) =>
        prevData.filter((sewa) => sewa.penyewaan_id !== penyewaan_id)
      );
      console.log(`User with ID ${penyewaan_id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (data.length === 0)
    return <p className="text-center text-gray-600">No data available</p>;

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full text-lg text-left text-gray-800 dark:text-gray-200">
        <thead className="text-xl font-semibold uppercase bg-blue-100 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Tanggal Sewa</th>
            <th className="px-6 py-4">Tanggal Kembali</th>
            <th className="px-6 py-4">Status Pembayaran</th>
            <th className="px-6 py-4">Status Kembali</th>
            <th className="px-6 py-4">Total Harga</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 dark:bg-gray-900 dark:divide-gray-700">
          {data.map((sewa, index) => (
            <tr
              key={sewa.penyewaan_id || index}
              className="hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-300"
            >
              <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                {sewa.penyewaan_id}
              </td>
              <td className="px-6 py-4">{sewa.penyewaan_tglsewa}</td>
              <td className="px-6 py-4">{sewa.penyewaan_tglkembali}</td>
              <td className="px-6 py-4">{sewa.penyewaan_sttspembayaran}</td>
              <td className="px-6 py-4">{sewa.penyewaan_sttskembali}</td>
              <td className="px-6 py-4">{sewa.penyewaan_totalharga}</td>
              <td className="px-6 py-4 flex justify-center space-x-3">
                <Link
                  href={
                    sewa.penyewaan_id
                      ? `/dashboard/admin/data-sewa/edit/${sewa.penyewaan_id}`
                      : "#"
                  }
                  onClick={(e) => {
                    if (!sewa.penyewaan_id) {
                      e.preventDefault();
                      console.error("Error: User ID is missing");
                    }
                  }}
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
                  onClick={() => handleDelete(sewa.penyewaan_id)}
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
