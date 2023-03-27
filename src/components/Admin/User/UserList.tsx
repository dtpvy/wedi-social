import React from "react";
import { Text, Container, Card, Group } from "@mantine/core";
import UserBox from "./UserBox";
const UserList = () => {
  const users = [
    {
      id: 1,
      userName: "Quang",
      status: "Online",
    },
    {
      id: 2,
      userName: "Quang",
      status: "Online",
    },
    {
      id: 3,
      userName: "Quang",
      status: "Online",
    },
  ];

  return (
    <div>
      <Text size="xl" className="p-5 ml-5 font-semibold">
        UserList:
      </Text>
      <div className="flex">
        {users.map((user) => (
          <UserBox user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
