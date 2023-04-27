import React from "react";
import { useRouter } from "next/router";
import { UserDetail } from "@/components/Admin/User";
import { trpc } from "@/utils/trpc";
import Post from "@/components/Admin/User/Post";

const User = () => {
  const router = useRouter();
  let userId = parseInt(router.query.id as string, 10);
  let { data: postList } = trpc.admin.userPosts.useQuery({ userId: userId });
  const { data: user, refetch } = trpc.admin.userDetail.useQuery({
    id: userId,
  });
  let posts = postList?.map((post) => {
    let locations = post.locations.map((l) => {
      let temp = {
        status: l.location.status,
        name: l.location.name,
        address: `${l.location.street}, ${l.location.ward}, ${l.location.district}, ${l.location.city}`,
      };
      return temp;
    });
    return (
      <div>
        <Post
          post={{
            content: post.content,
            id: post.id,
            numOfReactions: post.reactions.length,
            numOfComments: post.comments.length,
            locations: locations,
            userName: user?.name,
            imgURL: post.imgUrls,
          }}
        />
        <p>{locations.length}</p>
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
