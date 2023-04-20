import { ProfileLayout } from "@/components/Layout";
import { Post } from "@/components/Post";
import { profilePost } from "@/mocks/post";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  // console.log("??????? signinText", );

  return (
    <ProfileLayout className="w-full shadow bg-white rounded-lg p-4 flex flex-col gap-4">
      {t("signinText")}
      {[1, 2, 3, 4, 5].map((index) => (
        <Post key={index} post={profilePost} />
      ))}
    </ProfileLayout>
  );
};

export default Profile;
