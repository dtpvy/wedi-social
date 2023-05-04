import React, { Component } from 'react';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { Card, Group, Modal, Text, Button, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
const ReplyList = () => {
  const router = useRouter();
  let requestId = parseInt(router.query.id as string, 10);
  const { data: replies, refetch } = trpc.admin.replyList.useQuery({
    requestId,
  });
  const [modalDeleteOpened, modalDelete] = useDisclosure(false);
  const deleteReply = trpc.admin.deleteReply.useMutation();
  const handleSetStatus = (id: number) => {
    deleteReply.mutate(
      { id },
      {
        onSuccess: () => {
          // setCurrentStatus(status);
          refetch();
          modalDelete.close();
        },
        onError: () => {
          console.log('something wrong');
        },
      }
    );
  };

  let list = replies?.map((reply) => {
    return (
      <Card shadow="sm" radius="lg" withBorder className="mt-3 w-full px-8" key={reply.id}>
        <Modal opened={modalDeleteOpened} onClose={modalDelete.close} className="text-center">
          <Text size="lg">Bạn có chắc xóa reply?</Text>

          <Button
            variant="default"
            color="blue"
            mt="md"
            radius="md"
            onClick={() => handleSetStatus(reply.id)}
          >
            Xóa
          </Button>
        </Modal>

        <p className="text-xl font-bold text-gray-800">{reply.title}</p>
        <Group position="apart">
          <p className="my-0">Nội dung reply:</p>
          <p className="my-0">Ngày: {dayjs(reply.createdAt).format('DD/MM/YYYY')} </p>
        </Group>
        <Divider my="sm" />
        <p>{reply.content}</p>
        <Group position="center">
          <Button variant="outline" color="yellow" mt="md" radius="md" onClick={modalDelete.open}>
            Xóa reply
          </Button>
        </Group>
      </Card>
    );
  });
  return <div className="flex flex-col mb-5 items-center w-9/12">{list}</div>;
};

export default ReplyList;
