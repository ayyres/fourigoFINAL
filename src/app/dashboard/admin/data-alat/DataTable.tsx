"use client";
import { Alat } from "@/types/alat.type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DataTableProps {
  dataTable: Alat[];
  onEdit: (alat: Alat) => void;
  onDelete: (id: number) => Promise<void>;
}

const DataTable: React.FC<DataTableProps> = ({
  dataTable,
  onEdit,
  onDelete,
}) => {
  const [data, setData] = useState<Alat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlatId, setSelectedAlatId] = useState<number | null>(null);

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
      setData(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (alat_id: number) => {
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

  const openModal = (alat_id: number) => {
    setSelectedAlatId(alat_id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlatId(null);
  };

  const confirmDelete = () => {
    if (selectedAlatId) {
      handleDelete(selectedAlatId);
      closeModal();
    }
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (data.length === 0)
    return <p className="text-center text-gray-600">Data masih kosong</p>;

  return (
    <>
      <div className="overflow-x-auto shadow-lg rounded-xl mx-auto max-w-screen-2xl mb-8">
        <table className="min-w-full text-lg text-left text-gray-800 dark:text-gray-200">
          <thead className="text-lg font-bold uppercase bg-blue-100 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Deskripsi</th>
              <th className="px-4 py-3">Harga per-Hari</th>
              <th className="px-4 py-3">Stok</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300 dark:bg-gray-900 dark:divide-gray-700">
            {data.map((alat, index) => {
              console.log("Alat Data:", alat); // Debugging

              return (
                <tr
                  key={alat?.alat_id ? `alat-${alat.alat_id}` : `alat-${index}`}
                  className="hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-300"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {alat.alat_id ?? "Unknown"}
                  </td>
                  <td className="px-4 py-3">
                    {alat.alat_nama ?? "Tidak ada nama"}
                  </td>
                  <td className="px-4 py-3">
                    {alat.alat_deskripsi ?? "Tidak ada deskripsi"}
                  </td>
                  <td className="px-4 py-3">
                    {alat.alat_hargaperhari ?? "Tidak diketahui"}
                  </td>
                  <td className="px-4 py-3">
                    {alat.alat_stok ?? "Tidak diketahui"}
                  </td>
                  <td className="px-4 py-3">
                    {alat.alat_kategori_id ?? "Tidak diketahui"}
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-3">
                    <Link
                      href={
                        alat.alat_id
                          ? `/dashboard/admin/data-alat/edit/${alat.alat_id}`
                          : "#"
                      }
                      onClick={(e) => {
                        if (!alat.alat_id) {
                          e.preventDefault();
                          console.error("Error: Alat ID is missing");
                        }
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                    >
                      <Image
                        src="/edit.jpg"
                        alt="Edit"
                        width={16}
                        height={16}
                        className="invert"
                      />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => {
                        if (alat.alat_id !== undefined) {
                          openModal(Number(alat.alat_id));
                        } else {
                          console.error("Error: alat_id is missing");
                        }
                      }}
                      className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-300"
                    >
                      <Image
                        src="/delete.jpg"
                        alt="Delete"
                        width={16}
                        height={16}
                        className="invert"
                      />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
