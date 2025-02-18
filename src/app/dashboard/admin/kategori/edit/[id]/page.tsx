"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UseForm from "../../UseForm";
import { fetchKategoriById, updateKategori } from "@/service/api";
import { Kategori } from "@/types/kategori.type";

const EditKategoriPage = () => {
  const router = useRouter();
  const params = useParams();
  const kategoriId = params?.id as string;
  const [kategori, setKategori] = useState<Kategori | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kategoriId) {
      console.error("Kategori ID is undefined. Cannot fetch data.");
      return;
    }

    const loadKategori = async () => {
      try {
        console.log("Fetching kategori with ID:", kategoriId);
        const data = await fetchKategoriById(Number(kategoriId));
        console.log("Fetched kategori data:", data);

        setKategori(data);
      } catch (error) {
        console.error("Failed to fetch kategori:", error);
        router.push("/dashboard/admin/kategori");
      } finally {
        setLoading(false);
      }
    };

    loadKategori();
  }, [kategoriId, router]);

  const handleSubmit = async (updatedKategori: Kategori) => {
    try {
      console.log("Submitting updated kategori data:", updatedKategori);
      await updateKategori(updatedKategori);
      router.push("/dashboard/admin/kategori");
    } catch (error) {
      console.error("Failed to update kategori:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!kategori) {
    return <div>Error: Kategori data not found.</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Edit Kategori</h2>
      <UseForm
        initialData={kategori}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/kategori")}
      />
    </div>
  );
};

export default EditKategoriPage;
