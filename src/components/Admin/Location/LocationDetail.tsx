import React from 'react';
import { Modal, Card, Button, Text, Badge, Group, TextInput, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';

const LocationDetail = () => {
  const location = {
    id: 2,
    name: 'Quán nước 3',
    review: 2.2,
    ward: '1',
    district: '1',
    city: 'HCM',
    nation: 'Vietnam',
    status: 'open',
    travelType: 'Ăn uống',
    image:
      'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
  };
  const [locationEditOpened, locationEdit] = useDisclosure(false);
  const [locationDeleteOpened, locationDelete] = useDisclosure(false);

  const handleEdit = () => {
    locationEdit.close();
  };
  const handleDelete = () => {
    locationDelete.close();
  };
  return (
    <div className="flex w-full justify-center my-3">
      <Card shadow="sm" padding="xl" radius="md" withBorder className="w-8/12 pl-5">
        <Group position="apart">
          <div>
            <div className="font-medium text-gray-500">{location.name}</div>
            <Text>
              Địa chỉ:{' '}
              {`${location.ward}, ${location.district}, ${location.city}, ${location.nation}`}
            </Text>
            <Text>
              Loại hình du lịch: <span className="font-medium">{location.travelType}</span>
            </Text>
          </div>
          <Badge color="yellow">Review: {location.review}</Badge>
        </Group>
        <Image maw={240} radius="md" src={location.image} alt="Random image" />

        <Modal opened={locationEditOpened} onClose={locationEdit.close} title="Chỉnh sửa địa điểm">
          <Text>
            Điểm du lịch <span className="font-medium">{location.name}</span>
          </Text>
          <TextInput label="Tên địa điểm" placeholder="Nhập tên" />
          <TextInput data-autofocus label="Địa chỉ:" placeholder="Nhập địa chỉ mới" mt="md" />
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
        <Modal opened={locationDeleteOpened} onClose={locationDelete.close} className="text-center">
          <Text>Bạn có chắc muốn xóa địa điểm?</Text>
          <Button variant="default" color="blue" mt="md" radius="md" onClick={handleDelete}>
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
          <Button onClick={locationDelete.open} variant="default" color="blue" mt="md" radius="md">
            Xóa
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default LocationDetail;
