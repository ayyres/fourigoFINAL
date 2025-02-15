import { User } from "@/types/types";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Kembalikan array kosong jika terjadi error
  }
};
