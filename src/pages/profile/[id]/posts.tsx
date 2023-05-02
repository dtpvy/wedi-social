import { ProfileLayout } from "@/components/Layout";
import { Post } from "@/components/Post";
import useTranslation from "@/hooks/useTranslation";
import { profilePost } from "@/mocks/post";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { TRACKING_EVENT, TRACKING_PAGE } from "@/constants/tracking";

const Profile = () => {
  const query = trpc.post.userPost.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const utils = trpc.useContext();
  const { data: res, fetchNextPage, isFetching, hasNextPage } = query;
  const data = res?.pages.flatMap((d) => d?.items || []) || [];
  //add tracking
  const tracking = trpc.tracking.add.useMutation();
  useEffect(() => {
    tracking.mutate({
      event: TRACKING_EVENT.ENTER_PROFILE,
      page: TRACKING_PAGE.PROFILE,
    });
  }, []);

  return (
    <ProfileLayout className="w-full shadow bg-white rounded-lg p-4 flex flex-col gap-4">
      {data.map((post) => (
        <Post key={post.id} post={post} refetch={query.refetch} />
      ))}
    </ProfileLayout>
  );
};

export default Profile;
