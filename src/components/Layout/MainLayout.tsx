import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  return <div className="bg-gray-100 min-h-screen">{children}</div>;
};

export default LayoutMain;
