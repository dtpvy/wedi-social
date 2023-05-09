import { Button, Text } from '@mantine/core';

import { Menu } from '@/components/Menu';
import useUserStore from '@/stores/user';
import { Tab } from '@/types/tab';
import { TripInfo } from '@/types/trip';
import { trpc } from '@/utils/trpc';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { JoinTripStatus } from '@prisma/client';
import {
  IconArticle,
  IconCalendar,
  IconCheck,
  IconUserPlus,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import CreateSchedule from '../Schedule/CreateSchedule';
import useTranslation from '@/hooks/useTranslation';

const TAB_NAME = {
  POSTS: 'posts',
  SCHEDULES: 'schedules',
  MEMBERS: 'members',
  REQUESTS: 'requests',
};

const TAB_LIST: Record<string, Tab> = {
  [TAB_NAME.POSTS]: {
    name: 'posts',
    url: 'posts',
    icon: <IconArticle />,
  },
  [TAB_NAME.SCHEDULES]: {
    name: 'schedules',
    url: 'schedules',
    icon: <IconCalendar />,
  },
  [TAB_NAME.MEMBERS]: {
    name: 'members',
    url: 'members',
    icon: <IconUsers />,
  },
  [TAB_NAME.REQUESTS]: {
    name: 'requests',
    url: 'requests',
    icon: <IconUserPlus />,
  },
};

type Props = {
  trip: TripInfo;
  joined: boolean;
};

const TabMenu = ({ trip, joined }: Props) => {
  const utils = trpc.useContext();

  const router = useRouter();
  const user = useUserStore.use.user();

  const tab = router.asPath.split('/')[2] || TAB_LIST.POSTS.name;

  const handleChangeTab = (tab: string) => {
    router.push(`/trip/${trip?.id}/${tab}`);
  };

  const request = trpc.trip.request.useMutation();
  const leave = trpc.trip.leave.useMutation();
  const deleteTrip = trpc.trip.delete.useMutation();
  const addNoti = trpc.notification.push.useMutation();
  const { t } = useTranslation(); 
  const handleRequest = async () => {
    if (!trip) return;
    try {
      await request.mutateAsync({ id: trip.id });
      await addNoti.mutateAsync({
        content: `${t('wantToJoinTripText')} ${trip.name}`,
        userId: trip.creatorId,
        imgUrl: trip.imgUrl || '',
      });
      utils.trip.get.refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleLeave = async () => {
    if (!trip) return;
    try {
      if (trip.creatorId === user?.id) {
        openDeleteModal();
        return;
      }
      await leave.mutateAsync({ id: trip.id });
      await addNoti.mutateAsync({
        content: `${t('leavedTripText')} ${trip.name}`,
        userId: trip.creatorId,
        imgUrl: trip.imgUrl || '',
      });
      utils.trip.get.refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: t('deleteTripText'),
      centered: true,
      children: <Text size="sm">{t('youLeaveTripDeleteText')}</Text>,
      labels: { confirm: t('leaveText'), cancel: t('cancelText') },
      confirmProps: { color: 'red' },
      onCancel: () => null,
      onConfirm: async () => {
        try {
          await deleteTrip.mutateAsync({ id: trip?.id as number });
          notifications.show({
            message: t('addsuccessText'),
            color: 'green',
            icon: <IconCheck />,
          });
          router.push('/feed');
        } catch (e: any) {
          notifications.show({
            message: t('errorTryAgainText'),
            color: 'red',
            icon: <IconX />,
          });
        }
      },
    });
  };

  const tabs = useMemo(() => {
    const tabs = { ...TAB_LIST };
    if (!user) return tabs;
    tabs[TAB_NAME.POSTS].badgeNumber = trip._count.posts;
    tabs[TAB_NAME.SCHEDULES].badgeNumber = trip._count.posts;
    tabs[TAB_NAME.MEMBERS].badgeNumber = trip.users.filter(
      (d) => d.status === JoinTripStatus.JOINED
    ).length;
    tabs[TAB_NAME.REQUESTS].badgeNumber = trip.users.filter(
      (d) => d.status === JoinTripStatus.PENDING
    ).length;
    return tabs;
  }, [trip._count.posts, trip.users, user]);

  return (
    <>
      <CreateSchedule className="mt-0" tripId={trip?.id as number} />
      <div className="flex flex-col gap-4 mt-4">
        <Menu
          tab={tab}
          showBadgeNumber
          items={tabs}
          onChange={(tab) => handleChangeTab(tab.url)}
          className="bg-white flex items-center text-green-600 p-4 hover:bg-green-600 hover:text-white"
          activeClass="bg-green-600 text-white"
          titleClass="text-md"
          leftIcon={TAB_LIST[tab]?.icon}
        />
      </div>

      {!joined ? (
        <Button
          onClick={handleRequest}
          size="md"
          className="w-full mt-5"
          variant="filled"
          color="green"
        >
          {t('joinTripText')}
        </Button>
      ) : (
        <Button
          onClick={handleLeave}
          size="md"
          className="w-full mt-5"
          variant="filled"
          color="green"
        >
          {t('leaveTripText')}
        </Button>
      )}
      {user?.id === trip?.creatorId && (
        <Button
          onClick={() => handleChangeTab('edit')}
          size="md"
          className="w-full mt-5"
          variant="outline"
          color="green"
        >
          {t('editTripText')}
        </Button>
      )}
    </>
  );
};

export default TabMenu;
