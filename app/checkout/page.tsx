import { redirect } from "next/navigation";
import LoginCard from "./LoginCard";
import OrderSummary from "./OrderSummary";
import ShippingInfo from "./ShippingInfo";
import { cookies } from "next/headers";

export default function Checkout() {
  const cookieStore = cookies();
  const token = cookieStore.get("cartItems");
  const cartItems = token && JSON.parse(token.value);

  return (
    <div className="min-h-80vh w-11/12 max-w-[1350px] mx-auto">
      <h1 className="text-center font-semibold my-8 text-4xl">Checkout</h1>
      {cartItems === undefined || cartItems.length < 1 ? (
        redirect('/cart')
      ) : (
        <>
          <div className="grid grid-cols-12 ml:gap-16">
            <div className="col-span-12 ml:col-span-8 xl:col-span-6 xl:col-start-2">
              <LoginCard />
              <ShippingInfo />
            </div>
            <div className="col-span-12 ml:col-span-4 xl:col-span-3">
              <OrderSummary />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
