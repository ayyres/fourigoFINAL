"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";


interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const Registration = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await axios.post(
        "https://final-project-app.aran8276.site/api/v1/auth/register",
        data
      );
      return response.data;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      setErrorMessage(
        error.response?.data?.message || "Registrasi gagal, coba lagi!"
      );
    },
    onSuccess: () => {
      alert("Registrasi berhasil! Silakan login.");
      window.location.href = "/login";
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("Semua bidang harus diisi!");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <img src="logo.jpg" className="h-48" alt="Rentronix" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 pb-16 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-600"
      >
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 dark:text-white">
          Daftar dulu, yuk
        </h1>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <label
          htmlFor="name"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Nama
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mb-6 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Nama Lengkap"
          required
        />

        <label
          htmlFor="email"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mb-6 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@example.com"
          required
        />

        <label
          htmlFor="password"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mb-6 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="••••••"
          required
        />

<button
  type="submit"
  className={`w-full text-white font-medium rounded-lg text-base px-5 py-3 text-center transition duration-300 ${
    mutation.status === "pending"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
  disabled={mutation.status === "pending"}
>
  {mutation.status === "pending" ? "Mendaftar..." : "Lanjutkan"}
</button>


        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Sudah punya akun?{" "}
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

export default Registration;
