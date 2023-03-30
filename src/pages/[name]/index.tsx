import { ProfileLayout } from "@/components/Layout";
import { Post } from "@/components/Post";
import { profilePost } from "@/mocks/post";

const Profile = () => {
  return (
    <ProfileLayout className="w-full shadow bg-white rounded-lg p-4 flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((index) => (
        <Post key={index} post={profilePost} />
      ))}
    </ProfileLayout>
  );
};

export default Profile;
