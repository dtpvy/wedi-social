import { Header, TabMenu } from '@/components/Trip/Header';
import NotFound from '@/pages/404';
import useUserStore from '@/stores/user';
import classNames from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Loader, Stepper, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { JoinTripStatus, Trip, TripStatus } from '@prisma/client';
import { IconCalendarTime, IconCheck, IconMapPinCheck, IconWalk, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { ReactNode, createContext } from 'react';
import useTranslation from '@/hooks/useTranslation';

type Props = {
  children: ReactNode;
  className?: string;
};

const TRIP_STATUS = {
  [TripStatus.SCHEDULE]: {
    title: 'Schedule',
    description: '',
    icon: <IconCalendarTime />,
  },
  [TripStatus.INPROGRESS]: {
    title: 'Inprogress',
    description: '',
    icon: <IconWalk />,
  },
  [TripStatus.DONE]: {
    title: 'Done',
    description: '',
    icon: <IconMapPinCheck />,
  },
};

export const TripLayoutContext = createContext<{
  data: Trip;
  joined: boolean;
} | null>(null);

const TripLayout = ({ children, className }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, refetch } = trpc.trip.get.useQuery({
    id: +(id as string),
  });
  const user = useUserStore.use.user();

  const done = trpc.trip.done.useMutation();

  const active = Object.keys(TRIP_STATUS).findIndex((key) => key === data?.trip?.status);

  const {t} = useTranslation();

  const handleDone = () => {
    const trip = data?.trip;
    if (data?.trip?.status !== TripStatus.INPROGRESS || !trip || trip.creatorId !== user?.id)
      return;
    modals.openConfirmModal({
      title: t('confirmDoneText'),
      centered: true,
      children: <Text size="sm">Xác nhận chuyến đi kết thúc</Text>,
      labels: { confirm: t('yesText'), cancel: t('cancelText') },
      confirmProps: { color: 'red' },
      onCancel: () => null,
      onConfirm: async () => {
        try {
          await done.mutateAsync({ id: trip.id });
          notifications.show({
            message: t('addsuccessText'),
            color: 'green',
            icon: <IconCheck />,
          });
          refetch();
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

  if (isLoading) {
    return <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />;
  }

  if (!data?.trip) {
    return <NotFound />;
  }

  return (
    <TripLayoutContext.Provider value={{ data: data.trip, joined: data.join }}>
      <div className="py-[70px]">
        <Header trip={data.trip} />
        <div className="flex mt-8 mx-16 gap-8">
          <div className="w-[400px] shadow p-4 bg-white rounded-lg h-fit">
            <TabMenu trip={data.trip} joined={data.join} />
          </div>
          <div className={classNames('w-full', className)}>
            <Stepper
              color="teal"
              size="lg"
              active={active + 1}
              onStepClick={handleDone}
              className="bg-white shadow rounded-lg p-4"
            >
              {Object.keys(TRIP_STATUS).map((key, index) => (
                <Stepper.Step
                  key={index}
                  icon={TRIP_STATUS[key as keyof typeof TRIP_STATUS].icon}
                  label={TRIP_STATUS[key as keyof typeof TRIP_STATUS].title}
                  description={TRIP_STATUS[key as keyof typeof TRIP_STATUS].description}
                />
              ))}
            </Stepper>
            {children}
          </div>
        </div>
      </div>
    </TripLayoutContext.Provider>
  );
};

export default TripLayout;
