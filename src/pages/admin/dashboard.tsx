import { Header, Diagrams, Statistics } from "@/components/Admin/Dashboard";
import { Text } from "@mantine/core";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Text size="xl" className="px-4 ml-8 pt-3 font-semibold">
        Pending requests:
      </Text>
      <Header />
      <Text size="xl" className="px-4 ml-8 pt-3 font-semibold">
        Thống kê:
      </Text>
      <Statistics />
      <Diagrams />
    </div>
  );
};

export default Dashboard;
