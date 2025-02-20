"use client";
import { Alat } from "@/types/alat.type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const DataTable: React.FC = () => {
  const [data, setData] = useState<Alat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlatId, setSelectedAlatId] = useState<number | null>(null);

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
            {data.map((alat, index) => (
              <tr
                key={alat.alat_id || index}
                className="hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-300"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {alat.alat_id}
                </td>
                <td className="px-4 py-3">{alat.alat_nama}</td>
                <td className="px-4 py-3">{alat.alat_deskripsi}</td>
                <td className="px-4 py-3">{alat.alat_hargaperhari}</td>
                <td className="px-4 py-3">{alat.alat_stok}</td>
                <td className="px-4 py-3">{alat.alat_kategori_id}</td>
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
                    onClick={() => openModal(alat.alat_id)}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <Image
                  src="/x-button.png" // Ganti dengan path gambar close icon
                  alt="Close"
                  width={16}
                  height={16}
                  className="invert"
                />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z"
                    fill="#000000"
                  />
                  <path
                    d="M12 13C11.8019 12.9974 11.6126 12.9176 11.4725 12.7775C11.3324 12.6374 11.2526 12.4481 11.25 12.25V8.75C11.25 8.55109 11.329 8.36032 11.4697 8.21967C11.6103 8.07902 11.8011 8 12 8C12.1989 8 12.3897 8.07902 12.5303 8.21967C12.671 8.36032 12.75 8.55109 12.75 8.75V12.25C12.7474 12.4481 12.6676 12.6374 12.5275 12.7775C12.3874 12.9176 12.1981 12.9974 12 13Z"
                    fill="#000000"
                  />
                  <path
                    d="M12 16C11.8019 15.9974 11.6126 15.9176 11.4725 15.7775C11.3324 15.6374 11.2526 15.4481 11.25 15.25V14.75C11.25 14.5511 11.329 14.3603 11.4697 14.2197C11.6103 14.079 11.8011 14 12 14C12.1989 14 12.3897 14.079 12.5303 14.2197C12.671 14.3603 12.75 14.5511 12.75 14.75V15.25C12.7474 15.4481 12.6676 15.6374 12.5275 15.7775C12.3874 15.9176 12.1981 15.9974 12 16Z"
                    fill="#000000"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Apakah Anda yakin ingin menghapus item ini?
                </h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
                  onClick={confirmDelete}
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={closeModal}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default DataTable;
