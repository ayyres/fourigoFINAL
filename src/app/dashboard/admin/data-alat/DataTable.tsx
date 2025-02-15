import { User } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";

interface DataTableProps {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const router = useRouter();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <button
                onClick={() =>
                  router.push(`/dashboard/admin/data-alat/edit/${user.id}`)
                }
              >
                Edit
              </button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
