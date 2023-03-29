import React from "react";
import LocationBox from "./LocationBox";
import { Button, Modal, Text, Divider, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSquarePlus } from "@tabler/icons-react";
const LocationList = () => {
  const locations = [
    {
      id: 1,
      name: "Quán ăn 1",
      review: 3.5,
      ward: "1",
      district: "1",
      city: "HCM",
      nation: "Vietnam",
      image:
        "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    },
    {
      id: 3,
      name: "Quán lẩu 2",
      review: 4,
      ward: "1",
      district: "1",
      city: "HCM",
      nation: "Vietnam",
      image:
        "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    },
    {
      id: 2,
      name: "Quán nước 3",
      review: 2.2,
      ward: "1",
      district: "1",
      city: "HCM",
      nation: "Vietnam",
      image:
        "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    },
  ];

  const [addLocationOpened, addLocation] = useDisclosure(false);

  const handleAdd = () => {
    addLocation.close();
  };
  return (
    <div>
      <Modal
        opened={addLocationOpened}
        onClose={addLocation.close}
        title="Nhập thông tin địa điểm du lịch muốn thêm"
      >
        <Select
          label="Chọn loại hình du lịch"
          placeholder="Chọn"
          data={[
            { value: "Ăn uống", label: "Ăn uống" },
            { value: "Đi chơi", label: "Đi chơi" },
            { value: "Di tích lịch sử", label: "Di tích lịch sử" },
          ]}
          mt="md"
        />{" "}
        <TextInput label="Tên địa điểm" placeholder="Nhập tên" mt="md" />
        <TextInput
          data-autofocus
          label="Địa chỉ:"
          placeholder="Nhập địa chỉ mới"
          mt="md"
        />
        <Button
          variant="default"
          color="blue"
          mt="md"
          radius="md"
          onClick={handleAdd}
        >
          Thêm địa điểm
        </Button>
      </Modal>
      <div className="flex justify-between w-11/12">
        <Text size="xl" className="px-4 ml-8 pt-3 font-semibold">
          Danh sách các địa điểm du lịch:
        </Text>
        <Button
          variant="default"
          color="blue"
          mt="md"
          radius="md"
          onClick={addLocation.open}
          leftIcon={<IconSquarePlus size="1rem" />}
        >
          thêm địa điểm
        </Button>
      </div>
      <Divider my="sm" variant="dotted" />

      {/* Danh sách địa điểm */}
      <div className="flex flex-wrap justify-center">
        {locations.map((location) => (
          <div key={location.id} className="w-5/12 mx-5 my-3">
            <LocationBox location={location} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
