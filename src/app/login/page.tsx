"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await fetch(
        "https://final-project-app.aran8276.site/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Login gagal. Periksa kembali email dan password.");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Login response:", data); // Debugging

      if (!data.access_token) {
        setErrorMessage("Login berhasil tetapi token tidak ditemukan.");
        return;
      }

      // Simpan token dan data user ke localStorage
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect berdasarkan peran
      if (data.user.role === "admin") {
        router.push("Dashboard/admin");
      } else {
        router.push("Dashboard/user"); // Ganti ke dashboard pengguna
      }
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    loginMutation.mutate({ email, password });
  };

  const handleGuestLogin = () => {
    // Arahkan ke halaman user dashboard atau halaman tamu
    localStorage.setItem("accessToken", "guest_token");
    localStorage.setItem("user", JSON.stringify({ role: "guest" }));
    router.push("Dashboard/guest"); // Halaman tamu
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <img src="logo.jpg" className="h-40 mb-[-20px]" alt="Rentronix" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 pt-14 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-600"
      >
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 dark:text-white">
          Login
        </h1>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

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

        <label
          htmlFor="password"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 mb-6 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="••••••"
          required
        />

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-base px-5 py-3 text-center"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Memproses..." : "Lanjutkan"}
        </button>

       

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <a
            href="/forgot-password"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Lupa password?
          </a>
        </p>

         {/* Link login sebagai tamu */}
         <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <button
            type="button"
            onClick={handleGuestLogin}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Login sebagai Tamu
          </button>
        </p>

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

export default LoginPage;
