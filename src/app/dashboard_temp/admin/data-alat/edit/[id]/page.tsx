"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "../../UseForm";
import { fetchAlatById, updateAlat } from "@/service/alat.api";
import { Alat } from "@/types/alat.type";

const EditAlatPage = () => {
  const router = useRouter();
  const params = useParams();
  const alatId = params?.id as string;
  const [alat, setAlat] = useState<Alat | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(alat);

  useEffect(() => {
    if (!alatId) {
      console.error("Alat ID is undefined. Cannot fetch data.");
      return;
    }

    const loadAlat = async () => {
      try {
        console.log("Fetching alat with ID:", alatId);
        const data = await fetchAlatById(Number(alatId));
        console.log("Fetched alat data:", data);

        if (!data.data.alat_id) {
          console.error("Fetched data does not contain alat_id!");
        }

        setAlat(data);
      } catch (error) {
        console.error("Failed to fetch alat:", error);
        router.push("/dashboard/admin/data-alat");
      } finally {
        setLoading(false);
      }
    };

    loadAlat();
  }, [alatId, router]);

  const handleSubmit = async (updatedAlat: Alat) => {
    try {
      // if (!updatedUser.pelanggan_id) {
      //   throw new Error("User ID is undefined. Cannot update.");
      // }

      console.log("Submitting updated user data:", updatedAlat);
      await updateAlat(updatedAlat);
      router.push("/dashboard/admin/data-alat");
    } catch (error) {
      console.error("Failed to update alat:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!alat) {
    return <div>Error: User data not found.</div>;
  }

  return (
    <div>
      <UserForm
        initialData={alat}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/data-alat")}
      />
    </div>
  );
};

export default EditAlatPage;
