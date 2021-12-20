import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { gql, useApolloClient } from "@apollo/client";
import { ImageUpload } from "../components/ImageUpload";
import { RichEditor } from "../components/RichEditor/RichEditor";
import { SafeHydrate } from "../components/SafeHydrate";
import { Layout } from "../components/Layout";
import { IUser } from "../types/user.interface";
import LoadingCircle from "../assets/images/loading-circle.svg";

const CREATE_SIGNED_UPLOAD_URL = gql`
  mutation {
    createSignedUploadUrl
  }
`;

const CREATE_USER = gql`
  mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;

export default function Form() {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>(null);
  const [name, setName] = useState<string>("");
  const [biography, setBiography] = useState<string>("");

  const apolloClient = useApolloClient();

  const router = useRouter();

  const createUser = async () => {
    setLoading(true);

    try {
      // create signed upload url
      const {
        data: { createSignedUploadUrl: uploadUrl },
      } = await apolloClient.mutate<{ createSignedUploadUrl: string }>({
        mutation: CREATE_SIGNED_UPLOAD_URL,
      });

      // extract image url from upload url
      const imageUrl = uploadUrl.substring(0, uploadUrl.indexOf("?"));

      // upload file to s3
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      // create user
      const user = { name, biography, imageUrl };
      const {
        data: { createUser: result },
      } = await apolloClient.mutate<{ createUser: IUser }>({
        mutation: CREATE_USER,
        variables: { user },
      });

      router.push(`/users/${result.id}`);
    } catch (e) {
      alert("Error happened :(");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between p-6 bg-white font-semibold border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
        Add Data
      </div>
      <div className="flex flex-col px-6 py-5 bg-gray-50">
        <p className="mb-2 font-semibold text-gray-700">Name</p>
        <input
          type="text"
          className="px-4 py-3 mb-4 text-md outline-none bg-white border border-gray-200 rounded shadow-sm"
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mb-2 font-semibold text-gray-700">Biography</p>
        <SafeHydrate>
          <RichEditor onChange={(content) => setBiography(content)} />
        </SafeHydrate>

        <p className="mb-2 font-semibold text-gray-700">Photo</p>
        <ImageUpload onSelect={(file) => setFile(file)} />
      </div>
      <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
        <Link href="/">
          <a className="font-semibold text-gray-600">Cancel</a>
        </Link>
        <button
          className={classNames(
            "flex",
            "flex-row",
            "items-center",
            "px-4",
            "py-2",
            "text-white",
            "font-semibold",
            "bg-blue-500",
            "rounded",
            { "cursor-not-allowed": loading }
          )}
          disabled={loading}
          onClick={createUser}
        >
          Save
          {loading && (
            <LoadingCircle className="animate-spin ml-2 h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </Layout>
  );
}
