import React from "react";
import { useRouter } from "next/router";
import { RequestDetail, ReplyList } from "@/components/Admin/Request";

const RequestInfo = () => {
  const router = useRouter();
  let id = parseInt(router.query.id as string, 10);

  return (
    <div className="flex flex-col w-full justify-center items-center my-3">
      {/* RequestDetail: {id} */}
      <p className="text-xl font-semibold">Request:</p>
      <RequestDetail id={id} />
      <p className="text-xl font-semibold">Phản hồi:</p>
      <ReplyList />
    </div>
  );
};

export default RequestInfo;
