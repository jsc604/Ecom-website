import EmptyBag from "./EmptyBag";
import CartContainer from "./CartContainer";

export async function generateMetadata() {
  return {
    title: 'Cart',
  };
}

export default function Cart() {

  return (
    <div className="min-h-[80vh] w-11/12 max-w-[1350px] mx-auto">
      <h1 className="text-center font-bold my-8 text-4xl">Cart</h1>
      <EmptyBag />
      <CartContainer />
    </div>
  )
}
