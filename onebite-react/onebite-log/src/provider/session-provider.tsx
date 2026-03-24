import { type ReactNode, useEffect } from "react";
import supabase from "@/lib/supabase.ts";
import { useIsSessionLoaded, useSetSession } from "@/store/session.ts";
import GlobalLoader from "@/components/global-loader.tsx";

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  return children;
};

export default SessionProvider;
