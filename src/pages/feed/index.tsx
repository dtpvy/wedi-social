import { FeedLayout } from "@/components/Layout";
import { Post } from "@/components/Post";
import { posts } from "@/mocks/post";

const Feed = () => {
  return (
    <FeedLayout className="pt-8 px-16">
      <div className="grid grid-cols-2 gap-8 pb-8">
        {posts.map((post) => (
          <Post className="border-none shadow-md" key={post.id} post={post} />
        ))}
        {posts.map((post) => (
          <Post className="border-none shadow-md" key={post.id} post={post} />
        ))}
        {posts.map((post) => (
          <Post className="border-none shadow-md" key={post.id} post={post} />
        ))}
      </div>
    </FeedLayout>
  );
};

export default Feed;
