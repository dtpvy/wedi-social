import { LocationList } from "@/components/Admin/Location";
import { Text } from "@mantine/core";
import React from "react";

const Location = () => {
  return (
    <div>
      <Text size="xl" className="px-4 ml-8 pt-3 font-semibold">
        Danh sách các địa điểm du lịch:
      </Text>
      <LocationList />
    </div>
  );
};

export default Location;
