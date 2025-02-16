import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 dark:bg-gray-900 z-50">
<<<<<<< Updated upstream
        <div className="max-w-screen-2xl flex items-center justify-between mx-5 py-0 px-0">
          {/* Logo di Pojok Kiri dengan Next.js Link */}
          <Link href="https://flowbite.com/" passHref>
            <img
              src="/logo.jpg"
              className="max-h-36"
=======
        <div className="max-w-screen-2xl flex items-center justify-between mx-5 p-4">
          {/* Logo di Pojok Kiri */}
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 flex-shrink-0 overflow-hidden h-16"
          >
            <img
              src="logo.jpg"
              className="max-h-36 object-contain" // Logo lebih besar tapi tinggi navbar tetap
>>>>>>> Stashed changes
              alt="Rentronix"
            />
          </Link>

          {/* Menu di Tengah dengan Jarak dari Logo */}
          <div className="hidden md:flex justify-start w-full ml-8" id="navbar-default">
            <ul className="font-normal flex flex-row space-x-8">
              <li>
                <Link href="/dashboard/admin/data-pelanggan">
                  <span className="block py-1 px-3 text-lg text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                    Data Pelanggan
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/data-alat">
                  <span className="block py-1 px-3 text-lg text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Data Alat
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Search Bar dipindahkan ke Sebelah Kanan */}
          <form className="w-full max-w-md ml-4">
            <div className="relative w-full">
              <input
                type="search"
                id="default-search"
                className="block w-full py-1 pr-12 pl-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500"
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
<<<<<<< Updated upstream
        </div>
      </nav>
      {/* Tambahkan padding di atas konten agar tidak tertutup navbar */}
      <div className="pt-20"></div>
=======

          {/* Menu di Tengah */}
          <div
            className="hidden md:flex justify-around w-full"
            id="navbar-default"
          >
            <ul className="font-normal flex flex-row space-x-8">
              <li>
                <a
                  href="/data-pelanggan"
                  className="block py-2 px-3 text-lg text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Data Pelanggan
                </a>
              </li>
              <li>
                <a
                  href="/data-alat"
                  className="block py-2 px-3 text-lg text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Data Alat
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Tambahkan padding di atas konten agar tidak tertutup navbar */}
      <div className="pt-20">
      </div>
>>>>>>> Stashed changes
    </>
  );
};

export default Navbar;
