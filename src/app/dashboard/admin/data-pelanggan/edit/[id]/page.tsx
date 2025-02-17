"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import UserForm from "../../UseForm";
import { fetchUserById, updateUser } from "@/service/api";
import { User } from "@/types/types";

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is undefined. Cannot fetch data.");
      return;
    }

    const loadUser = async () => {
      try {
        console.log("Fetching user with ID:", userId);
        const data = await fetchUserById(Number(userId));
        console.log("Fetched user data:", data);

        if (!data.data.pelanggan_id) {
          console.error("Fetched data does not contain pelanggan_id!");
        }

        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/dashboard/admin/data-pelanggan");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId, router]);

  const handleSubmit = async (updatedUser: User) => {
    try {
      // if (!updatedUser.pelanggan_id) {
      //   throw new Error("User ID is undefined. Cannot update.");
      // }

      console.log("Submitting updated user data:", updatedUser);
      await updateUser(updatedUser);
      router.push("/dashboard/admin/data-pelanggan");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error: User data not found.</div>;
  }

  return (
    <div>
      <UserForm
        initialData={user}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/admin/data-pelanggan")}
      />
    </div>
  );
};

export default EditUserPage;
