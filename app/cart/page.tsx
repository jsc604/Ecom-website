import EmptyBag from "./EmptyBag";

export default function Cart() {
  return (
    <div className="min-h-[80vh]">
      <h1 className="text-center font-semibold my-8 text-3xl">Shopping Bag</h1>
      <EmptyBag />
    </div>
  )
}
