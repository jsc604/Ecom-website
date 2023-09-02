import { use } from "react";
import Settings from "./page";
import { getDeals } from "@/utils/fetchDataFunctions";

export default function AdminLayout() {
  const data = use(getDeals());

  return (
    <section>
      <Settings dealsData={data} />
    </section>
  )
}