import React from "react";
import { useRouter } from "next/router";
// import { RequestDetail } from "@/components/Admin/Request";

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>UserDetail: {id}</div>;
};

export default UserDetail;
