import { Alat } from "@/types/alat.type";

const API_URL = "https://final-project-app.aran8276.site/api/v1/alat";

const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};
export const createAlat = async (
  alat: Omit<Alat, "alat_id">
): Promise<Alat> => {
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
    body: JSON.stringify(alat),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to create alat");
  }

  return responseData;
};

// Update an existing category (hanya jika ada token)
export const updateAlat = async (alat: Alat): Promise<Alat> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${alat.alat_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(alat),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to update alat");
  }

  return responseData;
};

// Delete a category (hanya jika ada token)
export const deleteAlat = async (alat_id: number): Promise<void> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${alat_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || "Failed to delete category");
  }
};

// Fetch category by ID (hanya jika ada token)
export const fetchAlat = async (): Promise<Alat> => {
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

// Fetch category by ID (hanya jika ada token)
export const fetchAlatById = async (alat_id: number): Promise<Alat> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${alat_id}`, {
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
