import TripLayout from '@/components/Layout/TripLayout';
import { trpc } from '@/utils/trpc';
import { ActionIcon, Avatar } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

const Requests = () => {
  const router = useRouter();
  const { id } = router.query;
  const tripId = +(id as string);
  const { data, refetch } = trpc.trip.requestList.useQuery({ id: tripId });
  const utils = trpc.useContext();

  const accept = trpc.trip.accept.useMutation();
  const reject = trpc.trip.reject.useMutation();

  const handleAccept = (userId: number) => {
    accept.mutate(
      { id: tripId, userId },
      {
        onSuccess: () => {
          refetch();
          utils.trip.get.refetch();
        },
      }
    );
  };

  const handleReject = (userId: number) => {
    reject.mutate(
      { id: tripId, userId },
      {
        onSuccess: () => {
          refetch();
          utils.trip.get.refetch();
        },
      }
    );
  };

  return (
    <TripLayout className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {data?.map((member, index) => (
          <div key={index} className="bg-white rounded-lg p-3 flex items-center gap-2">
            <Avatar radius="xl" src={member.user.imgUrl} />
            <div>
              <div className="font-medium">{member.user.name}</div>
              <div className="text-sm text-gray-600">{`Tham gia: ${dayjs(member.updatedAt).format(
                'DD/MM/YYYY'
              )}`}</div>
            </div>
            <ActionIcon
              onClick={() => handleAccept(member.userId)}
              className="ml-auto"
              color="teal"
              variant="filled"
            >
              <IconCheck size="1.125rem" />
            </ActionIcon>
            <ActionIcon onClick={() => handleReject(member.userId)} color="red" variant="filled">
              <IconX size="1.125rem" />
            </ActionIcon>
          </div>
        ))}
      </div>
    </TripLayout>
  );
};

export default Requests;
