import { Loader } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import LayoutAdmin from "./AdminLayout";
import LayoutMain from "./MainLayout";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isAdmin =
    router.asPath.split("/")[1] === "admin" && session?.user.isAdmin;

  const isSignin =
    router.asPath.includes("signin") &&
    ((isAdmin && !session?.user.isAdmin) || !session?.user);

  console.log(isSignin, session);

  if (status === "loading") {
    return (
      <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    );
  }

  if (isSignin || (!session?.user && status === "unauthenticated")) {
    return <>{children}</>;
  }

  if (
    router.asPath === "/" ||
    (!isSignin && router.asPath.includes("signin"))
  ) {
    router.push(isAdmin ? "/admin/dashboard" : "/feed");
  }

  if (isAdmin) {
    return <LayoutAdmin>{children}</LayoutAdmin>;
  }

  return <LayoutMain>{children}</LayoutMain>;
};

export default Layout;
