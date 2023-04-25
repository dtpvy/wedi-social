import { Avatar, Button, Input } from "@mantine/core";
import { IconMapPinFilled, IconSearch } from "@tabler/icons-react";
import React from "react";
import useTranslation from "@/hooks/useTranslation";

const CreatePost = () => {
  const {t} = useTranslation();

  return (
    <div className="bg-white shadow p-4 rounded ">
      <div className="flex items-center gap-4 w-full">
        <Avatar radius="xl" />
        <Input placeholder={t("statusText")} radius="xl" className="w-1/2" />
        <div className="flex items-center gap-1 ml-auto">
          <IconMapPinFilled className="text-red-600" size={30} />
          <div>{t("selectLocationText")}</div>
        </div>
        <Button color="green" radius="xl">
          {t("postVerbText")}
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
