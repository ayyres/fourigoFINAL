import React from "react";
import { fetchUsers } from "@/service/api";
import DataTable from "./DataTable";
import { User } from "@/types/types";

interface HomeProps {
  users: User[];
}

const Home: React.FC<HomeProps> = ({ users }) => {
  return (
    <div>
      <h1>User Data</h1>
      <DataTable data={users} />
    </div>
  );
};

export async function getServerSideProps() {
  const users = await fetchUsers();
  return {
    props: {
      users,
    },
  };
}

export default Home;
