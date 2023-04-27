import NotFound from "@/pages/404";
import { UserInfo } from "@/types/user";
import classNames from "@/utils/classNames";
import { trpc } from "@/utils/trpc";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactNode, createContext } from "react";
import { Header, TabMenu } from "../Profile/Header";
import useUserStore from "@/stores/user";

type Props = {
  children: ReactNode;
  className?: string;
};

export const ProfileLayoutContext = createContext<{
  data: UserInfo;
  isOwner: boolean;
} | null>(null);

const ProfileLayout = ({ children, className }: Props) => {
  const router = useRouter();
  const user = useUserStore.use.user();
  const { id } = router.query;
  const { data, isLoading } = trpc.user.findUser.useQuery({
    id: +(id as string),
  });

  console.log(data);

  if (isLoading) {
    return (
      <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <ProfileLayoutContext.Provider value={{ data, isOwner: user?.id == id }}>
      <div className="py-[70px]">
        <Header />
        <div className="flex mt-8 mx-16 gap-8">
          <div className="w-[400px] shadow p-4 bg-white rounded-lg h-fit">
            <TabMenu />
          </div>
          <div className={classNames("w-full", className)}>{children}</div>
        </div>
      </div>
    </ProfileLayoutContext.Provider>
  );
};

export default ProfileLayout;
