import { useRouter } from "next/router";
import React from "react";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { TRACKING_EVENT, TRACKING_PAGE } from "@/constants/tracking";

const Profile = () => {
  const tracking = trpc.tracking.add.useMutation();
  useEffect(() => {
    tracking.mutate({
      event: TRACKING_EVENT.ENTER_PROFILE,
      page: TRACKING_PAGE.PROFILE,
    });
  }, []);
  const router = useRouter();
  router.push("/posts");
  return <></>;
};

export default Profile;
