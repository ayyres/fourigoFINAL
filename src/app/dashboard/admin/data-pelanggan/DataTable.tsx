import { User } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";

interface DataTableProps {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
  const router = useRouter();

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-xl text-gray-600">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full text-lg text-left text-gray-800 dark:text-gray-200">
        <thead className="text-xl font-semibold uppercase bg-blue-100 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th scope="col" className="px-6 py-4">
              ID
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Email
            </th>
            <th scope="col" className="px-6 py-4">
              Phone
            </th>
            <th scope="col" className="px-6 py-4">
              Address
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 dark:bg-gray-900 dark:divide-gray-700">
          {data.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-300"
            >
              <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                {user.id}
              </td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.adress}</td>
              <td className="px-6 py-4 flex justify-center space-x-3">
                <Link
                  href={`/dashboard/admin/data-pelanggan/edit/${user.id}`}
                  className="flex items-center space-x-2 px-5 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                >
                  <img
                    src="/edit.jpg"
                    alt="Edit"
                    className="w-5 h-5 object-contain filter invert"
                    style={{ filter: "invert(1)" }}
                  />
                </Link>
                <button
                  onClick={() => onDelete(user.id)}
                  className="flex items-center space-x-2 px-5 py-2 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                >
                  <img
                    src="/delete.jpg"
                    alt="Delete"
                    className="w-5 h-5 object-contain filter invert"
                    style={{ filter: "invert(1)" }}
                  />
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
