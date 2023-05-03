import { Event } from '@/components/Event';
import TripLayout from '@/components/Layout/TripLayout';
import { ScheduleDetail } from '@/components/Trip';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React from 'react';

const Schedule = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, refetch } = trpc.schedule.list.useQuery({ tridId: +(id as string) });

  return (
    <TripLayout className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-2">
        {data?.map((schedule) => (
          <Event key={schedule.id} schedule={schedule} refetch={refetch} />
        ))}
      </div>
    </TripLayout>
  );
};

export default Schedule;
