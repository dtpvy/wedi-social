import React from "react";
import Request from "./Request";
import { trpc } from "@/utils/trpc";
import { IconArrowRight } from "@tabler/icons-react";
import { Button, Card, Group, Text, ActionIcon, Grid } from "@mantine/core";
import Link from "next/link";

const Header = () => {
  const requests = trpc.admin.requestList.useQuery();

  let pendingRequests = (requests: any) => {
    let temp = [];
    let count = 0;
    for (let i = 0; i <= requests?.length; i++) {
      if (requests[i]?.reply.length === 0) {
        count++;
        temp.push(
          <div key={requests[i].id} className="flex-1">
            <Request request={requests[i]} />
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
    <Grid className="mx-8 my-3">
      {pendingRequests(requests.data?.requests)}
      <Grid.Col span={3}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="flex flex-col content-center justify-center"
        >
          {/* <Group position="apart" mt="md" mb="xs"> */}
          {requests.data?.requests.length ? (
            <div className="flex flex-col items-center">
              <span className="font-medium my-2 text-gray-800">
                Xem thêm request
              </span>
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
            </div>
          ) : (
            <Text size="md">Hiện chưa có request nào chưa phản hồi</Text>
          )}
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default Header;
