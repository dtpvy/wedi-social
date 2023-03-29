import {
  Text,
  Button,
  Card,
  Group,
  Image,
  Badge,
  Drawer,
  TextInput,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { IconEdit } from "@tabler/icons-react";
type Props = {
  location: any;
};

const LocationBox = ({ location }: Props) => {
  const { id, name, ward, district, city, nation, image, review } = location;
  const [locationEditOpened, locationEdit] = useDisclosure(false);
  const [locationDeleteOpened, locationDelete] = useDisclosure(false);

  const handleEdit = () => {
    locationEdit.close();
  };
  const handleDelete = () => {
    locationDelete.close();
  };
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

      <Modal
        opened={locationEditOpened}
        onClose={locationEdit.close}
        title="Chỉnh sửa địa điểm"
      >
        <Text>
          Điểm du lịch <span className="font-medium">{name}</span>
        </Text>
        <TextInput label="Tên địa điểm" placeholder="Nhập tên" />
        <TextInput
          data-autofocus
          label="Địa chỉ:"
          placeholder="Nhập địa chỉ mới"
          mt="md"
        />
        <Button
          variant="default"
          color="blue"
          mt="md"
          radius="md"
          onClick={handleEdit}
          leftIcon={<IconEdit size="1rem" />}
        >
          Chỉnh sửa
        </Button>
      </Modal>
      <Modal
        opened={locationDeleteOpened}
        onClose={locationDelete.close}
        className="text-center"
      >
        <Text>Bạn có chắc muốn xóa địa điểm?</Text>
        <Button
          variant="default"
          color="blue"
          mt="md"
          radius="md"
          onClick={handleDelete}
        >
          Xóa
        </Button>
      </Modal>

      <Group position="center">
        <Button
          variant="default"
          color="blue"
          mt="md"
          radius="md"
          onClick={locationEdit.open}
          leftIcon={<IconEdit size="1rem" />}
        >
          Chỉnh sửa
        </Button>
        <Button
          onClick={locationDelete.open}
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
