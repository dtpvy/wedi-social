import { Badge, Button, Card, Group, Image, Avatar } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  user: any;
};

const UserBox = ({ user }: Props) => {
  const { id, userName, status } = user;
  const router = useRouter();

  const onNavigaToUserDetail = () => {
    router.push(`/admin/user/${id}`);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="m-4">
      <div className="font-medium text-gray-500 flex items-center">
        {userName}
        <Avatar radius="xl" className="inline-block" />
      </div>
      <div className="font-sm text-gray-500">Email:{}</div>
      <div className="font-sm text-gray-500">
        Trạng thái hoạt động: {status}
      </div>

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
