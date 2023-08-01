import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import AccountNav from "./AccountNav";

export async function generateMetadata() {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const page = pathname === '/account/profile' ? 'Profile' : pathname === '/account/order-history' ? 'Order History' : '';

  return {
    title: `${page} - Ecom MN`,
  };
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("userInfo");
  const userInfo = token && JSON.parse(token.value);

  if (!userInfo) {
    redirect(`/login`);
  }

  return (
    <section>
      <div className="grid grid-cols-4 gap-4 my-8">
        <div className="col-span-4 lg:col-span-1">
          <AccountNav />
        </div>
        <div className="col-span-4 lg:col-span-3 w-full">
          {children}
        </div>
      </div>
    </section>
  )
}