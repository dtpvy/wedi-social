import { ProfileLayout } from '@/components/Layout';
import { Trip } from '@/components/Trip';
import { trpc } from '@/utils/trpc';

const Trips = () => {
  const { data } = trpc.trip.userTrip.useQuery({});
  return (
    <ProfileLayout className="grid grid-cols-2 w-full gap-4">
      {data?.map((d) => (
        <Trip key={d.tripId} trip={d.trip} className="h-fit" />
      ))}
    </ProfileLayout>
  );
};

export default Trips;
