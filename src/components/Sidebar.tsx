"use client";

import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

        {/* Avatar Button */}
        <div className="ml-auto relative">
          <button
            id="avatarButton"
            type="button"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="w-10 h-10 rounded-full cursor-pointer"
          >
            <img src="/user.png" alt="User dropdown" />
          </button>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div
              id="userDropdown"
              className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="py-1">
                <a
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Log Out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
