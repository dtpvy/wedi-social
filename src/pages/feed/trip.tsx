import { FeedLayout } from "@/components/Layout";
import { PostTrip } from "@/components/Post";
import { posts } from "@/mocks/post";

const Trip = () => {
  return (
    <FeedLayout className="pt-8 px-16 w-full">
      <div className="grid grid-cols-2 gap-8 pb-8">
        {posts.map((post) => (
          <PostTrip key={post.id} />
        ))}
      </div>
    </FeedLayout>
  );
};

export default Trip;
