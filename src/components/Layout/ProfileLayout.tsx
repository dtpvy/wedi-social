import classNames from "@/utils/classNames";
import { ReactNode } from "react";
import { Header, TabMenu } from "../Profile/Header";

type Props = {
  children: ReactNode;
  className?: string;
};

const ProfileLayout = ({ children, className }: Props) => {
  return (
    <>
      <Header />
      <div className="flex mt-8 mx-16 gap-8">
        <div className="w-[400px] shadow p-4 bg-white rounded-lg h-fit">
          <TabMenu />
        </div>
        <div className={classNames("w-full", className)}>{children}</div>
      </div>
    </>
  );
};

export default ProfileLayout;
