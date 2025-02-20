"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "../../UseForm";
import { fetchSewaById, updateSewa } from "@/service/sewa.api";
import { Sewa } from "@/types/sewa.type";

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const sewaId = params?.id as string;
  const [sewa, setSewa] = useState<Sewa | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(sewa);

  useEffect(() => {
    const loadSewa = async () => {
      try {
        const data = await fetchSewaById(Number(sewaId));
        setSewa(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/dashboard/admin/data-sewa");
      } finally {
        setLoading(false);
      }
    };

    loadSewa();
  }, [sewaId, router]);

  const handleSubmit = async (updatedSewa: Sewa) => {
    try {
      console.log("Submitting updated user data:", updatedSewa);
      await updateSewa(updatedSewa);
      router.push("/dashboard/admin/data-sewa");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sewa) {
    return <div>Error: User data not found.</div>;
  }

  return (
    <div>
      <UserForm
        initialData={sewa}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/data-sewa")}
      />
    </div>
  );
};

export default EditUserPage;
