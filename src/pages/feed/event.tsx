import { TripEvent } from '@/components/Event';
import { FeedLayout, MainLayout } from '@/components/Layout';
import useTranslation from '@/hooks/useTranslation';
import { trpc } from '@/utils/trpc';
import { Button } from '@mantine/core';
import { ReactElement, useState } from 'react';

const Event = () => {
  const [join, setJoin] = useState<'all' | 'joined' | 'notjoin'>('all');
  const { data, refetch } = trpc.schedule.feed.useQuery({ joined: join });
  const { t } = useTranslation();
  return (
    <>
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
          {t('participatebtnText')}
        </Button>
        <Button
          onClick={() => setJoin('notjoin')}
          radius="xl"
          variant={join === 'notjoin' ? 'filled' : 'outline'}
          color="green"
        >
          {t('noparticipatebtnText')}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 pb-8">
        {data?.map((d) => (
          <TripEvent key={d.id} event={d} refetch={refetch} />
        ))}
      </div>
    </>
  );
};

Event.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <FeedLayout>{page}</FeedLayout>
    </MainLayout>
  );
};

export default Event;
