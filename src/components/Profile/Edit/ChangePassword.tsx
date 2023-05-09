import ERROR_MESSAGES from '@/constants/errorMessage';
import { trpc } from '@/utils/trpc';
import { Button, Modal, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

type Props = {
  opened?: boolean;
  close: () => void;
};

const ChangePassword = ({ opened = false, close }: Props) => {
  const utils = trpc.useContext();
  const update = trpc.user.updatePassword.useMutation();
  const { getInputProps, onSubmit, setFieldError, reset } = useForm({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => (value ? null : 'Require'),
      newPassword: (value) => (value ? null : 'Require'),
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords did not match' : null,
    },
  });

  const handleSubmit = async (params: { password: string; newPassword: string }) => {
    try {
      await update.mutateAsync(params);
      utils.user.findUser.refetch();
      close();
      reset();
      notifications.show({
        message: `Action successfully`,
        color: 'green',
        icon: <IconCheck />,
      });
    } catch (e: any) {
      if (e.message === ERROR_MESSAGES.invalidPassword) {
        setFieldError('password', e.message);
      } else {
        notifications.show({
          message: 'Có lỗi xảy ra. Vui lòng thử lại',
          color: 'red',
          icon: <IconX />,
        });
      }
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Change password">
      <form onSubmit={onSubmit(handleSubmit)}>
        <PasswordInput
          placeholder="Password"
          label="Password"
          withAsterisk
          {...getInputProps('password')}
        />
        <PasswordInput
          placeholder="New Password"
          label="New Password"
          withAsterisk
          {...getInputProps('newPassword')}
        />
        <PasswordInput
          placeholder="Confirm Password"
          label="Confirm Password"
          withAsterisk
          {...getInputProps('confirmPassword')}
        />
        <Button type="submit" className="w-full mt-3" color="green">
          Change Password
        </Button>
      </form>
    </Modal>
  );
};

export default ChangePassword;
