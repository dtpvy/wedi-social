import ERROR_MESSAGES from '@/constants/error';
import { trpc } from '@/utils/trpc';
import { Button, Modal, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';
import useTranslation from '@/hooks/useTranslation';

type Props = {
  opened?: boolean;
  close: () => void;
};

const ChangePassword = ({ opened = false, close }: Props) => {
  const { t } = useTranslation();
  const utils = trpc.useContext();
  const update = trpc.user.updatePassword.useMutation();
  const { getInputProps, onSubmit, setFieldError, reset } = useForm({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => (value ? null : t('requireText')),
      newPassword: (value) => (value ? null : t('requireText')),
      confirmPassword: (value, values) =>
        value !== values.newPassword ? t('passwordDidNotMatchText') : null,
    },
  });

  const handleSubmit = async (params: { password: string; newPassword: string }) => {
    try {
      await update.mutateAsync(params);
      utils.user.findUser.refetch();
      close();
      reset();
      notifications.show({
        message: `${t('addsuccessText')}`,
        color: 'green',
        icon: <IconCheck />,
      });
    } catch (e: any) {
      if (e.message === ERROR_MESSAGES.invalidPassword) {
        setFieldError(`${t('passwordText')}`, e.message);
      } else {
        notifications.show({
          message: t('errorTryAgainText'),
          color: 'red',
          icon: <IconX />,
        });
      }
    }
  };

  return (
    <Modal opened={opened} onClose={close} title={t('changePasswordText')}>
      <form onSubmit={onSubmit(handleSubmit)}>
        <PasswordInput
          placeholder={t('passwordText')}
          label={t('passwordText')}
          withAsterisk
          {...getInputProps('password')}
        />
        <PasswordInput
          placeholder={t('newPasswordText')}
          label={t('newPasswordText')}
          withAsterisk
          {...getInputProps('newPassword')}
        />
        <PasswordInput
          placeholder={t('confirmPasswordText')}
          label={t('confirmPasswordText')}
          withAsterisk
          {...getInputProps('confirmPassword')}
        />
        <Button type="submit" className="w-full mt-3" color="green">
          {t('changePasswordText')}
        </Button>
      </form>
    </Modal>
  );
};

export default ChangePassword;
