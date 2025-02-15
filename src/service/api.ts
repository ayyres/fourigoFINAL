import { User } from "@/types/types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

// Create a new user
export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error("Failed to create user");
  }
  return res.json();
};

// Update an existing user
export const updateUser = async (user: User): Promise<User> => {
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error("Failed to update user");
  }
  return res.json();
};

// Delete a user
export const deleteUser = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
};
