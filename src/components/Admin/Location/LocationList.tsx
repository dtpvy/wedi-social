import React from "react";
import { Button, Modal, Text, Divider, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSquarePlus } from "@tabler/icons-react";
import ComponentBox from "../ComponentBox";
import { trpc } from "@/utils/trpc";

const LocationList = (props: any) => {
  const { data: locations } = trpc.admin.locationList.useQuery();
  let { statusVisibility } = props;
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

      <div className="w-11/12 mx-auto my-3">
        <div className="flex justify-start font-semibold text-gray-500">
          <p className="w-1/12 ml-12">ID</p>
          <p className="w-3/12">Tên</p>
          <p className="w-3/12 pl-2">Địa chỉ</p>
          {/* <p className="w-2/12">Nội dung</p> */}
          <p className="w-2/12 ml-4">Số bài viết đánh giá</p>
          <p className="w-1/12">Trình trạng</p>
        </div>

        {locations?.result.map((location) => (
          <div key={location.id}>
            <ComponentBox
              props={{
                id: location.id,
                input2: location.name,
                input3: `${location.address}`,
                input4: location.posts.length,
                status: location.status,
                type: "location",
                statusVisibility,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
