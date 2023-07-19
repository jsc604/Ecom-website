import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import CheckoutWizard from "../components/CheckoutWizard";
import PaymentMethod from "./PaymentMethod";

export async function generateMetadata() {
  return {
    title: 'Payment',
  };
}

export default function Payment() {
  const cookieStore = cookies();
  const cartToken = cookieStore.get("cartItems");
  const cartItems = cartToken && JSON.parse(cartToken.value);
  const shippingToken = cookieStore.get("shippingInfo");
  const shippingInfo = shippingToken && JSON.parse(shippingToken.value);

  if (!cartItems || cartItems.length < 1) {
    redirect('/cart');
  }

  if (!shippingInfo) {
    redirect('/checkout');
  }

  return (
    <div className="min-h-80vh w-11/12 max-w-[1350px] mx-auto">
      <h1 className="text-center font-semibold my-8 text-4xl">Payment</h1>
      <CheckoutWizard activeStep={2} />
      <PaymentMethod />
    </div>
  )
}
