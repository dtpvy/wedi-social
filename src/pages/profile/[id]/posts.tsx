import { ProfileLayout } from '@/components/Layout';
import { CreatePost, Post } from '@/components/Post';
import { trpc } from '@/utils/trpc';

import { useEffect } from 'react';
import { TRACKING_EVENT, TRACKING_PAGE } from '@/constants/tracking';
import useTranslation from '@/hooks/useTranslation';

const Profile = () => {
  const query = trpc.post.userPost.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );
  const { t } = useTranslation();
  const { data: res, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = query;
  const data = res?.pages.flatMap((d) => d?.items || []) || [];
  //add tracking
  const tracking = trpc.tracking.add.useMutation();
  useEffect(() => {
    tracking.mutate({
      event: TRACKING_EVENT.ENTER_PROFILE,
      page: TRACKING_PAGE.PROFILE,
    });
  }, []);
  //
  return (
    <ProfileLayout className="w-full flex flex-col gap-4">
      <CreatePost refetch={refetch} />
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
          ? t("loadingMoreText")
          : hasNextPage
          ? t("loadMoreText")
          : t("postEndText")}
      </button>
    </ProfileLayout>
  );
};

export default Profile;
