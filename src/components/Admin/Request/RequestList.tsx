import React from "react";
import RequestBox from "./RequestBox";
import ComponentBox from "../ComponentBox";
import { trpc } from "@/utils/trpc";
import { Text, Badge, Button, Card, Group, Avatar } from "@mantine/core";

const RequestList = () => {
  const requests = trpc.admin.requestList.useQuery();

  console.log(requests.data);
  return (
    <div className="w-11/12 mx-auto my-3">
      <div className="flex justify-start font-semibold text-gray-500">
        <p className="w-1/12 ml-12">ID</p>
        <p className="w-3/12">Request</p>
        <p className="w-3/12 pl-2">User</p>
        {/* <p className="w-2/12">Nội dung</p> */}
        <p className="w-2/12">Ngày tạo</p>
        <p className="w-1/12 mx-3">Trình trạng</p>
        <p className="w-1/12"></p>
      </div>

      {requests.data?.requests.map((request) => (
        <div key={request.id}>
          <ComponentBox
            props={{
              id: request.id,
              input2: request.title,
              input3: request.user.name,
              input4: request.createdAt,
              input5: request.reply.length != 0 ? true : false,
              type: "request",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RequestList;
