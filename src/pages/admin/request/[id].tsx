import React from "react";
import { useRouter } from "next/router";
// import { RequestDetail } from "@/components/Admin/Request";

const RequestDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>RequestDetail: {id}</div>;
};

export default RequestDetail;
