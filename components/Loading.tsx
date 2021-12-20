import { Layout } from "./Layout";
import LoadingCircle from "../assets/images/loading-circle.svg";

export function Loading() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center bg-white h-48 rounded-lg">
        <LoadingCircle className="animate-spin text-black w-12 h-12" />
      </div>
    </Layout>
  );
}
