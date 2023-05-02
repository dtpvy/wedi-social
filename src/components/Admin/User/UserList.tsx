import React from "react";
import { Text, Container, Card, Group } from "@mantine/core";
import ComponentBox from "../ComponentBox";
import { trpc } from "@/utils/trpc";

const UserList = (props: any) => {
  const { statusVisibility } = props;
  const users = trpc.admin.userList.useQuery();

  return (
    <div className="w-11/12 mx-auto my-3">
      <div className="flex justify-start font-semibold text-gray-500">
        <p className="w-1/12 ml-12">ID</p>
        <p className="w-2/12">Người dùng</p>
        <p className="w-3/12 ml-16 mr-4">Số bài viết</p>
        {/* <p className="w-2/12">Nội dung</p> */}
        <p className="w-2/12">Ngày tham gia</p>
        <p className="w-1/12 ml-8">Trình trạng</p>
      </div>

      {users.data?.result.map((user) => (
        <div key={user.id}>
          <ComponentBox
            props={{
              id: user.id,
              input2: user.name,
              input3: user.posts.length,
              input4: user.createdAt,
              status: user.status,
              type: "user",
              statusVisibility,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default UserList;
