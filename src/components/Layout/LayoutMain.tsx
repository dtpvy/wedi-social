import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default LayoutMain;
