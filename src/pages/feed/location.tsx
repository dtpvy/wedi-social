import { FeedLayout } from '@/components/Layout';
import { Location as LocationComponent } from '@/components/Location';
import { trpc } from '@/utils/trpc';

const Location = () => {
  const query = trpc.post.feed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const utils = trpc.useContext();
  const { data: res, fetchNextPage, isFetching, hasNextPage } = query;
  const data = res?.pages.flatMap((d) => d?.items || []) || [];

  return (
    <FeedLayout className="pt-8 px-16 w-full">
      <div className="grid grid-cols-2 gap-8 pb-8">
        {data?.map((_, index) => (
          <LocationComponent key={index} />
        ))}
      </div>
    </FeedLayout>
  );
};

export default Location;
