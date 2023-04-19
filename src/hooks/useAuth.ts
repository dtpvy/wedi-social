import useUserStore from "@/stores/user";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useAuth = () => {
  const router = useRouter();
  const session = useSession();
  const { data, status } = session;
  const setUser = useUserStore.use.setUser();

  const { data: user } = trpc.user.findUser.useQuery(
    {
      id: data?.user.id as number,
    },
    { enabled: !!data?.user.id }
  );
  console.log("kkkkkk");
  useEffect(() => {
    console.log("???", user);
    setUser({ user: user || null, status });
  }, [setUser, status, user]);

  if (status !== "loading") {
    const adminPage = router.asPath.split("/")[1] === "admin";
    const authPage =
      router.asPath.includes("signin") || router.asPath.includes("signup");

    const indexPage = router.asPath === "/";

    if (indexPage && data?.user.id) {
      router.push("/feed");
    }

    if (data?.user && authPage) {
      router.push(data.user.isAdmin ? "/admin/dashboard" : "/feed");
    }

    if (
      (!data?.user || (adminPage && !data.user.isAdmin)) &&
      !indexPage &&
      !authPage
    ) {
      router.push("/");
    }
  }

  return session;
};

export default useAuth;
