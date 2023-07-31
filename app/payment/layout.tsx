import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: 'Payment - Ecom MN',
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
    <section>
      <h1 className="text-center font-semibold my-8 text-4xl">Payment</h1>
      {children}
    </section>
  )
}
