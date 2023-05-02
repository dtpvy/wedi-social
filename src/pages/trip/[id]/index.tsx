import React from "react";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";
import { TRACKING_EVENT, TRACKING_PAGE } from "@/constants/tracking";

const Trip = () => {
  const tracking = trpc.tracking.add.useMutation();
  useEffect(() => {
    tracking.mutate({
      event: TRACKING_EVENT.ENTER_TRIP,
      page: TRACKING_PAGE.TRIP,
    });
  }, []);
  return <div>Trip</div>;
};

export default Trip;
