"use client";

import React from "react";
import { Card, Table } from "flowbite-react";

const page = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          {/* <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Halo, <b>User</b></span>
            <img src="/profile.jpg" alt="User Profile" className="w-10 h-10 rounded-full border" />
          </div> */}
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Total Alat</h2>
            <p className="text-3xl font-bold text-blue-600">120</p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Alat Disewa</h2>
            <p className="text-3xl font-bold text-blue-600">45</p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pesanan Baru</h2>
            <p className="text-3xl font-bold text-blue-600">10</p>
          </Card>
        </div>

        {/* Daftar Alat Elektronik */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Daftar Alat Elektronik</h2>
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
                <Table.Cell className="text-green-500">Tersedia</Table.Cell>
                <Table.Cell>
                  <a href="#" className="text-blue-600 hover:underline">
                    Sewa
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Speaker JBL</Table.Cell>
                <Table.Cell>Audio</Table.Cell>
                <Table.Cell className="text-red-500">Disewa</Table.Cell>
                <Table.Cell>
                  <span className="text-gray-500">Tidak Tersedia</span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Kamera Sony A7</Table.Cell>
                <Table.Cell>Fotografi</Table.Cell>
                <Table.Cell className="text-green-500">Tersedia</Table.Cell>
                <Table.Cell>
                  <a href="#" className="text-blue-600 hover:underline">
                    Sewa
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;