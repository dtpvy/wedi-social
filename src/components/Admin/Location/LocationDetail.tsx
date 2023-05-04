import React from 'react';
import { Modal, Card, Button, Text, Badge, Group, TextInput, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LocationStatus } from '@prisma/client';
import RatingDisplay from '../RatingDisplay';

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
          console.log('something wrong');
        },
      }
    );
  };
  let avgReview = 0;
  if (location?.reviews && Array.isArray(location.reviews) && location.reviews.length !== 0) {
    avgReview = 0;
    for (let i of location.reviews) {
      avgReview += i.rating;
    }
    avgReview = avgReview / location.reviews.length;
  }

  return (
    <div className="flex w-full justify-center my-3">
      <Card shadow="sm" padding="xl" radius="md" withBorder className="w-8/12 pl-5">
        <Group position="apart" className="px-4">
          <div className="px-3">
            <div className="text-l font-semibold text-gray-800">{location?.name}</div>
            <Text className="font-normal">
              Địa chỉ: <span className="text-gray-800 font-medium">{`${location?.address}`}</span>
            </Text>
            <Text>
              Số bài viết đi kèm:{' '}
              <span className="text-gray-800 font-medium">{location?.posts.length}</span>
            </Text>
            <Text>
              Loại hình du lịch:{' '}
              <span className="text-gray-800 font-medium">{location?.category}</span>
            </Text>
            <Text>Hình ảnh: </Text>
          </div>
          <div className="flex flex-col">
            <Badge color={location?.status === LocationStatus.ACTIVE ? 'green' : 'yellow'}>
              {location?.status}
            </Badge>
            <RatingDisplay
              rating={avgReview}
              maxRating={5}
              numRatings={location?.reviews?.length || 0}
            />
          </div>
        </Group>
        <Image
          maw={240}
          radius="md"
          src={location?.imgUrl}
          alt="Random image"
          className="mx-auto"
        />

        <Modal
          opened={LocationStatusModalOpened}
          onClose={LocationStatusModal.close}
          className="text-center"
        >
          <Text>
            Bạn có chắc muốn đánh dấu địa điểm{' '}
            {location?.status == LocationStatus.ACTIVE ? 'ngưng hoạt động' : 'mở hoạt động'}?
          </Text>
          <Button
            variant="default"
            color={location?.status === LocationStatus.ACTIVE ? 'green' : 'yellow'}
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
            {location?.status == LocationStatus.ACTIVE ? 'Ngưng hoạt động' : 'Mở hoạt động'}
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default LocationDetail;
