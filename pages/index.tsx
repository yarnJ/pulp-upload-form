import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Cactus from "../assets/images/cactus.svg";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { IUser } from "../types/user.interface";

const GET_USERS = gql`
  query {
    getUsers {
      id
      name
      biography
      imageUrl
    }
  }
`;

export default function List() {
  const { loading, error, data } = useQuery<{ getUsers: IUser[] }>(GET_USERS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (data.getUsers.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col bg-white justify-center items-center py-14 rounded-lg">
          <div className="w-44 mb-6">
            <Cactus className="w-full" />
          </div>
          <p className="text-2xl font-semibold mb-4">There is no entry yet</p>
          <Link href="/form">
            <a className="text-white font-semibold bg-blue-700 rounded px-5 py-2 hover:bg-blue-800 transition-all">
              Let's add one
            </a>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-row justify-between items-center bg-gray-100 px-5 py-3 border-b rounded-t">
        <p className="text-lg font-semibold text-gray-700">Users</p>
        <Link href="/form">
          <a className="px-3 py-1.5 text-sm text-white font-semibold bg-blue-500 rounded">
            Create New
          </a>
        </Link>
      </div>
      <div className="flex flex-col justify-between p-3 bg-white font-semibold border-b divide-y border-gray-200 rounded-b-lg">
        {data.getUsers.map((user) => (
          <div className="flex flex-row items-center py-3" key={user.id}>
            <div className="w-20 h-16 overflow-hidden">
              <img src={user.imageUrl} className="h-full w-full object-cover" />
            </div>
            <div className="text-base ml-3">{user.name}</div>
            <div className="flex-grow"></div>
            <Link href={`/users/${user.id}`}>
              <a className="px-3 py-1.5 text-sm text-white font-semibold bg-red-400 rounded">
                Show Details
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
