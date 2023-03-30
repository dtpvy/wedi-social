import { useRouter } from "next/router";
import { ReactNode } from "react";
import LayoutAdmin from "./AdminLayout";
import LayoutMain from "./MainLayout";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const isAdmin = router.asPath.split("/")[1] === "admin";

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
