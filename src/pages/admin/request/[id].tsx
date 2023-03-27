import React from "react";
import { useRouter } from "next/router";
import { RequestDetail } from "@/components/Admin/Request";

const RequestInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      RequestDetail: {id}
      <RequestDetail />
    </div>
  );
};

export default RequestInfo;
