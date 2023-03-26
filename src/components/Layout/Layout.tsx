import { TAB_LIST } from "@/constants/admin";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import LayoutAdmin from "./LayoutAdmin";
import LayoutMain from "./LayoutMain";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const route = useRouter();
  const isAdmin = route.asPath.split("/")[1] === "admin";

  return (
    <>
      {isAdmin ? (
        <LayoutAdmin>{children}</LayoutAdmin>
      ) : (
        <LayoutMain>{children}</LayoutMain>
      )}
    </>
  );
};

export default Layout;
