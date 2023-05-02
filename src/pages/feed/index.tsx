import { FeedLayout } from "@/components/Layout";
import { CreatePost, Post } from "@/components/Post";
import { trpc } from "@/utils/trpc";
import { TRACKING_EVENT, TRACKING_PAGE } from "@/constants/tracking";
import { useEffect } from "react";

const Feed = () => {
  const query = trpc.post.feed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const utils = trpc.useContext();
  const { data: res, fetchNextPage, isFetching, hasNextPage, refetch } = query;
  const data = res?.pages.flatMap((d) => d?.items || []) || [];
  //add tracking
  const tracking = trpc.tracking.add.useMutation();
  useEffect(() => {
    tracking.mutate({
      event: TRACKING_EVENT.ENTER_FEED,
      page: TRACKING_PAGE.FEED,
    });
  }, []);

  return (
    <FeedLayout className="pt-8 px-[200px] w-full">
      <CreatePost refetch={refetch} />
      <div className="flex flex-col gap-8 pb-8 mt-8">
        {data.map((post) => (
          <Post key={post.id} post={post} refetch={query.refetch} />
        ))}
      </div>
    </FeedLayout>
  );
};

export default Feed;
