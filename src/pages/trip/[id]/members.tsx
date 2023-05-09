import TripLayout from '@/components/Layout/TripLayout';
import { CreatePost, Post } from '@/components/Post';
import { trpc } from '@/utils/trpc';
import { Avatar } from '@mantine/core';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

const Members = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = trpc.trip.memberList.useQuery({ id: +(id as string) });

  return (
    <TripLayout className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {data?.map((member, index) => (
          <div key={index} className="bg-white rounded-lg p-3 flex items-center gap-2">
            <Avatar radius="xl" src={member.user.imgUrl} />
            <div>
              <div className="font-medium">{`${member.user.name}`}</div>
              <div className="text-sm text-gray-600">{`Tham gia: ${dayjs(member.updatedAt).format(
                'DD/MM/YYYY'
              )}`}</div>
            </div>
          </div>
        ))}
      </div>
    </TripLayout>
  );
};

export default Members;
