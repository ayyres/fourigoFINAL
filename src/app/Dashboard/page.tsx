"use client";

import React from "react";
import { Table, Card, Button } from "flowbite-react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { FaTools, FaUsers, FaClipboardList, FaMoneyBillWave, FaClock } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Dashboard Admin
        </h1>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <Card className="flex flex-col items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300">
          <FaTools className="text-4xl text-blue-600 mb-3" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Total Alat</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300">
          <FaClipboardList className="text-4xl text-yellow-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Alat Disewa</h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">45</p>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300">
          <FaUsers className="text-4xl text-green-600 mb-3" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pengguna Aktif</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">350</p>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300">
          <FaMoneyBillWave className="text-4xl text-purple-600 mb-3" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pendapatan</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">Rp 12,500,000</p>
        </Card>
      </div>

      {/* Manajemen Alat */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Manajemen Alat</h2>
          <Button color="blue" href="/admin/manage-tools/add" className="flex items-center">
            <HiOutlinePlusCircle className="w-6 h-6 mr-2" /> Tambah Alat
          </Button>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Nama Alat</Table.HeadCell>
            <Table.HeadCell>Kategori</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell>Proyektor Epson</Table.Cell>
              <Table.Cell>Multimedia</Table.Cell>
              <Table.Cell className="text-green-500 font-semibold">Tersedia</Table.Cell>
              <Table.Cell>
                <a href="/admin/manage-tools/edit/1" className="text-blue-600 hover:underline">Edit</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Speaker JBL</Table.Cell>
              <Table.Cell>Audio</Table.Cell>
              <Table.Cell className="text-red-500 font-semibold">Disewa</Table.Cell>
              <Table.Cell>
                <span className="text-gray-500">Tidak Tersedia</span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Kamera Sony A7</Table.Cell>
              <Table.Cell>Fotografi</Table.Cell>
              <Table.Cell className="text-green-500 font-semibold">Tersedia</Table.Cell>
              <Table.Cell>
                <a href="/admin/manage-tools/edit/3" className="text-blue-600 hover:underline">Edit</a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      {/* Alat yang Sedang Disewa */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Alat yang Sedang Disewa</h2>
        <Table>
          <Table.Head>
            <Table.HeadCell>Nama Alat</Table.HeadCell>
            <Table.HeadCell>Peminjam</Table.HeadCell>
            <Table.HeadCell>Tanggal Sewa</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell>Proyektor Epson</Table.Cell>
              <Table.Cell>Rizky Hidayat</Table.Cell>
              <Table.Cell>12 Februari 2025</Table.Cell>
              <Table.Cell className="text-red-500 font-semibold">Belum Dikembalikan</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Speaker JBL</Table.Cell>
              <Table.Cell>Annisa Putri</Table.Cell>
              <Table.Cell>10 Februari 2025</Table.Cell>
              <Table.Cell className="text-yellow-500 font-semibold">Masa Sewa Habis</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      {/* Riwayat Peminjaman */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Riwayat Peminjaman</h2>
        <Table>
          <Table.Head>
            <Table.HeadCell>Nama Alat</Table.HeadCell>
            <Table.HeadCell>Peminjam</Table.HeadCell>
            <Table.HeadCell>Tanggal Kembali</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell>Kamera Sony A7</Table.Cell>
              <Table.Cell>Budi Santoso</Table.Cell>
              <Table.Cell>8 Februari 2025</Table.Cell>
              <Table.Cell className="text-green-500 font-semibold">Dikembalikan</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Laptop Dell</Table.Cell>
              <Table.Cell>Siti Rahma</Table.Cell>
              <Table.Cell>5 Februari 2025</Table.Cell>
              <Table.Cell className="text-green-500 font-semibold">Dikembalikan</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
