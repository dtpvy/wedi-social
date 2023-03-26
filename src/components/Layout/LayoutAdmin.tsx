import { TAB_LIST } from "@/constants/admin";

import React, { ReactNode, useState } from "react";
import Menu from "@/components/Admin/Menu";
import { useRouter } from "next/router";
import { Tab } from "@/types/tab";

type Props = {
  children: ReactNode;
};

const LayoutAdmin = ({ children }: Props) => {
  const route = useRouter();
  const tab = route.asPath.split("/")[2] || TAB_LIST.DASHBOARD.name;

  const handleChangeTab = (tab: Tab) => {
    route.push(`/admin/${tab.url}`);
  };

  return (
    <div className="flex h-screen">
      <div className="w-[200px] px-5">
        <Menu tab={tab} onChangeTab={handleChangeTab} />
      </div>
      <div className="w-full border-l">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
