import { trpc } from "@/utils/trpc";
import { Button, Modal, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import React from "react";

type Props = {
  close: () => void;
  opened?: boolean;
};

const CreateRequest = ({ opened = false, close }: Props) => {
  const create = trpc.request.create.useMutation();
  const utils = trpc.useContext();

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: (value) => (value.length ? null : "Require"),
      content: (value) => (value.length ? null : "Require"),
    },
  });

  const onSubmit = (values: { title: string; content: string }) => {
    create.mutate(values, {
      onSuccess: () => {
        utils.request.requestList.refetch();
        notifications.show({
          message: `Create successfully`,
          color: "green",
          icon: <IconCheck />,
        });
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Create Request"
      centered
      size="lg"
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          placeholder="Nguyên nhân"
          label="Nguyên nhân"
          withAsterisk
          {...form.getInputProps("title")}
        />
        <Textarea
          minRows={10}
          placeholder="Mô tả"
          label="Mô tả chi tiết"
          withAsterisk
          {...form.getInputProps("content")}
        />
        <div className="text-red-500 text-sm mt-3">
          Lưu ý: Bạn không thể chỉnh sửa khi đã tạo
        </div>
        <div className="flex justify-between mt-3">
          <Button onClick={close} color="green" variant="outline">
            Huỷ
          </Button>
          <Button type="submit" color="green">
            Tạo request
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRequest;
