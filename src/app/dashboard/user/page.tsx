"use client";

import React, { useEffect, useState } from "react";
import { Card, Table } from "flowbite-react";
import axios from "axios";

// Definisikan tipe data untuk alat (tool)
interface Tool {
  name: string;
  category: string;
  status: string;
}

const Page = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [totalTools, setTotalTools] = useState(0);
  const [rentedTools, setRentedTools] = useState(0);
  const [newOrders, setNewOrders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://final-project-app.aran8276.site/api");
        const data = response.data;

        setTools(data.tools); // Pastikan data.tools sesuai dengan tipe Tool[]
        setTotalTools(data.totalTools);
        setRentedTools(data.rentedTools);
        setNewOrders(data.newOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
            Anda dapat melakukan peminjaman dengan mudah
          </p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Total Alat</h2>
            <p className="text-3xl font-bold text-blue-600">{totalTools}</p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Alat Disewa</h2>
            <p className="text-3xl font-bold text-blue-600">{rentedTools}</p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pesanan Baru</h2>
            <p className="text-3xl font-bold text-blue-600">{newOrders}</p>
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
              {tools.map((tool, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{tool.name}</Table.Cell>
                  <Table.Cell>{tool.category}</Table.Cell>
                  <Table.Cell className={tool.status === "Tersedia" ? "text-green-500" : "text-red-500"}>
                    {tool.status}
                  </Table.Cell>
                  <Table.Cell>
                    {tool.status === "Tersedia" ? (
                      <a href="#" className="text-blue-600 hover:underline">
                        Sewa
                      </a>
                    ) : (
                      <span className="text-gray-500">Tidak Tersedia</span>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {/* Container Card */}
        <h2 className="p-20 text-5xl font-serif font-bold text-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300">
          Handphone
        </h2>
        <div className="flex bg-gray-100 overflow-x-auto space-x-4 p-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <a
              key={index}
              href="#"
              className="block p-6 w-96 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-slate-300 flex-shrink-0"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  $599
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Pinjam
                </a>
              </div>
            </a>
          ))}
        </div>

        {/* Container Card */}
        <h2 className="p-20 text-5xl font-serif text-start font-bold text-gray-900 shadow-md hover:bg-slate-300 transition-shadow duration-300">
          Camera
        </h2>
        <div className="flex bg-gray-100 overflow-x-auto space-x-4 p-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <a
              key={index}
              href="#"
              className="block p-6 w-96 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-transparent flex-shrink-0"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  $599
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Pinjam
                </a>
              </div>
            </a>
          ))}
        </div>

        {/* Container Card */}
        <h2 className="p-20 text-5xl font-serif font-bold text-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300">
          Laptop
        </h2>
        <div className="flex bg-gray-100 overflow-x-auto space-x-4 p-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <a
              key={index}
              href="#"
              className="block p-6 w-96 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-slate-300 flex-shrink-0"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  $599
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Pinjam
                </a>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
