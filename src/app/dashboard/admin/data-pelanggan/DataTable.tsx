import { User } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";

interface DataTableProps {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
  const router = useRouter();

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-base text-left text-gray-600 dark:text-gray-300"> 
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.id}
              </th>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4 space-x-4">
                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/admin/data-pelanggan/edit/${user.id}`
                    )
                  }
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
