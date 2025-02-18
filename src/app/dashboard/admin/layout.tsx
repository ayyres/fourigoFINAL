import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Navbar from "@/components/Navbar"; // Pastikan path ke Navbar sudah benar
import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "../Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <Navbar />
        <AuthProvider>
          <QueryProvider>
            <div className="mt-24">{children}</div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </>
  );
}
