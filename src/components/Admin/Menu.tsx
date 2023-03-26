import React, { useState } from "react";
import classNames from "classnames";
import { TAB_LIST } from "@/constants/admin";
import { Tab } from "@/types/tab";

type Props = {
  tab: string;
  onChangeTab: (tab: Tab) => void;
};

const Menu = ({ tab, onChangeTab }: Props) => {
  return (
    <div className="flex flex-col w-full">
      <div className="px-4 py-6 border-b">Admin Page</div>
      {Object.keys(TAB_LIST).map((key) => (
        <button
          onClick={() => onChangeTab(TAB_LIST[key as keyof typeof TAB_LIST])}
          key={key}
          className={classNames("px-4 py-3 uppercase", {
            "bg-slate-200": tab === TAB_LIST[key as keyof typeof TAB_LIST].name,
          })}
        >
          {TAB_LIST[key as keyof typeof TAB_LIST].name}
        </button>
      ))}
    </div>
  );
};

export default Menu;
