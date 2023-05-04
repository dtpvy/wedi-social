import useUserStore from "@/stores/user";
import { trpc } from "@/utils/trpc";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconLoader,
  IconMoodEdit,
  IconPhotoEdit,
  IconX,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { IKUpload } from "imagekitio-react";
import React, { useRef, useState } from "react";
import useTranslation from "@/hooks/useTranslation"; 
const Header = () => {
  const utils = trpc.useContext();
  const user = useUserStore((state) => state.user);
  const updateImage = trpc.user.updateImage.useMutation();
  const avatarRef = useRef<HTMLInputElement>(null);
  const bgRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [bgLoading, setBgLoading] = useState(false);
  const { t } = useTranslation();
  const handleChangeImage = async (params: {
    imgUrl?: string;
    bgUrl?: string;
  }) => {
    try {
      await updateImage.mutateAsync(params);
      notifications.show({
        message: t("addsuccesText"),
        color: "green",
        icon: <IconCheck />,
      });
      utils.user.findUser.refetch();
    } catch (e: any) {
      notifications.show({
        message: t("errorText"),
        color: "red",
        icon: <IconX />,
      });
    }
    setLoading(false);
    setBgLoading(false);
  };

  return (
    <div className="flex gap-3 items-center mb-4">
      <div className="mr-auto">
        <div className="font-bold text-lg">{t("editprofileText")}</div>
        <div className="text-green-700 font-italic">{user?.status}</div>
        <div className="text-sm text-gray-600">
          {`${t("lasteditText")}: ${dayjs(user?.updatedAt).format(
            "DD/MM/YYYY HH:mm"
          )}`}
        </div>
      </div>
      <Button
        onClick={() => avatarRef.current?.click()}
        color="green"
        leftIcon={loading ? <IconLoader /> : <IconMoodEdit />}
        disabled={loading}
      >
        {t("changeavatarText")}
      </Button>
      <IKUpload
        inputRef={avatarRef}
        folder="/wedi"
        onUploadStart={() => setLoading(true)}
        onSuccess={(file) => handleChangeImage({ imgUrl: file.url })}
        onError={() => {
          notifications.show({
            message: t("errorText"),
            color: "red",
            icon: <IconX />,
          });
          setLoading(false);
        }}
        accept="image/*"
        className="hidden"
      />
      <Button
        onClick={() => bgRef.current?.click()}
        variant="outline"
        color="green"
        leftIcon={bgLoading ? <IconLoader /> : <IconPhotoEdit />}
        loading={updateImage.isLoading}
      >
        {t("changebackgroundText")}
      </Button>
      <IKUpload
        inputRef={bgRef}
        folder="/wedi"
        onUploadStart={() => setBgLoading(true)}
        onSuccess={(file) => handleChangeImage({ bgUrl: file.url })}
        onError={() => {
          notifications.show({
            message: 'Có lỗi xảy ra. Vui lòng thử lại',
            color: 'red',
            icon: <IconX />,
          });
          setBgLoading(true);
        }}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default Header;
