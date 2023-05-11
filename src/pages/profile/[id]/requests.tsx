/* eslint-disable react-hooks/rules-of-hooks */
import { MainLayout, ProfileLayout } from '@/components/Layout';
import { CreateRequest, Request } from '@/components/Profile/Request';
import { trpc } from '@/utils/trpc';
import { Button, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { type ReactElement, useState } from 'react';
import useTranslation from '@/hooks/useTranslation';

const Requests = () => {
  const [type, setType] = useState<'all' | 'pending' | 'replied'>('all');
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  const { data, isLoading } = trpc.request.requestList.useQuery({ type });

  return (
    <>
      <div className="bg-white rounded shadow p-4 flex items-center gap-4">
        <Button
          radius="xl"
          variant={type === 'all' ? 'light' : 'outline'}
          color="green"
          onClick={() => setType('all')}
        >
          {t('allText')}
        </Button>
        <Button
          radius="xl"
          variant={type === 'replied' ? 'light' : 'outline'}
          color="green"
          onClick={() => setType('replied')}
        >
          {t('responsedText')}
        </Button>
        <Button
          radius="xl"
          variant={type === 'pending' ? 'light' : 'outline'}
          color="green"
          onClick={() => setType('pending')}
        >
          {t('noresponsedText')}
        </Button>
        <Button onClick={open} className="ml-auto" radius="xl" color="green">
          {t('createrequestText')}
        </Button>
      </div>
      {isLoading && <Loader />}
      <div className="flex flex-col gap-4">
        {data?.map((request) => (
          <Request key={request.id} request={request} />
        ))}
      </div>
      <CreateRequest opened={opened} close={close} />
    </>
  );
};

Requests.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ProfileLayout className="flex flex-col gap-4">{page}</ProfileLayout>
    </MainLayout>
  );
};

export default Requests;
