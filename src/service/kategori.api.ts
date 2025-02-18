import { Kategori } from "@/types/kategori.type";

const API_URL = "https://final-project-app.aran8276.site/api/v1/kategori";

// Fungsi untuk mendapatkan token dari localStorage
const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

// Create a new user (hanya jika ada token)
export const createKategori = async (
  kategori: Omit<Kategori, "kategori_id">
): Promise<Kategori> => {
  const token = getToken();
  //   if (!token) {
  //     throw new Error("Unauthorized: No authentication token found");
  //   }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(kategori),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to create user");
  }

  return responseData;
};

// Update an existing user (hanya jika ada token)
export const updateKategori = async (kategori: Kategori): Promise<Kategori> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  console.log("Updating user:", kategori);

  // if (!user.pelanggan_id) {
  //   console.error("Error: pelanggan_id is missing!", user);
  //   throw new Error("User ID is undefined. Cannot update.");
  // }

  const res = await fetch(`${API_URL}/${kategori.kategori_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(kategori),
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("Update error response:", responseData);
    throw new Error(responseData.message || "Failed to update user");
  }

  return responseData;
};

// Delete a user (hanya jika ada token)
export const deleteKategori = async (kategori_id: number): Promise<void> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${kategori_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || "Failed to delete user");
  }
};
// Fetch category by ID (hanya jika ada token)
export const fetchKategori = async (): Promise<Kategori> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || "Failed to fetch category");
  }

  return res.json();
};

// Fetch user by ID (hanya jika ada token)
export const fetchKategoriById = async (
  kategori_id: number
): Promise<Kategori> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${kategori_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || "Failed to fetch user");
  }

  return res.json();
};
