"use client";
import React, { useState, useEffect } from "react";
import { Table, Card, Button } from "flowbite-react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import {
  FaTools,
  FaUsers,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";
import { fetchUsers } from "@/service/api"; // Import API service
import { fetchAlats } from "@/service/alat.api";
import { fetchSewas } from "@/service/sewa.api";

const AdminDashboard = () => {
  const getToken = (): string | null => localStorage.getItem("accessToken");

  const [stats, setStats] = useState({
    totalTools: 0,
    rentedTools: 0,
    activeUsers: 0,
    revenue: 0,
  });

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const fetchData = async () => {
      try {
        const alatData = await fetchAlats();
        const penyewaanData = await fetchSewas();
        const pelangganData = await fetchUsers();

        console.log(alatData);
        console.log(penyewaanData);
        console.log(pelangganData);

        const rentedToolsCount =
          penyewaanData.data.filter(
            (p) => p.penyewaan_sttskembali === "Belum Kembali"
          ).length || 0;
        const activeUsersCount =
          pelangganData.data.filter((pelanggan) =>
            penyewaanData.some(
              (penyewaan) =>
                penyewaan.penyewaan_pelanggan_id === pelanggan.pelanggan_id &&
                penyewaan.penyewaan_sttskembali === "Belum Kembali"
            )
          ).length || 0;

        setStats({
          totalTools: alatData.data.length || 0,
          rentedTools: rentedToolsCount,
          activeUsers: activeUsersCount,
          revenue:
            penyewaanData?.reduce(
              (acc, p) => acc + (p.penyewaan_totalharga || 0),
              0
            ) || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(stats);
  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <h3 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard Admin
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 text-center bg-white dark:bg-gray-800">
          <FaTools className="text-3xl text-blue-600" />
          <h2 className="text-lg font-semibold">Total Alat</h2>
          <p className="text-2xl font-bold">{stats.totalTools}</p>
        </Card>
        <Card className="p-6 text-center bg-white dark:bg-gray-800">
          <FaClipboardList className="text-3xl text-yellow-500" />
          <h2 className="text-lg font-semibold">Alat Disewa</h2>
          <p className="text-2xl font-bold">{stats.rentedTools}</p>
        </Card>
        <Card className="p-6 text-center bg-white dark:bg-gray-800">
          <FaUsers className="text-3xl text-green-600" />
          <h2 className="text-lg font-semibold">Pengguna Aktif</h2>
          <p className="text-2xl font-bold">{stats.activeUsers}</p>
        </Card>
        <Card className="p-6 text-center bg-white dark:bg-gray-800">
          <FaMoneyBillWave className="text-3xl text-purple-600" />
          <h2 className="text-lg font-semibold">Pendapatan</h2>
          <p className="text-2xl font-bold">
            Rp {stats.revenue.toLocaleString()}
          </p>
        </Card>
      </div>
      <Button color="blue" href="/admin/manage-tools/add">
        <HiOutlinePlusCircle className="w-6 h-6" /> Tambah Alat
      </Button>
    </div>
  );
};

export default AdminDashboard;
