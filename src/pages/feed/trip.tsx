import { FeedLayout } from '@/components/Layout';
import { PostTrip } from '@/components/Post';
import { Trip as TripWidget } from '@/components/Trip';
import { posts } from '@/mocks/post';
import { trpc } from '@/utils/trpc';
import { Carousel } from '@mantine/carousel';

const Trip = () => {
  const { data } = trpc.trip.feed.useQuery({});

  const query = trpc.post.feedTrip.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const { data: res, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = query;
  const posts = res?.pages.flatMap((d) => d?.items || []) || [];

  return (
    <FeedLayout className="pt-8 px-[200px] w-full">
      <Carousel
        styles={{
          control: {
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
        }}
        slideSize="50%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={2}
      >
        {data?.map((d) => (
          <Carousel.Slide key={d.id}>
            <TripWidget trip={d} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <div className="flex flex-col gap-5 pb-8 mt-5">
        {posts.map((post) => (
          <PostTrip key={post.id} post={post} refetch={refetch} />
        ))}
        <button
          data-testid="loadMore"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="cursor-pointer px-4 py-2 text-teal-700 underline rounded disabled:opacity-50 w-full text-center"
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    </FeedLayout>
  );
};

export default Trip;
