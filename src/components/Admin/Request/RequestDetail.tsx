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
    <div className="flex">
      <Container className="w-5/6">
        <Card
          shadow="sm"
          padding="lg"
          radius="lg"
          withBorder
          className="w-full"
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
          <p>
            User: <span className="font-medium">{request.user}</span>
          </p>
          <p>Ngày tạo request: {request.date}</p>

          <Text size="m">{request.content}</Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>
      </Container>
    </div>
  );
};

export default RequestDetail;
