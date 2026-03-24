import { Navigate, Outlet } from "react-router";
import { useSession } from "@/store/session.ts";

const GuestOnlyLayout = () => {
  const session = useSession();
  if (session) return <Navigate to="/" replace={true} />;

  return <Outlet />;
};

export default GuestOnlyLayout;
