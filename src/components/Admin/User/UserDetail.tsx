import React from "react";
import { Modal, Card, Button, Text, Badge, Group, Radio } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
  const [userBanOpened, userBan] = useDisclosure(false);
  let handleBan = () => {
    userBan.close();
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

        <Modal
          opened={userBanOpened}
          onClose={userBan.close}
          className="text-center"
        >
          <Text size="lg">Chọn phương thức cấm người dùng</Text>
          <div className="flex items-start justify-around m-4">
            <Radio.Group name="banWay" label="Chọn hình thức cấm" withAsterisk>
              <Radio
                value="Cấm post bài viết"
                label="Cấm post bài viết"
                className="pt-3"
              />
              <Radio
                value="Cấm bình luận"
                label="Cấm bình luận"
                className="pt-3"
              />
            </Radio.Group>
            <Radio.Group name="banTime" label="Chọn thời gian cấm" withAsterisk>
              <Radio value="1 ngày" label="1 ngày" className="pt-3" />
              <Radio value="7 ngày" label="7 ngày" className="pt-3" />
              <Radio value="30 ngày" label="30 ngày" className="pt-3" />
            </Radio.Group>
          </div>

          <Button
            variant="default"
            color="blue"
            mt="md"
            radius="md"
            onClick={handleBan}
          >
            Cấm
          </Button>
        </Modal>

        <Group position="center">
          <Button
            variant="outline"
            color="yellow"
            mt="md"
            radius="md"
            onClick={userBan.open}
          >
            Cấm người dùng
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default UserDetail;
