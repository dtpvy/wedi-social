import React from 'react';
import { Modal, Card, Button, Text, Badge, Group, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { trpc } from '@/utils/trpc';
import dayjs from 'dayjs';
import CreateReply from './CreateReply';
type Props = {
  id: number;
};
const RequestDetail = ({ id }: Props) => {
  const { data: request } = trpc.admin.requestDetail.useQuery({ id });
  const { data: replies } = trpc.admin.replyList.useQuery({ requestId: id });
  const [opened, respond] = useDisclosure(false);
  const [deleteRequestOpened, deleteRequest] = useDisclosure(false);
  let date = dayjs(request?.createdAt).format('DD/MM/YYYY');

  let handleDelete = () => {
    deleteRequest.close();
  };

  let sendRespond = () => {
    respond.close();
  };

  return (
    <Card shadow="sm" radius="lg" withBorder className="w-9/12 px-8">
      <div className="flex justify-between mt-5">
        <Text weight={500} className="text-xl font-bold text-gray-800">
          {request?.title} <span className="text-gray-500">#{request?.id}</span>
        </Text>
        <Badge color={replies?.length ? 'blue' : 'pink'} variant="light">
          {replies?.length ? 'Đã phản hồi' : 'Chưa phản hồi'}
        </Badge>
      </div>
      <Divider my="sm" />

      <div className="flex justify-between ">
        <p className="my-0">
          User: <span className="font-medium ">{request?.user.name}</span>
        </p>
        <p className="my-0">Ngày tạo: {date}</p>
      </div>
      <Text size="m">Nội dung request:</Text>
      <Divider my="sm" />
      <Text size="m">{request?.content}</Text>

      <Group position="center">
        <Button variant="outline" color="blue" mt="md" radius="md" onClick={respond.open}>
          Phản hồi
        </Button>
        <CreateReply opened={opened} close={sendRespond} id={id} />
      </Group>
    </Card>
  );
};

export default RequestDetail;
