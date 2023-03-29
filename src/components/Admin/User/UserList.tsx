import React from "react";
import { Text, Container, Card, Group } from "@mantine/core";
import UserBox from "./UserBox";
import ComponentBox from "../ComponentBox";
const UserList = () => {
  const users = [
    {
      id: 1,
      userName: "Quang",
      numberOfPosts: 4,
      joinDate: "1/2/2023",
      status: "Online",
    },
    {
      id: 2,
      userName: "Quang",
      numberOfPosts: 4,
      joinDate: "1/2/2023",
      status: "Offline",
    },
    {
      id: 3,
      userName: "Quang",
      numberOfPosts: 4,
      joinDate: "1/2/2023",
      status: "Bị ban",
    },
  ];

  return (
    <div className="w-11/12 mx-auto my-3">
      <div className="flex justify-start font-semibold text-gray-500">
        <p className="w-1/12 ml-12">ID</p>
        <p className="w-3/12">Người dùng</p>
        <p className="w-3/12">Số bài viết</p>
        {/* <p className="w-2/12">Nội dung</p> */}
        <p className="w-2/12">Ngày tham gia</p>
        <p className="w-1/12 mx-3">Trình trạng</p>
        <p className="w-1/12"></p>
      </div>

      {users.map((user) => (
        <div key={user.id}>
          <ComponentBox
            props={{
              id: user.id,
              input2: user.userName,
              input3: user.numberOfPosts,
              input4: user.joinDate,
              status: user.status,
              type: "user",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default UserList;
