import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminNav from "./AdminNav";

export async function generateMetadata() {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  let page: string;

  switch (pathname) {
    case '/admin/dashboard':
      page = 'Dashboard';
      break;
    case '/admin/products':
      page = 'Admin Products';
      break;
    case '/admin/orders':
      page = 'Admin Orders';
      break;
    case '/admin/users':
      page = 'Admin Users';
      break;
    case '/admin/settings':
      page = 'Admin Settings';
      break;
    default:
      page = '';
      break;
  }
  return {
    title: `${page} - Ecom MN`,
  };
}

export default function AdminLayout({
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

  if (!userInfo.isAdmin) {
    redirect('/');
  }

  return (
    <section>
      <div className="grid grid-cols-4 gap-4 my-8">
        <div className="col-span-4 lg:col-span-1">
          <AdminNav />
        </div>
        <div className="col-span-4 lg:col-span-3 w-full">
          {children}
        </div>
      </div>
    </section>
  )
}