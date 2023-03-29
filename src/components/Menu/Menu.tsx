import { Tab } from "@/types/tab";
import classNames from "@/utils/classNames";
import React, { ReactNode } from "react";

type Props = {
  className?: string;
  activeClass?: string;
  titleClass?: string;
  active?: boolean;
  items: Record<string, Tab>;
  tab: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange?: (tab: Tab) => void;
};

const Menu = ({
  className,
  activeClass = "",
  titleClass = "",
  active = false,
  items,
  tab,
  leftIcon,
  rightIcon,
  onChange,
}: Props) => {
  const onChangeTab = (tab: keyof typeof items) => {
    onChange?.(items[tab]);
  };

  return (
    <>
      {Object.keys(items).map((key) => (
        <button
          onClick={() => onChangeTab(key)}
          key={key}
          className={classNames("uppercase flex items-center", className, {
            [activeClass]: active || tab === items[key].name,
          })}
        >
          {leftIcon}
          <div
            className={classNames("font-bold uppercase", titleClass, {
              "ml-2": !!leftIcon,
              "mr-auto": !!rightIcon,
            })}
          >
            {items[key].name}
          </div>
          {rightIcon}
        </button>
      ))}
    </>
  );
};

export default Menu;
