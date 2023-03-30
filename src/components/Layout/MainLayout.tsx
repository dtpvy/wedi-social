import React, { ReactNode } from "react";
import { Search } from "../Feed";

type Props = {
  children: ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full fixed shadow-md mb-4 z-10">
        <Search />
      </div>
      {children}
    </div>
  );
};

export default LayoutMain;
