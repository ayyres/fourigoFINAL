"use client";

import { M_PLUS_1 } from "next/font/google";
import React from "react";

const page = () => {
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

              {/* Tambahkan elemen harga dan tombol "Pinjam" di sini */}
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

              {/* Tambahkan elemen harga dan tombol "Pinjam" di sini */}
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

              {/* Tambahkan elemen harga dan tombol "Pinjam" di sini */}
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

export default page;
