import { Badge, Button, Card, Group, Image, Avatar } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  user: any;
};

const UserBox = ({ user }: Props) => {
  const { id, userName, userBirth, joinDate, status } = user;
  const router = useRouter();

  const onNavigaToUserDetail = () => {
    router.push(`/admin/User/${id}`);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="m-4">
      <div className="font-medium text-gray-500 flex items-center">
        {userName}
        <Avatar radius="xl" className="inline-block" />
      </div>
      <Group position="apart" mt="md" mb="xs">
        <div className="font-sm text-gray-500">Ngày sinh:{userBirth}</div>
        <div className="font-sm text-gray-500">Ngày tham gia:{joinDate}</div>
        <div className="font-sm text-gray-500">
          Trạng thái hoạt động:{status}
        </div>
      </Group>

      <Button
        onClick={onNavigaToUserDetail}
        variant="default"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        {status === "PENDING" ? "Feed back" : "Details"}
      </Button>
    </Card>
  );
};

export default UserBox;
