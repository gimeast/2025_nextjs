import { useSession } from "@/store/session.ts";
import { Navigate, Outlet } from "react-router";

const MemberOnlyLayout = () => {
  const session = useSession();
  if (session) return <Outlet />;

  return <Navigate to="/sign-in" />;
};

export default MemberOnlyLayout;
