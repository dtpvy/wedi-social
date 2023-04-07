import { TAB_LIST } from "@/constants/admin";

import React, { ReactNode, useState } from "react";
import Menu from "@/components/Admin/Menu";
import { Search } from "../Admin/Dashboard";
import { useRouter } from "next/router";
import { Tab } from "@/types/tab";
import { useSession } from "next-auth/react";

type Props = {
  children: ReactNode;
};

const LayoutAdmin = ({ children }: Props) => {
  const router = useRouter();
  const tab = router.asPath.split("/")[2] || TAB_LIST.DASHBOARD.name;

  const handleChangeTab = (tab: Tab) => {
    router.push(`/admin/${tab.url}`);
  };

  return (
    <div className="flex h-screen">
      <div className="w-[200px] px-5">
        <Menu tab={tab} onChangeTab={handleChangeTab} />
      </div>
      <div className="w-full border-l">
        <Search />
        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;