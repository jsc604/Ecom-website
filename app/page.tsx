import { use } from "react";
import FeaturedProducts from "./home/FeaturedProducts";
import { getDeals, getFeaturedProducts } from "@/utils/fetchDataFunctions";
import DealsCarousel from "./home/DealsCarousel";

export default function Home() {
  const featuredProducts = use(getFeaturedProducts());
  const deals = use(getDeals());

  return (
    <>
      <DealsCarousel deals={deals} />
      <FeaturedProducts products={featuredProducts} />
    </>
  );
}
