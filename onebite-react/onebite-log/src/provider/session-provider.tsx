import { type ReactNode, useEffect } from "react";
import supabase from "@/lib/supabase.ts";
import {
  useIsSessionLoaded,
  useSession,
  useSetSession,
} from "@/store/session.ts";
import GlobalLoader from "@/components/global-loader.tsx";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    session?.user.id,
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded || isProfileLoading) return <GlobalLoader />;

  return children;
};

export default SessionProvider;
