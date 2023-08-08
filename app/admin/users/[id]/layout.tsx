import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import UserNav from "./UserNav";
import { capitalizeWord } from "@/app/products/[category]/page";
import { use } from "react";

export async function generateMetadata() {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const pageName = pathname.split('/')[4];
  return {
    title: `Admin Users ${capitalizeWord(pageName)} - Ecom MN`,
  };
}

function fetchUser(id: string, token: string) {
  return fetch(`http://localhost:3000/api/admin/users/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}

export default function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const pageName = pathname.split('/')[4];

  const cookieStore = cookies();
  const token = cookieStore.get("userInfo");
  const userInfo = token && JSON.parse(token.value);

  const { id } = params;

  if (!userInfo) {
    redirect(`/login`);
  }

  if (!userInfo.isAdmin) {
    redirect('/');
  }

  const user = use(fetchUser(id, userInfo.token));
  console.log(user);

  return (
    <section>
      <UserNav id={user._id} name={user.name} pageName={pageName} />
      {children}
    </section>
  )
}