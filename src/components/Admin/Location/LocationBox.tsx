import { Badge, Button, Card, Group, Image } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  location: any;
};

const LocationBox = ({ location }: Props) => {
  const { id, title, content, user, status } = location;
  const router = useRouter();

  const onNavigaToRequestDetail = () => {
    router.push(`/admin/request/${id}`);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <div className="font-medium text-gray-500">{title}</div>
        <Badge color={status === "PENDING" ? "blue" : "green"} variant="light">
          {status}
        </Badge>
      </Group>
      <Group position="apart" mt="md" mb="xs">
        <div className="font-sm text-gray-500">{user}</div>
        <div className="font-sm text-gray-500">23/03/2023</div>
      </Group>

      <div className="font-sm">{content}</div>

      <Button
        onClick={onNavigaToRequestDetail}
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

export default LocationBox;
