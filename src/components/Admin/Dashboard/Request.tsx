import { Badge, Button, Card, Group, Grid } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import dayjs from "dayjs";
type Props = {
  request: any;
};

const Request = ({ request }: Props) => {
  const { id, title, createdAt, content, user } = request;
  const router = useRouter();
  const onNavigaToRequestDetail = () => {
    router.push(`/admin/request/${id}`);
  };

  return (
    <Grid.Col span={12}>
      <div className="w-full">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group position="apart" mt="md" mb="xs">
            <div className="font-medium text-gray-500">{title}</div>
            <Badge color="yellow" variant="light">
              "Chưa phản hồi"
            </Badge>
          </Group>
          <Group position="apart" mt="md" mb="xs">
            <div className="font-sm text-gray-500">{user.name}</div>
            <div className="font-sm text-gray-500">
              {dayjs(createdAt).format("DD/MM/YYYY")}
            </div>
          </Group>

          {/* <div className="font-sm">{content}</div> */}

          <Button
            onClick={onNavigaToRequestDetail}
            variant="default"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
          >
            "Phản hồi"
          </Button>
        </Card>
      </div>
    </Grid.Col>
  );
};

export default Request;
