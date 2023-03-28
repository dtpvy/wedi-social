import { TAB_LIST_FEED } from "@/constants/Feed";

import React, { ReactNode, useState } from "react";
import Sidebar from "@/components/Feed/Sidebar/sidebar";
import { useRouter } from "next/router";
import { Tab } from "@/types/tab";
import   Search  from "@/components/Feed/Search/Search";
import Main from "@/components/Feed/Main/Main";

import Image from 'next/image'

type Props = {
  children: ReactNode;
};

const Feed = ({ children }: Props) => {
  const route = useRouter();
  const tab = route.asPath.split("/")[1] || TAB_LIST_FEED.DASHBOARD.name;

  const handleChangeTab = (tab: Tab) => {
    route.push(`/feed/${tab.url}`);
  };

  return (
    <div className="  h-screen ">
      
      <Search></Search>
      <div className="flex flex-row h-screen w-screen gap-x-4">
        
          <div className="w-[200px] h-full px-5 ">
            <Sidebar tab={tab} onChangeTab={handleChangeTab} />
          </div>
          <div className="flex flex-wrap flex-row justify-center item-center"><Main/></div>
          </div>
        
    </div>
  );
};

export default Feed;
