import { FeedLayout, MainLayout } from '@/components/Layout';
import { CreatePost, Post } from '@/components/Post';
import { trpc } from '@/utils/trpc';
import { TRACKING_EVENT, TRACKING_PAGE } from '@/constants/tracking';
import useTranslation from '@/hooks/useTranslation';
import { ReactElement, useEffect } from 'react';

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
  //add tracking
  const tracking = trpc.tracking.add.useMutation();
  useEffect(() => {
    tracking.mutate({
      event: TRACKING_EVENT.ENTER_FEED,
      page: TRACKING_PAGE.FEED,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
          ? t('loadingMoreText')
          : hasNextPage
          ? t('loadMoreText')
          : t('postEndText')}
      </button>
    </>
  );
};

Feed.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <FeedLayout>{page}</FeedLayout>
    </MainLayout>
  );
};

export default Feed;
