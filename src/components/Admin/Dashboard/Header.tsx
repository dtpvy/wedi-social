import React from "react";
import Request from "./Request";
import { IconArrowRight } from "@tabler/icons-react";
import { Button, Card, Group, Text, ActionIcon } from "@mantine/core";
import Link from "next/link";

const Header = () => {
  const request = [
    {
      id: 1,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl: "",
      user: "Quang",
      status: "PENDING",
    },
    {
      id: 2,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/680/2022/06/18/z35016410045426f3dfb5ed82d1f49408a69d555b1f720-1655531587436.jpg",
      user: "Quang",
      status: "PENDING",
    },
    {
      id: 2,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/680/2022/06/18/z35016410045426f3dfb5ed82d1f49408a69d555b1f720-1655531587436.jpg",
      user: "Quang",
      status: "PENDING",
    },
  ];
  let pendingRequests = (request: any) => {
    let temp = [];
    let count = 0;
    for (let i = 0; i <= request.length; i++) {
      if (request[i].status === "PENDING") {
        count++;
        temp.push(
          <div key={request[i].id} className="flex-1">
            <Request request={request[i]} />
          </div>
        );
      }
      if (count == 3) {
        break;
      }
    }
    return temp;
  };
  return (
    <div className="flex p-4 gap-4  border-b">
      {pendingRequests(request)}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="flex flex-col content-center justify-center"
      >
        {/* <Group position="apart" mt="md" mb="xs"> */}
        <span className="font-medium my-2 text-gray-800">Xem thêm request</span>
        <Link href="/admin/request" className="self-center">
          <ActionIcon
            color="dark"
            size="xl"
            variant="light"
            className=" bg-gray-200"
          >
            <IconArrowRight size="2.125rem" />
          </ActionIcon>
        </Link>

        {/* </Group> */}
      </Card>
    </div>
  );
};

export default Header;
