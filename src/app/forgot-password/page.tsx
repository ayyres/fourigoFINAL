import React from "react";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <a href="/" className="flex items-center space-x-3 mb-6">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-12"
          alt="Flowbite Logo"
        />
        <span className="text-3xl font-semibold text-gray-900 dark:text-white">
          Flowbite
        </span>
      </a>
      //Form Reset Password
      <form className="w-full max-w-md p-10 pd-16 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-700 drak:border-gray-600">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 dark:text-white">
          Lupa Password ?
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Masukkan email anda untuk mendapatkan tautan reset password.
        </p>
        //Input Email
        <label
          htmlFor="email"
          className="block mb-2 text-base font-medium text-gray-900 text"
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
        //Tombol Reset Password
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-base px-5 py-3 text-center"
        >
          Kirim Tautan Reset
        </button>
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Ingat password?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Login di sini
          </a>
          .
        </p>
      </form>
    </div>
  );
};
