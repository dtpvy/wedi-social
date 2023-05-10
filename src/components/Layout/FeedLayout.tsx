import classNames from '@/utils/classNames';
import { type ReactNode } from 'react';

import { CreateTrip } from '@/components/Trip';
import useUserStore from '@/stores/user';
import type { Tab } from '@/types/tab';
import { IconBus, IconCalendarTime, IconMapPinFilled, IconNews } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';
import { Avatar, Button } from '@mantine/core';
import { calcFriend } from '@/utils/user';
import dayjs from 'dayjs';
import { User } from '@prisma/client';
import useOpenMessageDialog from '@/hooks/useOpenMessageDialog';
import useTranslation from '@/hooks/useTranslation';
type Props = {
  children: ReactNode;
  className?: string;
};

const FeedLayout = ({ children, className }: Props) => {
  const { t } = useTranslation();

  const TAB_LIST: Record<string, Tab> = {
    FEED: {
      name: t('feedText'),
      url: '',
      icon: <IconNews size={30} />,
    },
    TRIP: {
      name: t('tripText'),
      url: 'trip',
      icon: <IconBus size={30} />,
    },
    EVENT: {
      name: t('eventText'),
      url: 'event',
      icon: <IconCalendarTime size={30} />,
    },
    LOCATION: {
      name: t('locationText'),
      url: 'location',
      icon: <IconMapPinFilled size={30} />,
    },
  };

  const router = useRouter();
  const { show } = useOpenMessageDialog();
  const tab = router.asPath.split('/')[2] || TAB_LIST.FEED.name;
  const { data } = trpc.user.list.useQuery({});
  const user = useUserStore.use.user();

  const addFriend = trpc.friend.add.useMutation();
  const addNoti = trpc.notification.push.useMutation();

  const handleAdd = async (profile: User) => {
    try {
      await addFriend.mutateAsync({ userId: profile.id });
      await addNoti.mutateAsync({
        content: String(t('friendnotifText')),
        userId: profile.id,
        imgUrl: user?.imgUrl || '',
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 mt-[70px] z-[5] shadow-md">
        <div className="flex flex-col gap-4 bg-white w-[250px] h-full p-4">
          <CreateTrip />
          {Object.keys(TAB_LIST).map((key, index) => (
            <Link
              key={index}
              href={`/feed/${TAB_LIST[key].url}`}
              className={classNames(
                'px-5 uppercase py-3 rounded-lg text-gray-400 no-underline flex gap-4 items-center bg-white hover:bg-teal-600 hover:text-white',
                { 'bg-teal-700 text-white': tab === TAB_LIST[key].name }
              )}
            >
              {TAB_LIST[key].icon}
              <div className="font-bold text-md">{TAB_LIST[key].name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="pt-[70px] px-[100px] flex gap-8 max-h-[100vh] overflow-auto">
        <div className={classNames(className)}>{children}</div>
      </div>
      <div className="absolute top-0 bottom-0 right-0 mt-[70px] z-[5] shadow-md">
        <div className="flex flex-col gap-4 bg-white w-[250px] h-full pb-4 px-4 pt-9">
          {data?.map((d) => (
            <div key={d.id} className="flex flex-col gap-1 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Avatar radius="xl" src={d.imgUrl} />
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-gray-600 text-sm">
                    {`${t('memberSinceText')} ${dayjs(d.createdAt).format('DD/MM/YYYY')}`}
                  </div>
                </div>
              </div>
              <div>{d.bio}</div>
              {d.friends.length + d.friends.length === 0 ? (
                <Button
                  onClick={() => handleAdd(d)}
                  size="xs"
                  fullWidth
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                >
                  {t('addFriendText')}
                </Button>
              ) : (
                <Button
                  onClick={() => show(d)}
                  size="xs"
                  fullWidth
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                >
                  {t('messengerText')}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedLayout;
