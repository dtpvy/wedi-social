import { Text, Button, Card, Group, Image, Badge } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { IconEdit } from "@tabler/icons-react";
type Props = {
  location: any;
};

const LocationBox = ({ location }: Props) => {
  const { id, name, ward, district, city, nation, image, review } = location;
  const router = useRouter();

  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart">
        <div>
          <div className="font-medium text-gray-500">{name}</div>
          <Text>Địa chỉ: {`${ward}, ${district}, ${city}, ${nation}`}</Text>
        </div>
        <Badge color="yellow">Review: {review}</Badge>
      </Group>
      <Image maw={240} mx="auto" radius="md" src={image} alt="Random image" />

      <Group position="center">
        <Button
          onClick={handleEdit}
          variant="default"
          color="blue"
          mt="md"
          radius="md"
          leftIcon={<IconEdit size="1rem" />}
        >
          Chỉnh sửa
        </Button>
        <Button
          onClick={handleDelete}
          variant="default"
          color="blue"
          mt="md"
          radius="md"
        >
          Xóa
        </Button>
      </Group>
    </Card>
  );
};

export default LocationBox;
