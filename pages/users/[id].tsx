import gql from "graphql-tag";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import { Layout } from "../../components/Layout";
import { IUser } from "../../types/user.interface";
import { Loading } from "../../components/Loading";

const GET_USER = gql`
  query($id: String!) {
    getUser(id: $id) {
      id
      name
      biography
      imageUrl
    }
  }
`;

export default function User(props: IUser) {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<{ getUser: IUser }>(GET_USER, {
    variables: { id },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Layout>
      <div className="flex flex-row justify-between p-3 bg-white font-semibold border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
        <Link href="/">
          <a className="flex flex-row items-center px-4 py-2 text-white font-semibold bg-blue-500 rounded">
            Go to List
          </a>
        </Link>
      </div>
      <div className="flex flex-col px-6 pb-6 pt-5 bg-gray-50 rounded-bl-lg rounded-br-lg">
        <div className="flex flex-row mb-3">
          <p className="font-semibold text-gray-700 mr-2">Name:</p>
          <p className="">{data.getUser.name}</p>
        </div>
        <div className="flex flex-col mb-3">
          <p className="font-semibold text-gray-700 mr-2 mb-2">Biography:</p>
          <div className="p-3 border border-gray-200 rounded">
            <ReactMarkdown>{data.getUser.biography}</ReactMarkdown>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-gray-700 mr-2 mb-2">Photo:</p>
          <img src={data.getUser.imageUrl} />
        </div>
      </div>
    </Layout>
  );
}
