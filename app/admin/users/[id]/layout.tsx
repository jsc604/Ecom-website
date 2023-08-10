import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import UserNav from "./UserNav";
import { use } from "react";

async function fetchUser(id: string, token: string) {
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

  return (
    <section>
      <UserNav id={user._id} name={user.name} />
      {children}
    </section>
  )
}