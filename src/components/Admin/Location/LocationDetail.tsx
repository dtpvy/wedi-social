import React from "react";
import {
  Modal,
  Card,
  Button,
  Text,
  Badge,
  Group,
  TextInput,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const LocationDetail = () => {
  const router = useRouter();
  let id = parseInt(router.query.id as string, 10);
  let { data: location } = trpc.admin.locationDetail.useQuery({
    locationId: id,
  });
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
      <Card
        shadow="sm"
        padding="xl"
        radius="md"
        withBorder
        className="w-8/12 pl-5"
      >
        <Group position="apart">
          <div className="px-3">
            <div className="font-medium text-gray-500">{location?.name}</div>
            <Text>
              Địa chỉ:{" "}
              {`${location?.street}, ${location?.ward.name}, ${location?.district.name}, ${location?.city.name}, ${location?.country.name}`}
            </Text>
            <Text>
              Số bài viết đi kèm:{" "}
              <span className="font-medium">{location?.posts.length}</span>
            </Text>
            <Text>Hình ảnh: </Text>
          </div>
          <Badge color="green">{location?.status}</Badge>
        </Group>
        {/* <Image
          maw={240}
          radius="md"
          src={}
          alt="Random image"
          className="mx-auto"
        /> */}

        <Modal
          opened={locationEditOpened}
          onClose={locationEdit.close}
          title="Chỉnh sửa địa điểm"
        >
          <Text>
            Điểm du lịch <span className="font-medium">{location?.name}</span>
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
    </div>
  );
};

export default LocationDetail;
