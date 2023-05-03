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
import { useEffect, useState } from "react";
import { LocationStatus } from "@prisma/client";

const LocationDetail = () => {
  const router = useRouter();
  let id = parseInt(router.query.id as string, 10);
  let { data: location, refetch } = trpc.admin.locationDetail.useQuery({
    locationId: id,
  });
  const [LocationStatusModalOpened, LocationStatusModal] = useDisclosure(false);
  let setLocationStatus = trpc.admin.setLocationStatus.useMutation();
  const [currentStatus, setCurrentStatus] = useState<LocationStatus>();

  useEffect(() => {
    if (!currentStatus) {
      setCurrentStatus(location?.status);
    }
    setCurrentStatus(location?.status);
  }, [location?.status]);

  const handleSetStatus = (status: LocationStatus) => {
    setLocationStatus.mutate(
      { id, status },
      {
        onSuccess: () => {
          // setCurrentStatus(status);
          refetch();
          LocationStatusModal.close();
        },
        onError: () => {
          console.log("something wrong");
        },
      }
    );
  };

  return (
    <div className="flex w-full justify-center my-3">
      <Card shadow="sm" padding="xl" radius="md" withBorder className="w-8/12 pl-5">
        <Group position="apart">
          <div className="px-3">
            <div className="font-medium text-gray-500">{location?.name}</div>
            <Text>Địa chỉ: {`${location?.address}`}</Text>
            <Text>
              Số bài viết đi kèm:{" "}
              <span className="font-medium">{location?.posts.length}</span>
            </Text>
            <Text>Hình ảnh: </Text>
          </div>
          <Badge
            color={
              location?.status === LocationStatus.ACTIVE ? "green" : "yellow"
            }
          >
            {location?.status}
          </Badge>
        </Group>
        {/* <Image
          maw={240}
          radius="md"
          src={}
          alt="Random image"
          className="mx-auto"
        /> */}

        <Modal
          opened={LocationStatusModalOpened}
          onClose={LocationStatusModal.close}
          className="text-center"
        >
          <Text>
            Bạn có chắc muốn đánh dấu địa điểm{" "}
            {location?.status !== LocationStatus.ACTIVE
              ? "ngưng hoạt động"
              : "mở hoạt động"}
            ?
          </Text>
          <Button
            variant="default"
            color={
              location?.status === LocationStatus.ACTIVE ? "green" : "yellow"
            }
            mt="md"
            radius="md"
            onClick={() =>
              handleSetStatus(
                location?.status === LocationStatus.DEACTIVE
                  ? LocationStatus.ACTIVE
                  : LocationStatus.DEACTIVE
              )
            }
          >
            Xác nhận
          </Button>
        </Modal>

        <Group position="center">
          <Button
            onClick={LocationStatusModal.open}
            variant="default"
            color="blue"
            mt="md"
            radius="md"
          >
            Ngưng hoạt động
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default LocationDetail;
