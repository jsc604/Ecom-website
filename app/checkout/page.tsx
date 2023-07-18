import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ShippingInfo from "./ShippingInfo";
import CheckoutWizard from "../components/CheckoutWizard";

export default function Checkout() {
  const cookieStore = cookies();
  const token = cookieStore.get("cartItems");
  const cartItems = token && JSON.parse(token.value);

  return (
    <div className="min-h-80vh w-11/12 max-w-[1350px] mx-auto">
      <h1 className="text-center font-semibold my-8 text-4xl">Checkout</h1>
      <CheckoutWizard activeStep={1} />
      {cartItems === undefined || cartItems.length < 1 ? (
        redirect('/cart')
      ) : (
        <ShippingInfo />
      )}
    </div>
  )
}
