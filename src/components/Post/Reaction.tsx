import {
  IconHeartFilled,
  IconMoodHappy,
  IconMoodHappyFilled,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import classNames from "classnames";
import React from "react";

const Reaction = () => {
  return (
    <div
      className={classNames(
        "flex items-center gap-4 p-4 rounded-lg bg-white absolute bottom-[calc(100%+8px)] shadow left-0 border",
        "before:content-[''] before:absolute before:w-0 before:h-0 before:top-full",
        "before:border-t-[12px] before:border-t-solid before:border-t-[#ccc]",
        "before:border-l-[12px] before:border-l-solid before:border-l-transparent",
        "before:border-r-[12px] before:border-r-solid before:border-r-transparent",
        "after:content-[''] after:absolute after:w-0 after:h-0 after:top-full after:left-[18px]",
        "after:border-t-[10px] after:border-t-solid after:border-t-[#fff]",
        "after:border-l-[10px] after:border-l-solid after:border-l-transparent",
        "after:border-r-[10px] after:border-r-solid after:border-r-transparent"
      )}
    >
      <IconThumbUpFilled className="text-blue-600" />
      <IconHeartFilled className="text-pink-600" />
      <IconMoodHappyFilled className="text-yellow-400" />
    </div>
  );
};

export default Reaction;
