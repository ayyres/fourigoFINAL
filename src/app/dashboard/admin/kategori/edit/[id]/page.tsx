"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "../../UseForm";
import { fetchKategoriById, updateKategori } from "@/service/kategori.api";
import { Kategori } from "@/types/kategori.type";

const EditKategoriPage = () => {
  const router = useRouter();
  const params = useParams();
  const kategoriId = params?.id as string;
  const [kategori, setKategori] = useState<Kategori | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(kategori);

  useEffect(() => {
    if (!kategoriId) {
      console.error("User ID is undefined. Cannot fetch data.");
      return;
    }

    const loadKategori = async () => {
      try {
        console.log("Fetching user with ID:", kategoriId);
        const data = await fetchKategoriById(Number(kategoriId));
        console.log("Fetched user data:", data);

        if (!data.data.kategori_id) {
          console.error("Fetched data does not contain pelanggan_id!");
        }

        setKategori(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/dashboard/admin/kategori");
      } finally {
        setLoading(false);
      }
    };

    loadKategori();
  }, [kategoriId, router]);

  const handleSubmit = async (updatedKategori: Kategori) => {
    try {
      // if (!updatedUser.pelanggan_id) {
      //   throw new Error("User ID is undefined. Cannot update.");
      // }

      console.log("Submitting updated user data:", updatedKategori);
      await updateKategori(updatedKategori);
      router.push("/dashboard/admin/kategori");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!kategori) {
    return <div>Error: User data not found.</div>;
  }

  return (
    <div>
      <UserForm
        initialData={kategori}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/kategori")}
      />
    </div>
  );
};

export default EditKategoriPage;
