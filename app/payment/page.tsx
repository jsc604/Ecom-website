import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import CheckoutWizard from "../components/CheckoutWizard";

export default function Payment() {
  const cookieStore = cookies();
  const cartToken = cookieStore.get("cartItems");
  const cartItems = cartToken && JSON.parse(cartToken.value);
  const shippingToken = cookieStore.get("shippingInfo");
  const shippingInfo = shippingToken && JSON.parse(shippingToken.value);

  return (
    <div className="min-h-80vh w-11/12 max-w-[1350px] mx-auto">
      <h1 className="text-center font-semibold my-8 text-4xl">Payment</h1>
      <CheckoutWizard activeStep={2} />
      {
        !shippingInfo?.firstName
          || !shippingInfo?.lastName
          || !shippingInfo?.email
          || !shippingInfo?.address
          || !shippingInfo?.city
          || !shippingInfo?.province
          || !shippingInfo?.postalCode
          ? cartItems === undefined || cartItems.length < 1
            ? redirect('/cart')
            : redirect('/checkout')
          : (
            <></>
          )}
    </div>
  )
}
