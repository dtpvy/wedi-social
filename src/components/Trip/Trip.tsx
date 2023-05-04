import classNames from "@/utils/classNames";
import { Avatar, Button, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import useTranslation from "@/hooks/useTranslation"; 
type Props = {
  className?: string;
};

const Trip = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={classNames("bg-white rounded-lg shadow p-4", className)}>
      <div className="flex gap-4 mb-4">
        <Avatar size="xl" />
        <div>
          <Text weight={500} lineClamp={2} size="md">
            Ghiền Đà Lạt
          </Text>
          <div className="text-gray-400 text-sm mt-2 mb-1">
            Tham gia từ: 2 ngày trước
          </div>
          <div className="text-gray-600 text-sm">
            Hoạt động lần cuối: 10 phút trước
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="light" className="w-full" color="green">
        {t("openGroupText")}
        </Button>
        <Button variant="default">
          <IconDots />
        </Button>
      </div>
    </div>
  );
};

export default Trip;
