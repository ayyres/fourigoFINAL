"use client";

import React from "react";
import { Table, Card, Button } from "flowbite-react";
import { HiOutlinePencilAlt, HiOutlinePlusCircle } from "react-icons/hi";
import {
  FaTools,
  FaUsers,
  FaClipboardList,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

const AdminDashboard = () => {
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
        <Card className="flex flex-col items-center text-center p-1 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
          <div className="flex justify-center items-end w-40 h-12 mb-2">
            <FaTools className="text-3xl text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Total Alat
          </h2>
          <p className="text-2xl font-bold text-blue-600 mt-1">120</p>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
          <div className="flex justify-center items-end w-56 h-16 mb-3">
            <FaClipboardList className="text-4xl text-yellow-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Alat Disewa
          </h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">45</p>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
          <div className="flex justify-center items-end w-56 h-16 mb-3">
            <FaUsers className="text-4xl text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pengguna Aktif
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-2">350</p>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
          <div className="flex justify-center items-end w-56 h-16 mb-3">
            <FaMoneyBillWave className="text-4xl text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pendapatan
          </h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            Rp 12,500,000
          </p>
        </Card>
      </div>

      {/* Manajemen Alat */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white">
            Management Alat
            {/* absolute left-0 top-0 -z-10 h-full rounded-lg bg-white drop-shadow-md dark:bg-black w-full text-base font-sans */}
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
            <Table.Row className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Proyektor Epson
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Multimedia
              </Table.Cell>
              <Table.Cell className="py-4 px-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full dark:bg-green-800 dark:text-green-300">
                  Tersedia
                </span>
              </Table.Cell>
              <Table.Cell className="py-4 px-6 flex space-x-3">
                <a
                  href="/admin/manage-tools/edit/1"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition duration-300"
                >
                  <HiOutlinePencilAlt className="w-5 h-5" />
                  <span>Edit</span>
                </a>
              </Table.Cell>
            </Table.Row>

            <Table.Row className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Speaker JBL
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Audio
              </Table.Cell>
              <Table.Cell className="py-4 px-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full dark:bg-red-800 dark:text-red-300">
                  Disewa
                </span>
              </Table.Cell>
              <Table.Cell className="py-4 px-6">
                <span className="text-gray-500 dark:text-gray-400">
                  Tidak Tersedia
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Kamera Sony A7
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Fotografi
              </Table.Cell>
              <Table.Cell className="py-4 px-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full dark:bg-green-800 dark:text-green-300">
                  Tersedia
                </span>
              </Table.Cell>
              <Table.Cell className="py-4 px-6 flex space-x-3">
                <a
                  href="/admin/manage-tools/edit/3"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition duration-300"
                >
                  <HiOutlinePencilAlt className="w-5 h-5" />
                  <span>Edit</span>
                </a>
              </Table.Cell>
            </Table.Row>
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
            <Table.Row className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Proyektor Epson
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Rizky Hidayat
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                12 Februari 2025
              </Table.Cell>
              <Table.Cell className="py-4 px-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full dark:bg-red-800 dark:text-red-300">
                  Belum Dikembalikan
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Speaker JBL
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Annisa Putri
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                10 Februari 2025
              </Table.Cell>
              <Table.Cell className="py-4 px-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-yellow-600 bg-yellow-100 rounded-full dark:bg-yellow-800 dark:text-yellow-300">
                  Masa Sewa Habis
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      {/* Riwayat Peminjaman */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out">
        <h3 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Riwayat Peminjaman
        </h3>
        <Table hoverable className="w-full text-base font-sans">
          <Table.Head className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Nama Alat
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Peminjam
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Tanggal Kembali
            </Table.HeadCell>
            <Table.HeadCell className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Status
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
            <Table.Row className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Kamera Sony A7
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Budi Santoso
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                8 Februari 2025
              </Table.Cell>
              <Table.Cell className="py-4 px-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full dark:bg-green-800 dark:text-green-300">
                  Dikembalikan
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Laptop Dell
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                Siti Rahma
              </Table.Cell>
              <Table.Cell className="py-4 px-6 text-gray-800 dark:text-gray-300">
                5 Februari 2025
              </Table.Cell>
              <Table.Cell className="py-4 px-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full dark:bg-green-800 dark:text-green-300">
                  Dikembalikan
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
