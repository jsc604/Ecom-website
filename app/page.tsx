// import db from "@/utils/db";
import FeaturedProducts from "./Home/FeaturedProducts";

export default function Home() {
  // async function fetchData() {
  //   await db.connect();
  //   await db.disconnect();
  // }

  // fetchData();

  return (
    <main className="min-h-80vh">
      <FeaturedProducts />
    </main>
  );
}
