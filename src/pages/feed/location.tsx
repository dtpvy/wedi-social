import { FeedLayout } from "@/components/Layout";
import { Location as LocationComponent } from "@/components/Location";

const Location = () => {
  return (
    <FeedLayout className="pt-8 px-16 w-full">
      <div className="grid grid-cols-2 gap-8 pb-8">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <LocationComponent key={index} />
        ))}
      </div>
    </FeedLayout>
  );
};

export default Location;
