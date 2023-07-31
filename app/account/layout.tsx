import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import AccountNav from "./AccountNav";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("userInfo");
  const userInfo = token && JSON.parse(token.value);

  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  console.log(pathname);

  if (!userInfo) {
    redirect(`/login?redirect=${encodeURIComponent(pathname)}`);
  }

  return (
    <section>
      <div className="grid grid-cols-4 gap-4 my-8">
        <div className="col-span-1">
          <AccountNav />
        </div>
        <div className="col-span-3">
          {children}
        </div>
      </div>
    </section>
  )
}