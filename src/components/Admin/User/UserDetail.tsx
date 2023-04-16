import React from "react";
import z from "zod";
import { Modal, Card, Button, Text, Badge, Group, Radio } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const UserDetail = () => {
  // const user = {
  //   id: 1,
  //   name: "quang",
  //   email: "email@gmail.com",
  //   birth: "01/01/2001",
  //   joinDate: "22/02/2023",
  //   numberOfPosts: 3,
  //   status: "Online",
  // };
  const [userBanOpened, userBan] = useDisclosure(false);
  let handleBan = () => {
    userBan.close();
  };
  const router = useRouter();
  let id = parseInt(router.query.id as string, 10);
  const user = trpc.admin.userDetail.useQuery({ id });
  return (
    <div className="flex w-full justify-center my-3">
      <Card shadow="sm" padding="lg" radius="lg" withBorder className="w-9/12 ">
        <Card.Section></Card.Section>
        <div className="flex justify-between items-center pt-5 px-5">
          <div>
            <Text>
              User:{" "}
              <span className="font-medium">{user.data?.result?.name}</span>{" "}
            </Text>
            <Text size="m">
              Email:{" "}
              <span className="font-medium">{user.data?.result?.email}</span>{" "}
            </Text>
            <Text>
              Số điện thoại:{" "}
              <span className="font-medium">{user.data?.result?.phone}</span>
            </Text>
            <Text>
              Ngôn ngữ:{" "}
              <span className="font-medium">
                {user.data?.result?.languageId}
              </span>
            </Text>
            <Text size="m">
              Số lượng bài viết: <span className="font-medium">0</span>
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
