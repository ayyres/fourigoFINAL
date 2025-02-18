"use client";

import React, { useState, useEffect } from "react";
import { Table, Card, Button } from "flowbite-react";
import { HiOutlinePencilAlt, HiOutlinePlusCircle } from "react-icons/hi";
import {
  FaTools,
  FaUsers,
  FaClipboardList,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

interface Alat {
  id: number;
  kategori_id: number;
  nama: string;
  deskripsi: string;
  hargaperhari: number;
  stok: number;
}

interface Penyewaan {
  id: number;
  pelanggan_id: number;
  tglsewa: string;
  tglkembali: string;
  sttspembayaran: "Lunas" | "Belum Dibayar" | "DP";
  sttskembali: "Sudah Kembali" | "Belum Kembali";
  totalharga: number;
}

interface PenyewaanDetail {
  id: number;
  penyewaan_id: number;
  alat_id: number;
  jumlah: number;
  subharga: number;
}

interface Pelanggan {
  id: number;
  nama: string;
  alamat: string;
  notelp: string;
  email: string;
}

interface Stats {
  totalTools: number;
  rentedTools: number;
  activeUsers: number;
  revenue: number;
}

const API_URL = "https://final-project-app.aran8276.site/api";

const AdminDashboard = () => {
  const [tools, setTools] = useState<Alat[]>([]);
  const [rentedTools, setRentedTools] = useState<Penyewaan[]>([]);
  const [history, setHistory] = useState<Penyewaan[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalTools: 0,
    rentedTools: 0,
    activeUsers: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch alat
        const alatRes = await fetch(`${API_URL}/alat`);
        const alatData = await alatRes.json();
        setTools(alatData);

        // Fetch penyewaan
        const penyewaanRes = await fetch(`${API_URL}/penyewaan`);
        const penyewaanData = await penyewaanRes.json();
        setRentedTools(penyewaanData);

        // Fetch pelanggan
        const pelangganRes = await fetch(`${API_URL}/pelanggan`);
        const pelangganData = await pelangganRes.json();

        // Perhitungan statistik (dummy logic, sesuaikan dengan API backend)
        setStats({
          totalTools: alatData.length,
          rentedTools: penyewaanData.length,
          activeUsers: pelangganData.length,
          revenue: penyewaanData.reduce((acc: number, p: Penyewaan) => acc + (p.totalharga || 0), 0),
        });
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
          Dashboard{" "}
          <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            Admin
          </span>
        </h3>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="flex flex-col h-40 items-center text-center p-1 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <div className="flex justify-center items-end w-30 h-12 mb-2">
            <FaTools className="text-3xl text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Total Alat
          </h2>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {stats.totalTools}
          </p>
        </Card>

        <Card className="flex flex-col h-40 items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
          <div className="flex justify-center items-end w-30 h-16 mb-3">
            <FaClipboardList className="text-4xl text-yellow-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Alat Disewa
          </h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {stats.rentedTools}
          </p>
        </Card>

        <Card className="flex flex-col h-40 items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
          <div className="flex justify-center items-end w-30 h-16 mb-3">
            <FaUsers className="text-4xl text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pengguna Aktif
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.activeUsers}
          </p>
        </Card>

        <Card className="flex flex-col h-40 items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
          <div className="flex justify-center items-end w-30 h-16 mb-3">
            <FaMoneyBillWave className="text-4xl text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pendapatan
          </h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            Rp {stats.revenue.toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Manajemen Alat */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white">
            Management Alat
          </h3>

          <Button
            color="blue"
            href="/admin/manage-tools/add"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            <HiOutlinePlusCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">Tambah Alat</span>
          </Button>
        </div>

        <Table hoverable className="w-full text-base font-sans">
          <Table.Head className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Nama Alat
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Kategori
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Aksi
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
            {tools.map((tool) => (
              <Table.Row
                key={tool.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300"
              >
                <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                  {tool.nama}
                </Table.Cell>
                <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                  {tool.kategori_id} {/* You might need to map this ID to category name */}
                </Table.Cell>
                <Table.Cell className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold ${
                      tool.stok > 0
                        ? "text-green-600 bg-green-100"
                        : "text-red-600 bg-red-100"
                    } rounded-full dark:${
                      tool.stok > 0
                        ? "bg-green-800 text-green-300"
                        : "bg-red-800 text-red-300"
                    }`}
                  >
                    {tool.stok > 0 ? "Tersedia" : "Habis"}
                  </span>
                </Table.Cell>
                <Table.Cell className="py-4 px-6 flex space-x-3">
                  <a
                    href={`/admin/manage-tools/edit/${tool.id}`}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition duration-300"
                  >
                    <HiOutlinePencilAlt className="w-5 h-5" />
                    <span>Edit</span>
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Alat yang Sedang Disewa */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out mb-8">
        <h3 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Alat yang Disewa
        </h3>
        <Table hoverable className="w-full text-base font-sans">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Nama Alat
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Peminjam
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Tanggal Sewa
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Status
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
            {rentedTools.map((rentedTool) => (
              <Table.Row
                key={rentedTool.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300"
              >
                <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                  {rentedTool.tglsewa} {/* Assuming you want to show rental date */}
                </Table.Cell>
                <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                  {rentedTool.pelanggan_id} {/* Map this ID to the actual customer */}
                </Table.Cell>
                <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                  {rentedTool.sttskembali}
                </Table.Cell>
                <Table.Cell className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold ${
                      rentedTool.sttskembali === "Belum Kembali"
                        ? "text-red-600 bg-red-100"
                        : "text-yellow-600 bg-yellow-100"
                    } rounded-full dark:${
                      rentedTool.sttskembali === "Belum Kembali"
                        ? "bg-red-800 text-red-300"
                        : "bg-yellow-800 text-yellow-300"
                    }`}
                  >
                    {rentedTool.sttskembali}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Riwayat Peminjaman */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out">
        <h3 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Riwayat Peminjaman
        </h3>
        <Table hoverable className="w-full text-base font-sans">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Nama Alat
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Peminjam
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Tanggal Sewa
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              Status
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
            {history.map((rental) => (
              <Table.Row
                key={rental.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300"
              >
                <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                  {rental.tglsewa}
                </Table.Cell>
                <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                  {rental.pelanggan_id}
                </Table.Cell>
                <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                  {rental.sttskembali}
                </Table.Cell>
                <Table.Cell className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold ${
                      rental.sttskembali === "Belum Kembali"
                        ? "text-red-600 bg-red-100"
                        : "text-yellow-600 bg-yellow-100"
                    } rounded-full dark:${
                      rental.sttskembali === "Belum Kembali"
                        ? "bg-red-800 text-red-300"
                        : "bg-yellow-800 text-yellow-300"
                    }`}
                  >
                    {rental.sttskembali}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
