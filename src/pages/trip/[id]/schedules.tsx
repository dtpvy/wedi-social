import { Event } from '@/components/Event';
import { MainLayout } from '@/components/Layout';
import TripLayout from '@/components/Layout/TripLayout';
import useAppStore from '@/stores/store';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const Schedules = () => {
  const router = useRouter();
  const { id } = router.query;
  const joined = useAppStore.use.trip().joined;
  const { data, refetch } = trpc.schedule.list.useQuery({ tridId: +(id as string) });
  console.log({ joined });
  return (
    <div className="grid grid-cols-2 gap-4">
      {data?.map((schedule) => (
        <Event key={schedule.id} schedule={schedule} refetch={refetch} joinTrip={joined} />
      ))}
    </div>
  );
};

Schedules.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TripLayout className="w-full flex flex-col gap-4">{page}</TripLayout>
    </MainLayout>
  );
};

export default Schedules;
