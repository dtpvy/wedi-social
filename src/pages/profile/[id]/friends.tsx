import { ProfileLayout } from "@/components/Layout";
import { Friend } from "@/components/Profile/Friend";
import FriendRequest from "@/components/Profile/Friend/FriendRequest";
import { trpc } from "@/utils/trpc";
import { Button, Input, Loader } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import useTranslation from "@/hooks/useTranslation"; 

const Friends = () => {
  const [type, setType] = useState("");

  const [value, setValue] = useDebouncedState("", 200);
  const [order, setOrder] = useState("asc");
  const { t } = useTranslation();
  
  const { data, isLoading } = trpc.friend.friendList.useQuery({
    search: value,
    order,
  });

  return (
    <ProfileLayout className="flex flex-col gap-4">
      <div className="bg-white rounded shadow p-4 flex items-center gap-4">
        <Input
          onChange={(e) => setValue(e.target.value)}
          icon={<IconSearch />}
          radius="xl"
          placeholder= {t("searchText")}
          className="mr-auto"
        />
        <Button
          onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
          radius="xl"
          variant="light"
          color="green"
        >
          {order === "asc" ? t("recentText") : t("oldestText")}
        </Button>
        <Button
          onClick={() => setType("request")}
          radius="xl"
          variant="outline"
          color="green"
        >
          {t("friendrequestText")}
        </Button>
        <Button
          onClick={() => setType("owner")}
          radius="xl"
          variant="outline"
          color="green"
        >
        {t("sentrequestText")}
        </Button>
      </div>
      {isLoading && <Loader />}
      <div className="grid grid-cols-2 w-full gap-4">
        {data?.map((d) => {
          const { id, name, imgUrl } = d.friend;
          return (
            <Friend
              key={`${d.user.id}_${d.friend?.id}`}
              id={id}
              name={name}
              imgUrl={imgUrl}
              mutualFriends={d.mutualFriends}
            />
          );
        })}
      </div>
      <FriendRequest
        opened={!!type}
        owner={type === "request"}
        onClose={() => setType("")}
      />
    </ProfileLayout>
  );
};

export default Friends;
