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
    <div className="flex flex-col w-10/11  border-r h-full py-5 px-4">
      
      {Object.keys(TAB_LIST_FEED).map((key) => (
        <button
          onClick={() => onChangeTab(TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED])}
          key={key}
          className={classNames("px-4 py-3 border-b-2  text-2xl font-medium w-200 h-100 shadow border rounded-lg p-4 bg-green-200 my-1", {
            "bg-slate-200  ": tab === TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED].name,
            
          })}
        >
          <div className="flex flex-row justify-between">
          <div className="h-5px w-5px ">{TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED].name}</div>
          <div>
          <img src={TAB_LIST_FEED[key as keyof typeof TAB_LIST_FEED].icon} 
          className="w-[30px] h-[30px]"
          alt="" /> </div>
          </div>
         
      
          
          
        </button>
      ))}
    </div>
    
  );
};

export default Sidebar;
