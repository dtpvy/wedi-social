import { ProfileLayout } from "@/components/Layout";
import { Request } from "@/components/Profile/Request";
import { Button } from "@mantine/core";
import React from "react";

const requests = () => {
  return (
    <ProfileLayout className="flex flex-col gap-4">
      <div className="bg-white rounded shadow p-4 flex items-center gap-4">
        <Button radius="xl" variant="light" color="green">
          Đã phản hồi
        </Button>
        <Button radius="xl" variant="outline" color="green">
          Chưa phản hồi
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <Request key={index} />
        ))}
      </div>
    </ProfileLayout>
  );
};

export default requests;
