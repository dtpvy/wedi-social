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
    <div className="flex flex-col w-10/11 border-r h-full">
      
      {Object.keys(TAB_LIST_FEED).map((key) => (
        <button
          onClick={() => onChangeTab(TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED])}
          key={key}
          className={classNames("px-4 py-3 border-b-2 border-blue-500 text-2xl font-medium w-200 h-100", {
            "bg-slate-200  ": tab === TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED].name,
            
          })}
        >
          
          <div className="h-10px w-10px">{TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED].name}</div>
          <img src={TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED].icon} 
          className=""
          alt="" />
         
      
          
          
        </button>
      ))}
    </div>
    
  );
};

export default Sidebar;
