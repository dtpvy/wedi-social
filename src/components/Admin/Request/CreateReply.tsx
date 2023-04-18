import { useForm } from "@mantine/form";
import React from "react";
import {
  Modal,
  Card,
  Button,
  TextInput,
  Badge,
  Group,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { trpc } from "@/utils/trpc";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";

type Props = {
  close: () => void;
  opened?: boolean;
  id: number;
};

const CreateReply = ({ opened = false, close, id }: Props) => {
  const create = trpc.admin.sendRequestReply.useMutation();
  const utils = trpc.useContext();

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      requestId: id,
    },
    validate: {
      title: (value) => (value.length ? null : "Require"),
      content: (value) => (value.length ? null : "Require"),
      //   requestId: (value) => (value ? id : "Require"),
    },
  });

  const onSubmit = (values: {
    title: string;
    content: string;
    requestId: number;
  }) => {
    create.mutate(values, {
      onSuccess: () => {
        console.log("print succeeded");
        utils.admin.replyList.refetch();
        notifications.show({
          message: `Create successfully`,
          color: "green",
          icon: <IconCheck />,
        });
        close();
      },
      onError: () => {
        console.log("print sth");
      },
    });
  };

  return (
    <Modal opened={opened} onClose={close} title="Phản hồi request" centered>
      <form action="" onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          placeholder="Nhập tiêu đề"
          label="Tiêu đề phản hồi:"
          withAsterisk
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Nhập nội dung phản hồi"
          label="Nội dung phản hồi:"
          withAsterisk
          {...form.getInputProps("content")}
        />
        <Button
          variant="outline"
          color="blue"
          mt="md"
          radius="md"
          className="items-end"
          type="submit"
        >
          Gửi phản hồi
        </Button>
      </form>
    </Modal>
  );
};

export default CreateReply;
