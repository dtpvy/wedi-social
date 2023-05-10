import { MainLayout, ProfileLayout } from '@/components/Layout';
import { Trip } from '@/components/Trip';
import { trpc } from '@/utils/trpc';
import { ReactElement } from 'react';

const Trips = () => {
  const { data } = trpc.trip.userTrip.useQuery({});
  return (
    <>
      {data?.map((d) => (
        <Trip key={d.tripId} trip={d.trip} className="h-fit" />
      ))}
    </>
  );
};

Trips.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ProfileLayout className="grid grid-cols-2 w-full gap-4">{page}</ProfileLayout>
    </MainLayout>
  );
};

export default Trips;
