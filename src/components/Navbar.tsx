import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 dark:bg-gray-900 z-50">
      <div className="max-w-screen-2xl flex items-center justify-between mx-5 p-4">
        {/* Logo di Pojok Kiri */}
        <div className="">
          <Link href="/dashboard/admin">
            <img
              src="/logo.jpg"
              className="max-h-48 max-w-48 object-contain"
              alt="Rentronix"
            />
          </Link>
        </div>

        {/* Menu di Tengah */}
        <div
          className="hidden md:flex justify-center w-full ml-8"
          id="navbar-default"
        >
          <ul className="font-normal flex flex-row space-x-8">
            <li>
              <Link href="/dashboard/admin/data-pelanggan">
                <span className="block py-2 px-4 text-lg font-semibold text-whiterounded-sm md:bg-transparent md:text-gray-900 md:p-0 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-800 md:hover:bg-transparent md:hover:text-blue-800 dark:md:hover:bg-transparent dark:md:hover:text-blue-500">
                  Data Pelanggan
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/admin/data-alat">
                <span className="block py-2 px-4 text-lg font-semibold text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition duration-300 ease-in-out transform hover:scale-105 md:hover:text-blue-800 dark:md:hover:text-blue-500">
                  Data Alat
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
