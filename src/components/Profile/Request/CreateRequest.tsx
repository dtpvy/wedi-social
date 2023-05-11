import { trpc } from '@/utils/trpc';
import { Button, Modal, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import React from 'react';
import useTranslation from '@/hooks/useTranslation';
import useToast from '@/hooks/useToast';

type Props = {
  close: () => void;
  opened?: boolean;
};

const CreateRequest = ({ opened = false, close }: Props) => {
  const { show } = useToast();

  const create = trpc.request.create.useMutation();
  const utils = trpc.useContext();
  const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      title: '',
      content: '',
    },
    validate: {
      title: (value) => (value.length ? null : t('requireText')),
      content: (value) => (value.length ? null : t('requireText')),
    },
  });

  const onSubmit = (values: { title: string; content: string }) => {
    create.mutate(values, {
      onSuccess: () => {
        utils.request.requestList.refetch();
        show({
          message: `${t('addsuccessText')}`,
          type: 'success',
        });
      },
    });
  };

  return (
    <Modal opened={opened} onClose={close} title={t('createrequestText')} centered size="lg">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          placeholder={t('reasonText')}
          label={t('reasonText')}
          withAsterisk
          {...form.getInputProps('title')}
        />
        <Textarea
          minRows={10}
          placeholder={t('descriptionText')}
          label={t('detaileddescriptionText')}
          withAsterisk
          {...form.getInputProps('content')}
        />
        <div className="text-red-500 text-sm mt-3">{t('warningText')}</div>
        <div className="flex justify-between mt-3">
          <Button onClick={close} color="green" variant="outline">
            {t('cancelText')}
          </Button>
          <Button type="submit" color="green">
            {t('createrequestText')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRequest;
