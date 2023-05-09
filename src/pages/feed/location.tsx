import { FeedLayout } from '@/components/Layout';
import { Location as LocationComponent } from '@/components/Location';
import { trpc } from '@/utils/trpc';
import useTranslation from '@/hooks/useTranslation';
const Location = () => {
  const query = trpc.location.feed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const { data: res, fetchNextPage, isFetchingNextPage, hasNextPage } = query;
  const data = res?.pages.flatMap((d) => d?.items || []) || [];
  const { t } = useTranslation();
  return (
    <FeedLayout className="pt-8 px-[200px] w-full">
      <div className="grid grid-cols-2 gap-8 pb-8">
        {data?.map((d) => (
          <LocationComponent key={d.id} location={d} />
        ))}
      </div>
      <button
        data-testid="loadMore"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="cursor-pointer px-4 py-2 text-teal-700 underline rounded disabled:opacity-50 w-full text-center"
      >
        {isFetchingNextPage
          ? t("loadingMoreText")
          : hasNextPage
          ? t("loadMoreText")
          : t("locationEndText")}
      </button>
    </FeedLayout>
  );
};

export default Location;
