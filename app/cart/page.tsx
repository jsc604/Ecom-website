import EmptyBag from "./EmptyBag";
import { cookies } from "next/headers";
import CartSummary from "./CartSummary";
import ShoppingCartItems from "./ShoppingCartItems";

export async function generateMetadata() {
  return {
    title: 'Shopping Bag',
  };
}

export default function Cart() {
  const cookieStore = cookies();
  const token = cookieStore.get("cartItems");
  const cartItems = token && JSON.parse(token.value);

  return (
    <div className="min-h-[80vh] w-11/12 max-w-[1350px] mx-auto">
      <h1 className="text-center font-bold my-8 text-4xl">Shopping Bag</h1>
      {cartItems === undefined || cartItems.length < 1 ? (
        <EmptyBag />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
          <div className="col-span-2">
            <ShoppingCartItems />
          </div>
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  )
}
