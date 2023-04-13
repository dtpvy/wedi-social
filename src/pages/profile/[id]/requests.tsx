/* eslint-disable react-hooks/rules-of-hooks */
import { ProfileLayout } from "@/components/Layout";
import { CreateRequest, Request } from "@/components/Profile/Request";
import { trpc } from "@/utils/trpc";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const requests = () => {
  const [type, setType] = useState<"all" | "pending" | "replied">("all");
  const [opened, { open, close }] = useDisclosure(false);

  const { data, isLoading } = trpc.request.requestList.useQuery({ type });

  return (
    <ProfileLayout className="flex flex-col gap-4">
      <div className="bg-white rounded shadow p-4 flex items-center gap-4">
        <Button
          radius="xl"
          variant={type === "all" ? "light" : "outline"}
          color="green"
        >
          Tất cả
        </Button>
        <Button
          radius="xl"
          variant={type === "replied" ? "light" : "outline"}
          color="green"
        >
          Đã phản hồi
        </Button>
        <Button
          radius="xl"
          variant={type === "pending" ? "light" : "outline"}
          color="green"
        >
          Chưa phản hồi
        </Button>
        <Button onClick={open} className="ml-auto" radius="xl" color="green">
          Tạo request
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {data?.map((request) => (
          <Request key={request.id} request={request} />
        ))}
      </div>
      <CreateRequest opened={opened} close={close} />
    </ProfileLayout>
  );
};

export default requests;
