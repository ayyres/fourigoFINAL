"use client";

import { Sewa } from "@/types/sewa.type";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface SewaFormProps {
  initialData?: Sewa;
  onSubmit: (sewa: Sewa | Omit<Sewa, "penyewaan_id">) => void;
  onCancel: () => void;
  disabled?: boolean;
}

const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const UserForm: React.FC<SewaFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { id } = useParams();
  const [formData, setFormData] = useState<Sewa>({
    penyewaan_id: id || 0,
    penyewaan_tglsewa: initialData?.penyewaan_tglsewa || "",
    penyewaan_tglkembali: initialData?.penyewaan_tglkembali || "",
    penyewaan_sttspembayaran: initialData?.penyewaan_sttspembayaran || "",
    penyewaan_sttskembali: initialData?.penyewaan_sttskembali || "",
    penyewaan_totalharga: initialData?.penyewaan_totalharga || 0,
    penyewaan_pelanggan_id: initialData?.penyewaan_pelanggan_id || "",
  });

  const [pelanggan, setPelanggan] = useState<
    { pelanggan_id: number; pelanggan_nama: string }[]
  >([]);

  useEffect(() => {
    const token = getToken();
    fetch("https://final-project-app.aran8276.site/api/v1/pelanggan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data pelanggan");
        }
        return response.json();
      })
      .then((data) => {
        // Pastikan data adalah array dan memiliki struktur yang benar
        if (Array.isArray(data)) {
          const formattedData = data.map((item: any) => ({
            id: item.id.toString(),
            name: item.nama, // Sesuaikan dengan properti yang ada di API
          }));
          setPelanggan(formattedData);
        } else {
          throw new Error("Data pelanggan tidak valid");
        }
      })
      .catch((error) => {
        console.error("Error fetching pelanggan:", error);
        setError(error.message);
      });
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
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-4xl font-serif font-bold mb-6 text-gray-800 dark:text-white text-center">
          {initialData ? "Edit" : "Tambah"}{" "}
          <span className="text-blue-600 dark:text-blue-400">Sewa</span>
        </h2>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Pelanggan
          </label>
          <select
            name="penyewaan_pelanggan_id"
            value={formData.penyewaan_pelanggan_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Pilih Pelanggan</option>
            {pelanggan.map((p) => (
              <option key={p.pelanggan_id} value={p.pelanggan_id}>
                {p.pelanggan_nama}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Tanggal Pinjam
          </label>
          <input
            type="date"
            name="penyewaan_tglsewa"
            value={formData.penyewaan_tglsewa}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Tanggal Kembali
          </label>
          <input
            type="date"
            name="penyewaan_tglkembali"
            value={formData.penyewaan_tglkembali}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Status Pembayaran
          </label>
          <select
            name="penyewaan_sttspembayaran"
            value={formData.penyewaan_sttspembayaran}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Pilih Status</option>
            <option value="Sudah">Sudah</option>
            <option value="Belum">Belum</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Status Kembali
          </label>
          <select
            name="penyewaan_sttskembali"
            value={formData.penyewaan_sttskembali}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Pilih Status</option>
            <option value="Sudah Kembali">Sudah</option>
            <option value="Belum Kembali">Belum</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Total Harga
          </label>
          <input
            type="text"
            name="penyewaan_totalharga"
            value={formData.penyewaan_totalharga}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
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
            {initialData ? "Edit" : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
