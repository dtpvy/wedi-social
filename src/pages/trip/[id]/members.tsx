import TripLayout from '@/components/Layout/TripLayout';
import { CreatePost, Post } from '@/components/Post';
import { trpc } from '@/utils/trpc';
import { Avatar } from '@mantine/core';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import useTranslation from '@/hooks/useTranslation';
import { MainLayout } from '@/components/Layout';

const Members = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = trpc.trip.memberList.useQuery({ id: +(id as string) });

  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4">
      {data?.map((member, index) => (
        <div key={index} className="bg-white rounded-lg p-3 flex items-center gap-2">
          <Avatar radius="xl" src={member.user.imgUrl} />
          <div>
            <div className="font-medium">{member.user.name}</div>
            <div className="text-sm text-gray-600">{`${t('joinedGroupText')} ${dayjs(
              member.updatedAt
            ).format('DD/MM/YYYY')}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

Members.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TripLayout className="w-full flex flex-col gap-4">{page}</TripLayout>
    </MainLayout>
  );
};

export default Members;
