import React from "react";
import {
  Modal,
  Card,
  Button,
  Text,
  Badge,
  Group,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, respond] = useDisclosure(false);
  const [deleteRequestOpened, deleteRequest] = useDisclosure(false);

  let handleDelete = () => {
    deleteRequest.close();
  };
  let sendRespond = () => {
    respond.close();
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
        {/* Modal phản hồi request */}
        <Modal opened={opened} onClose={respond.close} title="Phản hồi request">
          <Textarea
            placeholder="Your comment"
            label="Phản hồi của bạn:"
            withAsterisk
          />
          <Button
            variant="outline"
            color="blue"
            mt="md"
            radius="md"
            onClick={sendRespond}
          >
            Gửi phản hồi
          </Button>
        </Modal>
        {/* Modal xóa request */}
        <Modal
          opened={deleteRequestOpened}
          onClose={deleteRequest.close}
          className="text-center"
        >
          <Text>Bạn có chắc chắn muốn bỏ request vào mục spam?</Text>
          <Button
            variant="default"
            color="blue"
            mt="md"
            radius="md"
            onClick={handleDelete}
          >
            Có
          </Button>
        </Modal>

        <Group position="center">
          <Button
            variant="outline"
            color="blue"
            mt="md"
            radius="md"
            onClick={respond.open}
          >
            Phản hồi
          </Button>
          <Button
            variant="outline"
            color="yellow"
            mt="md"
            radius="md"
            onClick={deleteRequest.open}
          >
            Bỏ vào spam
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default RequestDetail;
