import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< Updated upstream
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/QueryProvider";
=======
>>>>>>> Stashed changes

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<<<<<<< Updated upstream
        <QueryProvider>
        <Navbar/>
=======
>>>>>>> Stashed changes
        {children}
        </QueryProvider>

      </body>
    </html>
  );
}
