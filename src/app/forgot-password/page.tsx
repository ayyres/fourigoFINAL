"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(
        "https://final-project-app.aran8276.site/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Email tidak ditemukan atau terjadi kesalahan.");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setMessage("Tautan reset password telah dikirim ke email Anda.");
      setError("");
    },
    onError: (error: any) => {
      setMessage("");
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Reset pesan sebelumnya
    setError("");
    forgotPasswordMutation.mutate(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <a href="/" className="flex items-center space-x-3 mb-6">
        <img src="logo.jpg" className="h-12" alt="Rentronix" />
      </a>

      {/* Form Reset Password */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 pb-16 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-600"
      >
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 dark:text-white">
          Lupa Password?
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Masukkan email Anda untuk mendapatkan tautan reset password.
        </p>

        {/* Notifikasi sukses atau error */}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mb-6 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@example.com"
          required
        />

        {/* Tombol Reset Password */}
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-base px-5 py-3 text-center"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? "Mengirim..." : "Kirim Tautan Reset"}
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

export default ForgotPassword;
