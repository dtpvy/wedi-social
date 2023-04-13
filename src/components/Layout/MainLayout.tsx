import React, { ReactNode, createContext } from "react";
import { Search } from "../Feed";
import { UserInfo } from "@/types/user";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { Loader } from "@mantine/core";

type Props = {
  children: ReactNode;
};

export const MainContext = createContext<UserInfo | null>(null);

const LayoutMain = ({ children }: Props) => {
  const { data: session } = useSession();

  const { data, isLoading } = trpc.user.findUser.useQuery({
    id: +(session?.user.id || ""),
  });

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <MainContext.Provider value={data}>
      <div className="bg-gray-100 min-h-screen">
        <div className="w-full fixed shadow-md mb-4 z-10">
          <Search />
        </div>
        {children}
      </div>
    </MainContext.Provider>
  );
};

export default LayoutMain;
