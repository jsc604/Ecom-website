import { cookies } from "next/headers";
import LoginContainer from "./LoginContainer";
import { redirect } from "next/navigation";

export default function LoginPortal() {
  const cookieStore = cookies();
  const token = cookieStore.get("userInfo");
  const userInfo = token && JSON.parse(token.value);

  return (
    <div className="w-11/12 max-w-[1350px] mx-auto">
      {!userInfo ? (
        <LoginContainer />
      ) : (
        redirect('/account/profile')
      )}
    </div>
  )
}
