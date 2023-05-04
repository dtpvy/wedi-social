import { FeedLayout } from '@/components/Layout';
import { TripEvent } from '@/components/Event';
import { Button, Input, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { trpc } from '@/utils/trpc';
import { ScheduleDetail } from '@/types/schedule';
import { useState } from 'react';

const Event = () => {
  const [join, setJoin] = useState<'all' | 'joined' | 'notjoin'>('all');
  const { data, refetch } = trpc.schedule.feed.useQuery({ joined: join });

  return (
    <FeedLayout className="pt-8 px-[200px] w-full">
      <div className="bg-white rounded shadow p-4 flex items-center gap-4 mb-8">
        <Button
          onClick={() => setJoin('all')}
          radius="xl"
          variant={join === 'all' ? 'filled' : 'outline'}
          color="green"
        >
          All
        </Button>
        <Button
          onClick={() => setJoin('joined')}
          radius="xl"
          variant={join === 'joined' ? 'filled' : 'outline'}
          color="green"
        >
          Tham gia
        </Button>
        <Button
          onClick={() => setJoin('notjoin')}
          radius="xl"
          variant={join === 'notjoin' ? 'filled' : 'outline'}
          color="green"
        >
          Chua tham gia
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 pb-8">
        {data?.map((d) => (
          <TripEvent key={d.id} event={d} refetch={refetch} />
        ))}
      </div>
    </FeedLayout>
  );
};

export default Event;
