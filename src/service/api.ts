import { User } from "@/types/types";

const API_URL = "https://final-project-app.aran8276.site/api/v1/pelanggan";

// Fungsi untuk mendapatkan token dari localStorage
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const fetchUsers = async (): Promise<User[]> => {
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
    throw new Error(errorResponse.message || "Failed to fetch users");
  }

  return res.json();
};

// Create a new user (hanya jika ada token)
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
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
    body: JSON.stringify(user),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to create user");
  }

  return responseData;
};

// Update an existing user (hanya jika ada token)
export const updateUser = async (user: Omit<User, "id">): Promise<User> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${user.pelanggan_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData.message || "Failed to update user");
  }

  return responseData;
};

// Delete a user (hanya jika ada token)
export const deleteUser = async (pelanggan_id: number): Promise<void> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${pelanggan_id}`, {
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

// Fetch user by ID (hanya jika ada token)
export const fetchUserById = async (pelanggan_id: number): Promise<User> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized: No authentication token found");
  }

  const res = await fetch(`${API_URL}/${pelanggan_id}`, {
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
