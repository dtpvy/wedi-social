import React, { useState } from "react";
import classNames from "classnames";
import { TAB_LIST_FEED } from "@/constants/Feed";
import { Tab } from "@/types/tab";

type Props = {
  tab: string;
  onChangeTab: (tab: Tab) => void;
};

const Sidebar = ({ tab, onChangeTab }: Props) => {
  return (
    <div className="flex flex-col w-full border-r h-full">
      <div className="justify-it px-4 py-6 border-b">WEDI FEED</div>
      {Object.keys(TAB_LIST_FEED).map((key) => (
        <button
          onClick={() => onChangeTab(TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED])}
          key={key}
          className={classNames("px-4 py-3 uppercase", {
            "bg-slate-200": tab === TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED].name,
          })}
        >
          {TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED].name}
        </button>
      ))}
    </div>
    
  );
};

export default Sidebar;
