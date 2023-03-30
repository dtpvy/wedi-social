import { RequestList } from "@/components/Admin/Request";
import { Text } from "@mantine/core";
import React from "react";

const Request = () => {
  return (
    <div>
      <Text size="xl" className="px-4 ml-8 pt-3 font-semibold">
        Danh sách các request:
      </Text>
      <RequestList />
    </div>
  );
};

export default Request;
