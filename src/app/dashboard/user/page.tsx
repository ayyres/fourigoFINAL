"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { fetchAlat, fetchAlatById } from "@/service/alat.api";
import { fetchKategori } from "@/service/kategori.api";

export default function AlatList() {
  const [alat, setAlat] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [createKategori, setCreateKategori] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchKategoriData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchAlat();
      setAlat(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const fetchKategoriData = async () => {
    try {
      const data = await fetchKategori();
      setKategori(data.data);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
    }
  };

  const handleKategoriChange = (event) => {
    setCreateKategori(event.target.value);
  };

  const filteredAlat = createKategori
    ? alat.filter((item) => item.alat_kategori_id == createKategori)
    : alat;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner aria-label="Loading..." size="xl" />
      </div>
    );
  }

  console.log(filteredAlat);
  console.log(createKategori);

  return (
    <>
      <div className="bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-36 text-center rounded-lg bg-gradient-to-r from-violet-200 to-pink-200">
          <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
            Selamat datang di
            <span className="underline underline-offset-3 decoration-8 decoration-blue-400">
              Rentronix
            </span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Anda dapat melakukan penyewaan dengan mudah
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <label className="block mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Pilih Kategori
          </label>
          <select
            value={createKategori}
            onChange={handleKategoriChange}
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Semua Kategori</option>
            {kategori.map((kategori) => (
              <option key={kategori.kategori_id} value={kategori.kategori_id}>
                {kategori.kategori_nama}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-12">
          <h2 className="text-5xl font-serif font-bold text-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300 p-8">
            Alat
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-100 rounded-lg">
            {filteredAlat?.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.alat_nama}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.alat_deskripsi}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${item.alat_hargaperhari}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
