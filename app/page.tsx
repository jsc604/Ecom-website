import { use } from "react";
import FeaturedProducts from "./home/FeaturedProducts";
import { getFeaturedProducts } from "@/utils/fetchDataFunctions";

export default function Home() {
  const data = use(getFeaturedProducts());

  return (
    <>
      <FeaturedProducts products={data} />
    </>
  );
}
