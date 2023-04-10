import classNames from "@/utils/classNames";
import { ReactNode } from "react";
import { Header, TabMenu } from "../Profile/Header";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { Loader } from "@mantine/core";
import NotFound from "@/pages/404";

type Props = {
  children: ReactNode;
  className?: string;
};

const ProfileLayout = ({ children, className }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;
  const { data, isLoading } = trpc.user.findUser.useQuery({
    id: +(id || session?.user.id || ""),
  });

  if (isLoading) {
    return (
      <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <div className="pt-[70px]">
      <Header user={data} />
      <div className="flex mt-8 mx-16 gap-8">
        <div className="w-[400px] shadow p-4 bg-white rounded-lg h-fit">
          <TabMenu />
        </div>
        <div className={classNames("w-full", className)}>{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
