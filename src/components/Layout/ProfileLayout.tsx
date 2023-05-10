import NotFound from '@/pages/404';
import useProfileStore from '@/stores/store';
import classNames from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Header, TabMenu } from '../Profile/Header';
import { CreateTrip } from '../Trip';

type Props = {
  children: ReactNode;
  className?: string;
};

const ProfileLayout = ({ children, className }: Props) => {
  const router = useRouter();
  const setProfile = useProfileStore.use.setProfile();

  const { id } = router.query;
  const { data, isLoading } = trpc.user.findUser.useQuery(
    {
      id: +(id as string),
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        setProfile(data);
      },
    }
  );

  if (isLoading) {
    return <LoadingOverlay visible overlayBlur={2} className="top-0 left-0 right-0 bottom-0" />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <div className="py-[70px]">
      <Header />
      <div className="flex mt-8 mx-16 gap-8">
        <div className="w-[400px] shadow p-4 bg-white rounded-lg h-fit">
          <CreateTrip className="mt-0" />
          <TabMenu />
        </div>
        <div className={classNames('w-full', className)}>{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
