import EmptyBag from "./EmptyBag";
import CartItems from "./CartItems";
import { cookies } from "next/headers";

export async function generateMetadata() {
  return {
    title: 'Shopping Bag',
  };
}

export default function Cart() {
  const cookieStore = cookies();
  const token = cookieStore.get("cartItems");
  const cartItems = token && JSON.parse(token.value);

  console.log(cartItems)
  return (
    <div className="min-h-[80vh]">
      <h1 className="text-center font-semibold my-8 text-3xl">Shopping Bag</h1>
      {cartItems === undefined || cartItems.length < 1 ? (
        <EmptyBag />
      ) : (
        <div className="grid lg:grid-cols-4 gap-4 w-4/5 mx-auto">
          <div className="col-span-3">
            <CartItems />
          </div>
        </div>
      )}
    </div>
  )
}
