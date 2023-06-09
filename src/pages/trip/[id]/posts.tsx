import TripLayout from '@/components/Layout/TripLayout';
import { CreatePost, Post } from '@/components/Post';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { useEffect } from 'react';
import { TRACKING_EVENT, TRACKING_PAGE } from '@/constants/tracking';
import useTranslation from '@/hooks/useTranslation';
import { MainLayout } from '@/components/Layout';

const Posts = () => {
  const router = useRouter();
  const { id } = router.query;
  //add tracking
  const tracking = trpc.tracking.add.useMutation();
  useEffect(() => {
    tracking.mutate({
      event: TRACKING_EVENT.ENTER_TRIP,
      page: TRACKING_PAGE.TRIP,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //
  const query = trpc.trip.post.useInfiniteQuery(
    { tripId: +(id as string) },
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );
  const { t } = useTranslation();
  const { data: res, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = query;
  const data = res?.pages.flatMap((d) => d?.items || []) || [];

  return (
    <>
      <CreatePost refetch={refetch} tripId={+(id as string)} />
      {data.map((post) => (
        <Post key={post.id} post={post} refetch={query.refetch} />
      ))}
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

Posts.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TripLayout className="w-full flex flex-col gap-4">{page}</TripLayout>
    </MainLayout>
  );
};

export default Posts;
