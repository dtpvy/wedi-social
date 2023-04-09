import {
  Header,
  Diagrams,
  Statistics,
  Admin,
} from "@/components/Admin/Dashboard";
import { trpc } from "@/utils/trpc";
import { Loader, Text } from "@mantine/core";
import React from "react";

const Dashboard = () => {
  const { data, isLoading, refetch } = trpc.admin.adminList.useQuery();

  return (
    <div>
      <Text size="xl" className="px-4 ml-8 pt-3 font-semibold">
        Pending requests:
      </Text>
      <Header />
      <Text size="xl" className="relative px-4 ml-8 pt-3 font-semibold">
        Danh sách Admin:
        {isLoading && <Loader className="absolute top-1/2 left-1/2 -tr" />}
      </Text>
      <div className="px-4 mt-4">
        {data?.result.map((d) => (
          <Admin key={d.id} admin={d} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
