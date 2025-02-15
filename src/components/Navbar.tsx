const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-b border-gray-300 dark:bg-gray-900">
        <div className="max-w-screen-2xl flex items-center justify-between mx-5 p-6">
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
          <form className="w-full max-w-md ml-4">
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

          {/* Menu di Tengah */}
          <div
            className="hidden md:flex justify-center w-full"
            id="navbar-default"
          >
            <ul className="font-normal flex flex-row space-x-8">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-lg text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Data Pelanggan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-lg text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sewa Alat
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
