import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyPageCartList from "@/components/mypage/MypageCartList";

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  console.log("mypage > session", session);

  return (
    <div>
      <div>My Page </div>

      <MyPageCartList />
    </div>
  );
}
