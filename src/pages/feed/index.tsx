import { FeedLayout } from '@/components/Layout';
import { CreatePost, Post } from '@/components/Post';
import { trpc } from '@/utils/trpc';
import useTranslation from '@/hooks/useTranslation';

const Feed = () => {
  const query = trpc.post.feed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const { data: res, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = query;
  const data = res?.pages.flatMap((d) => d?.items || []) || [];
  const { t } = useTranslation();

  return (
    <FeedLayout className="pt-8 px-[200px] w-full">
      <CreatePost refetch={refetch} />
      <div className="flex flex-col gap-8 pb-8 mt-8">
        {data.map((post) => (
          <Post key={post.id} post={post} refetch={query.refetch} />
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
          : t("notifEndText")
        }
      </button>
    </FeedLayout>
  );
};

export default Feed;
