import { Sewa } from "@/types/sewa.type";

const API_URL = "https://final-project-app.aran8276.site/api/v1/penyewaan";

// Fungsi untuk mendapatkan token dari localStorage
const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

// Fetch all Sewas (hanya jika ada token)
export const fetchSewas = async (): Promise<Sewa[]> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || "Failed to fetch Sewa");
  }

  return res.json();
};

// Create a new Sewa (hanya jika ada token)
export const createSewa = async (Sewa: Omit<Sewa, "id">): Promise<Sewa> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(Sewa),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to create Sewa");
  }

  return responseData;
};

// Update an existing Sewa (hanya jika ada token)
export const updateSewa = async (sewa: Sewa): Promise<Sewa> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${sewa.penyewaan_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sewa),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to update Sewa");
  }

  return responseData;
};

// Delete a Sewa (hanya jika ada token)
export const deleteSewa = async (id: number): Promise<void> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || "Failed to delete Sewa");
  }
};

// Fetch Sewa by ID (hanya jika ada token)
export const fetchSewaById = async (id: number): Promise<Sewa> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || "Failed to fetch Sewa");
  }

  return res.json();
};
