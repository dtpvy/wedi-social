import { ProfileLayout } from "@/components/Layout";
import { Friend } from "@/components/Profile/Friend";
import { Button, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const Friends = () => {
  return (
    <ProfileLayout className="flex flex-col gap-4">
      <div className="bg-white rounded shadow p-4 flex items-center gap-4">
        <Input
          icon={<IconSearch />}
          radius="xl"
          placeholder="Search..."
          className="mr-auto"
        />
        <Button radius="xl" variant="light" color="green">
          Gần đây
        </Button>
        <Button radius="xl" variant="outline" color="green">
          Lời mời kết bạn
        </Button>
      </div>
      <div className="grid grid-cols-2 w-full gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <Friend key={index} />
        ))}
      </div>
    </ProfileLayout>
  );
};

export default Friends;
