import EmptyBag from "./EmptyBag";
import { cookies } from "next/headers";
import CartContainer from "./CartContainer";
import CheckoutWizard from "../components/CheckoutWizard";

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
      <h1 className="text-center font-bold my-8 text-4xl">Cart</h1>
      {cartItems === undefined || cartItems.length < 1 ? (
        <EmptyBag />
      ) : (
        <>
          <CheckoutWizard activeStep={0} />
          <CartContainer />
        </>
      )}
    </div>
  )
}
