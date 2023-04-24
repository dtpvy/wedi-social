import { LocationDetail } from "@/types/location";
import { Avatar, Button } from "@mantine/core";
import { Location } from "@prisma/client";
import { IconMapPinFilled } from "@tabler/icons-react";
import { useState } from "react";
import ModalCreate from "./ModalCreate";
import ModalLocation from "./ModalLocation";
import ModalReview from "./ModalReview";

const CreatePost = () => {
  const [modal, setModal] = useState("");
  const [location, setLocation] = useState<LocationDetail[]>();
  const [curLocation, setCurLocation] = useState<Location>();

  const handleCreateLocation = (location: LocationDetail) => {
    setLocation((prev) => [...(prev || []), location]);
    setModal("create");
  };

  const handleEditLocation = (location: Location) => {
    setCurLocation(location);
    setModal("location");
  };

  const handleDeleteLocation = (location: Location) => {
    setLocation((prev) => prev?.filter((d) => d.id !== location.id));
  };

  return (
    <div className="bg-white shadow p-4 rounded ">
      <div className="flex items-center gap-4 w-full">
        <Avatar radius="xl" />
        <div
          onClick={() => setModal("create")}
          className="rounded-full w-1/2 cursor-pointer hover:bg-gray-100 px-3 py-2 border"
        >
          Write something...
        </div>
        <div
          onClick={() => setModal("location")}
          className="flex items-center gap-1 ml-auto"
        >
          <IconMapPinFilled className="text-red-600" size={30} />
          <div>Chọn địa điểm</div>
        </div>
        <Button color="green" radius="xl">
          Đăng bài
        </Button>
      </div>

      <ModalCreate
        opened={modal === "create"}
        onClose={() => {
          setModal("");
          setCurLocation(undefined);
        }}
        location={location}
        onOpenReview={() => setModal("review")}
        onCreateLocation={() => {
          setCurLocation(undefined);
          setModal("location");
        }}
        onEditLocation={handleEditLocation}
        onDeleteLocation={handleDeleteLocation}
      />

      <ModalLocation
        curLocation={curLocation}
        opened={modal === "location"}
        onClose={() => {
          setCurLocation(undefined);
          setModal("create");
        }}
        onOpenReview={handleCreateLocation}
      />

      <ModalReview
        locations={location}
        opened={modal === "review"}
        onClose={() => setModal("")}
      />
    </div>
  );
};

export default CreatePost;
