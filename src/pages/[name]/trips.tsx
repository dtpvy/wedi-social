import { ProfileLayout } from "@/components/Layout";
import { Trip } from "@/components/Trip";

const Trips = () => {
  return (
    <ProfileLayout className="grid grid-cols-2 w-full gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <Trip key={index} />
      ))}
    </ProfileLayout>
  );
};

export default Trips;
