import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Logo di Atas Form */}
      {/* <a
        href="https://flowbite.com/"
        className="flex items-center space-x-3 mb-6"
      > */}
        <img
          src="logo.jpg"
          className="h-48"
          alt="Rentronix"
        />
      {/* </a> */}

      {/* Form */}
      <form className="w-full max-w-md p-10 pb-16 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-600">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 dark:text-white">
          Login dulu, yuk
        </h1>

        {/* Input Email */}
        <label
          htmlFor="email"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mb-6 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@example.com"
          required
        />

        {/* Input Password */}
        <label
          htmlFor="password"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mb-6 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="••••••"
          required
        />

        {/* Tombol Login */}
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-base px-5 py-3 text-center"
        >
          Lanjutkan
        </button>

        {/* Link Forgot Password */}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Lupa password?{" "}
          <a
            href="/forgot-password"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Reset di sini
          </a>
          .
        </p>

        {/* Link Registrasi */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Belum punya akun?{" "}
          <a
            href="/Registration"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Daftar di sini
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default page;
