import { cookies } from "next/headers";
import LoginContainer from "./LoginContainer";
import { redirect } from "next/navigation";

export default function LoginPortal() {
  const cookieStore = cookies();
  const token = cookieStore.get("userInfo");
  const userInfo = token && JSON.parse(token.value);

  return (
    <>
      {!userInfo ? (
        <LoginContainer />
      ) : (
        redirect('/account/profile')
      )}
    </>
  )
}
