import React from "react";
import { Container, Card, Button, Text, Badge, Group } from "@mantine/core";

const RequestDetail = () => {
  const request = {
    id: 1,
    title: "App bị lỗi",
    content: "Không thể đăng nhập được",
    imgUrl: "",
    date: "01/2/2023",
    user: "Quang",
    status: "PENDING",
  };

  return (
    <div className="flex w-full justify-center my-3">
      <Card
        shadow="sm"
        padding="lg"
        radius="lg"
        withBorder
        className="w-11/12 "
      >
        <Card.Section></Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{request.title}</Text>
          <Group>
            <Badge color="pink" variant="light">
              {request.status}
            </Badge>
          </Group>
        </Group>
        <Group position="apart">
          <p>
            User: <span className="font-medium">{request.user}</span>
          </p>
          <p>Ngày tạo request: {request.date}</p>
        </Group>

        <Text size="m">{request.content}</Text>

        <Group position="center">
          <Button variant="outline" color="blue" mt="md" radius="md">
            Phản hồi
          </Button>
          <Button variant="outline" color="yellow" mt="md" radius="md">
            Bỏ vào spam
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default RequestDetail;
