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
      status: "Offline",
    },
    {
      id: 3,
      userName: "Quang",
      status: "Bị ban",
    },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {users.map((user) => (
        <UserBox user={user} />
      ))}
    </div>
  );
};

export default UserList;
