import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 dark:bg-gray-900 z-50">
  <div className="max-w-screen-2xl flex items-center justify-between mx-5 p-4">
    {/* Logo di Pojok Kiri */}
    <div>
      <Link href="#">
        <img
          src="/logo.jpg"
          className="max-h-48 max-w-48 object-contain"
          alt="Rentronix"
        />
      </Link>
    </div>

    {/* Tombol Logout di Pojok Kanan */}
    <div className="ml-auto">
  <button
    type="button"
    className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-3 transition-all duration-200 ease-in-out transform hover:scale-105 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
  >
    Logout
  </button>
</div>

  </div>
</nav>

  );
};

export default Sidebar;
