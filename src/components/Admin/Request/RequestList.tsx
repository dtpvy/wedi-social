import React from "react";
import RequestBox from "./RequestBox";
import ComponentBox from "../ComponentBox";
import { Text, Badge, Button, Card, Group, Avatar } from "@mantine/core";
const RequestList = () => {
  const requests = [
    {
      id: 1,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl: "",
      user: "Quang",
      createdDay: "1/2/2023",
      status: "PENDING",
    },
    {
      id: 2,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/680/2022/06/18/z35016410045426f3dfb5ed82d1f49408a69d555b1f720-1655531587436.jpg",
      user: "Quang",
      createdDay: "1/2/2023",

      status: "DONE",
    },
    {
      id: 3,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/680/2022/06/18/z35016410045426f3dfb5ed82d1f49408a69d555b1f720-1655531587436.jpg",
      user: "Quang",
      createdDay: "1/2/2023",

      status: "DONE",
    },
  ];

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

      {requests.map((request) => (
        <div key={request.id}>
          <ComponentBox
            props={{
              id: request.id,
              input2: request.title,
              input3: request.user,
              input4: request.createdDay,
              status: request.status,
              type: "request",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RequestList;
