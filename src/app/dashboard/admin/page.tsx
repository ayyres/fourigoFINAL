import React from "react";

const Page = () => {
  return (
    <>
      <nav className="bg-white border-b border-gray-300 dark:bg-gray-900">
        <div className="max-w-screen-2xl flex items-center mx-5 p-6 space-x-6">
          {/* Logo di Pojok Kiri */}
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 flex-shrink-0"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>

          {/* Search Bar */}
          <form className="w-full max-w-md">
            <div className="relative w-full">
              <input
                type="search"
                id="default-search"
                className="block w-full py-2.5 pr-12 pl-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500"
                placeholder="Aku mau belanja...."
                required
              />

              {/* Garis Halus di Dalam Search Box */}
              <span className="absolute inset-y-0 right-14 w-px bg-gray-400 opacity-30"></span>

              {/* Tombol Ikon Kaca Pembesar di Dalam Search Box */}
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Kategori Barang di Samping Search Box */}
          <div className="ml-4">
            <select className="py-2.5 px-4 text-lg border border-gray-300 rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500">
              <option value="">Kategori</option>
              <option value="elektronik">Handphone</option>
              <option value="pakaian">Tablet</option>
              <option value="peralatan-rumah">Laptop</option>
            </select>
          </div>

          {/* Tombol Daftar dan Login di Pojok Kanan */}
          <div className="absolute right-0 flex items-center">
            <button
              type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 font-medium rounded-l-lg text-base px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Daftar
            </button>
            <button
              type="button"
              className="text-gray-900 bg-white hover:bg-gray-100 font-medium rounded-r-lg text-base px-4 py-2.5 border-l border-gray-300 dark:border-gray-700"
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Page;
