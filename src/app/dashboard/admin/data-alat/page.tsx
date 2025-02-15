import React from "react";
import { fetchUsers } from "@/service/api";
import DataTable from "./DataTable";

const Page = async () => {
  const users = await fetchUsers();

  return (
    <div>
      <h1>User Data</h1>
      <DataTable data={users} />
    </div>
  );
};

export default Page;
