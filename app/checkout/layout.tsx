import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Checkout - Ecom MN',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cookieStore = cookies();
  const cartToken = cookieStore.get("cartItems");
  const cartItems = cartToken && JSON.parse(cartToken.value);

  if (!cartItems || cartItems.length < 1) {
    redirect('/cart');
  }

  return (
    <section>
      <h1 className="text-center font-bold my-8 text-4xl">Checkout</h1>
      {children}
    </section>
  )
}