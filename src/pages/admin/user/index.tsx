import { UserList } from "@/components/Admin/User";
import React from "react";
import { Text, Divider } from "@mantine/core";
import { trpc } from "@/utils/trpc";

const User = () => {
  return (
    <div>
      <Text size="xl" className="px-4 ml-8 pt-3 font-semibold">
        UserList:
      </Text>
      {/* <Divider my="sm" /> */}
      <UserList />
    </div>
  );
};

export default User;
