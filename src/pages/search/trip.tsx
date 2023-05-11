import { MainLayout } from '@/components/Layout';
import SearchLayout from '@/components/Layout/SearchLayout';
import TripDetail from '@/components/Trip/TripDetail';

import useTranslation from '@/hooks/useTranslation';
import { type SearchState } from '@/stores/search';
import useAppStore from '@/stores/store';

import { getTimePost } from '@/utils/time';
import { trpc } from '@/utils/trpc';
import { Avatar, Button } from '@mantine/core';
import { IconCalendar, IconNews, IconUser } from '@tabler/icons-react';
import Link from 'next/link';

import { useEffect, useState, type ReactElement } from 'react';

const SearchTrip = ({ search, sort, field, privacy, startDate, endDate }: SearchState) => {
  const { t } = useTranslation();
  const user = useAppStore.use.user();

  const { data: trips, refetch } = trpc.search.trip.useQuery({
    search,
    field,
    sort,
    privacy,
    startDate,
    endDate,
  });

  const [trip, setTrip] = useState(trips?.[0]);

  useEffect(() => {
    setTrip(trips?.[0]);
  }, [trips]);

  const joined = (data: typeof trip) => {
    return !!data?.users.find((d) => d.userId === user?.id);
  };

  return (
    <div className="flex gap-6">
      <div className="w-[400px] flex flex-col gap-4 ">
        {trips?.map((trip) => (
          <div
            onClick={() => setTrip(trip)}
            key={trip.id}
            className="bg-white rounded-lg shadow cursor-pointer p-3"
          >
            <div className="flex items-center gap-2">
              <Avatar size="lg" radius="xl" src={trip.imgUrl} />
              <div>
                <div className="font-bold">{trip.name}</div>
                <div className="text-sm text-gray-600 font-medium">{trip.status}</div>
                <div className="text-sm text-gray-600">{getTimePost(trip.createdAt)}</div>
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap mt-2">
              <Button
                leftIcon={<IconUser />}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
              >
                {`${t('totalJoinedText')}: ${trip.users.length}`}
              </Button>
              <Button
                leftIcon={<IconNews />}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              >
                {`${t('totalPostText')}: ${trip._count.posts}`}
              </Button>
              <Button
                leftIcon={<IconCalendar />}
                variant="gradient"
                gradient={{ from: 'teal', to: 'blue', deg: 60 }}
              >
                {`${t('totalScheduleText')}: ${trip._count.schedules}`}
              </Button>
              {!joined(trip) ? (
                <Button color="teal" variant="outline">
                  {t('participatebtnText')}
                </Button>
              ) : (
                <Link href={`/trip/${trip.id}`} className="p-3">
                  {t('viewDetailsText')}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      {!!trip && <TripDetail trip={trip} />}
      {/* {!!posts?.length && <Post className="w-full" post={post || posts[0]} refetch={refetch} />} */}
    </div>
  );
};

SearchTrip.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SearchLayout>{page}</SearchLayout>
    </MainLayout>
  );
};

export default SearchTrip;
