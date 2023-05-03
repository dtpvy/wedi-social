import React from 'react';
import { useRouter } from 'next/router';
import { UserDetail } from '@/components/Admin/User';
import { trpc } from '@/utils/trpc';
import Post from '@/components/Admin/User/Post';

const User = () => {
  const router = useRouter();
  let userId = parseInt(router.query.id as string, 10);
  let { data: postList } = trpc.admin.userPosts.useQuery({ userId: userId });
  const { data: user, refetch } = trpc.admin.userDetail.useQuery({
    id: userId,
  });
  let posts = postList?.map((post) => {
    return (
      <div className="w-9/12">
        <Post
          post={{
            content: post.content,
            id: post.id,
            numOfReactions: post.reactions.length,
            numOfComments: post.comments.length,
            locationId: post.locations[0].locationId,
            userName: user?.name,
            imgURL: post.imgUrls,
          }}
        />
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center">
      {/* UserDetail: {id} */}
      <UserDetail />
      {posts}
    </div>
  );
};

export default User;
