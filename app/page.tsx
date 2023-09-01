import { use } from "react";
import FeaturedProducts from "./home/FeaturedProducts";
import { getFeaturedProducts } from "@/utils/fetchDataFunctions";
import DealsCarousel from "./home/DealsCarousel";

export default function Home() {
  const data = use(getFeaturedProducts());

  return (
    <>
      <DealsCarousel />
      <FeaturedProducts products={data} />
    </>
  );
}
