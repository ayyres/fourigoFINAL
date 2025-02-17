import React from "react";

const Sidebar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/dashboard/user" className="flex items-center">
            <img src="/logo.jpg" className="h-14 me-3" alt="Rentronix" />
          </a>
          <button
            data-collapse-toggle="navbar-menu"
            aria-controls="navbar-menu"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className="hidden w-full sm:flex sm:items-center sm:max-w-min"
          id="navbar-menu"
        >
          <ul className="flex flex-col mt-4 sm:flex-row sm:space-x-8 sm:mt-0">
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-gray-900 rounded hover:bg-white dark:text-white dark:hover:bg-gray-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-gray-900 rounded hover:bg-white dark:text-white dark:hover:bg-gray-700"
              >
                Inbox
              </a>
            </li>
            <li>
              <a
                href="/dashboard/user"
                className="block py-2 px-4 text-gray-900 rounded hover:bg-white dark:text-white dark:hover:bg-gray-700"
              >
                Users
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-gray-900 rounded hover:bg-white dark:text-white dark:hover:bg-gray-700"
              >
                Products
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
