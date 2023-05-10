import useUserStore from '@/stores/auth';
import { trpc } from '@/utils/trpc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();
  const session = useSession();
  const { data, status } = session;
  const profile = data ? data.user : null;
  const setUser = useUserStore.use.setUser();

  const { data: user } = trpc.user.findUser.useQuery(
    {
      id: profile?.id as number,
    },
    { enabled: !!profile?.id }
  );

  useEffect(() => {
    setUser({ user: user || null, status });
  }, [setUser, status, user]);

  return session;
};

export default useAuth;
