import useAppStore from '@/stores/store';
import { trpc } from '@/utils/trpc';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const useAuth = () => {
  const session = useSession();
  const { data, status } = session;
  const profile = data ? data.user : null;

  const setUser = useAppStore.use.setUser();

  const { data: user } = trpc.user.findUser.useQuery(
    {
      id: profile?.id as number,
    },
    { enabled: !!profile?.id }
  );

  useEffect(() => {
    if (!user) return;
    setUser(user);
  }, [setUser, user]);

  return session;
};

export default useAuth;
