import React from "react";
import { Avatar, Card, Button, Text, Badge, Group } from "@mantine/core";

const UserDetail = () => {
  const user = {
    id: 1,
    name: "quang",
    email: "email@gmail.com",
    birth: "01/01/2001",
    joinDate: "22/02/2023",
    numberOfPosts: 3,
    status: "Online",
  };

  return (
    <div className="flex w-full justify-center my-3">
      <Card shadow="sm" padding="lg" radius="lg" withBorder className="w-9/12 ">
        <Card.Section></Card.Section>
        <div className="flex justify-between items-center pt-5 px-5">
          <div>
            <Text>
              User: <span className="font-medium">{user.name}</span>{" "}
            </Text>
            <Text size="m">
              Email: <span className="font-medium">{user.email}</span>{" "}
            </Text>
            <Text>
              Ngày sinh: <span className="font-medium">{user.birth}</span>
            </Text>
            <Text>
              Ngày tham gia:{" "}
              <span className="font-medium">{user.joinDate}</span>
            </Text>
            <Text size="m">
              Số lượng bài viết:{" "}
              <span className="font-medium">{user.numberOfPosts}</span>
            </Text>
          </div>
          <div className="flex-col">
            <Text>Tình trạng:</Text>
            <Badge color="pink" variant="light">
              {user.status}
            </Badge>
          </div>
        </div>

        <Group position="center">
          <Button variant="outline" color="yellow" mt="md" radius="md">
            Ban người dùng
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default UserDetail;
