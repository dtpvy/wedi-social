import useAuth from "@/hooks/useAuth";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import LayoutAdmin from "./AdminLayout";
import LayoutMain from "./MainLayout";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { data: session, status } = useAuth();

  const isAdminPage = router.asPath.split("/")[1] === "admin";

  if (status === "loading") {
    return (
      <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  if (!session?.user) {
    return <>{children}</>;
  }

  if (isAdminPage) {
    return <LayoutAdmin>{children}</LayoutAdmin>;
  }

  return <LayoutMain>{children}</LayoutMain>;
};

export default Layout;
