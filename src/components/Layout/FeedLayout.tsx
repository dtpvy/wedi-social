import { Sidebar } from "@/components/Feed";
import classNames from "@/utils/classNames";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const FeedLayout = ({ children, className }: Props) => {
  return (
    <>
      <div className="absolute top-0 bottom-0 mt-[70px] z-[5] shadow-md">
        <Sidebar />
      </div>
      <div className="pt-[70px] pl-[132px] flex gap-8 max-h-[100vh] overflow-auto">
        <div className={classNames(className)}>{children}</div>
      </div>
    </>
  );
};

export default FeedLayout;
