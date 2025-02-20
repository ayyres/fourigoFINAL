"use client";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { fetchKategori } from "@/service/kategori.api";
import { fetchAlats } from "@/service/alat.api";
import Link from "next/link";
import { toast } from "react-hot-toast";

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
      console.log("kjashdakjs");
      setLoading(true);

      const data = await fetchAlats();
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

  const showPortalNotification = () => {
    toast("Hallo! ini adalah notifikasi untuk portal!");
  };

  return (
    <>
      <div className="bg-white">
        <section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
            <div className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200">
              <Button
                onClick={showPortalNotification}
                className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3"
              >
                New
              </Button>
              <span className="text-sm font-medium">
                Tunggu barang-barang baru yang akan datang
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Sewa Alat Terjangkau di Rentronix
            </h1>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
              {" "}
              Solusi Tepat untuk Kebutuhan Anda!
            </h2>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
              Kami di Rentronix siap memenuhi kebutuhan sewa alat terbaik untuk
              Anda! Sewa dengan mudah, cepat, dan harga terbaik hanya di
              Rentronix. Pilih alat yang Anda butuhkan dan nikmati layanan
              terbaik kami!
            </p>
            <form className="w-full max-w-md mx-auto"></form>
          </div>
          <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10">
          <label className="block mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Pilih Kategori
          </label>
          <select
            value={createKategori}
            onChange={handleKategoriChange}
            className="block w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:text-white hover:border-blue-700 hover:shadow-lg transition-all duration-300"
          >
            <option value="">Semua Kategori</option>
            {kategori.map((kategori) => (
              <option key={kategori.kategori_id} value={kategori.kategori_id}>
                {kategori.kategori_nama}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-white rounded-lg">
          {filteredAlat?.map((item, index) => (
            <a
              key={index}
              href="#"
              className="block p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.alat_nama}
              </h5>
              <p className="font-normal font-sans text-gray-700 dark:text-gray-400">
                {item.alat_deskripsi}
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-normal text-blue-800 dark:text-blue-300">
                  Rp {item.alat_hargaperhari}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
