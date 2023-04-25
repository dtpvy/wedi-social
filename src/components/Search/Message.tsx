import useOpenMessageDialog from "@/hooks/useOpenMessageDialog";
import useUserStore from "@/stores/user";
import { MessageDetail } from "@/types/message";
import { trpc } from "@/utils/trpc";
import { Avatar, Select } from "@mantine/core";
import { User } from "@prisma/client";
import { IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import useTranslation from "@/hooks/useTranslation";

const Message = () => {
  const { show } = useOpenMessageDialog();
  const user = useUserStore.use.user();
  const messQuery = trpc.message.infinite.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const utils = trpc.useContext();
  const { hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage } =
    messQuery;

  const [messages, setMessages] = useState(() => {
    const nts = messQuery.data?.pages
      .map((page) => page.items as unknown as MessageDetail[])
      .flat();
    return nts;
  });

  const addMess = useCallback((incoming?: MessageDetail[]) => {
    setMessages((current) => {
      const map: Record<MessageDetail["id"], MessageDetail> = {};
      for (const msg of current ?? []) {
        map[msg.id] = msg;
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg;
      }
      return Object.values(map).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    });
  }, []);

  useEffect(() => {
    const msgs = messQuery.data?.pages
      .map((page) => page.items as unknown as MessageDetail)
      .flat();
    addMess(msgs);
  }, [messQuery.data?.pages, addMess]);

  trpc.message.onSend.useSubscription(undefined, {
    onData(noti) {
      addMess([noti as MessageDetail]);
    },
    onError(err) {
      console.error("Subscription error:", err);
      utils.notification.infinite.invalidate();
    },
  });

  const { data, isLoading } = trpc.friend.friendList.useQuery({
    search: "",
    order: "asc",
  });

  const friends = useMemo(() => {
    return data?.map((d) => ({ value: d.friend.id, label: d.friend.name }));
  }, [data]);

  const profile = (message: MessageDetail) => {
    return message.sender.id === user?.id ? message.receiver : message.sender;
  };

  const handleShowMessDialog = (id: number) => {
    const user = data?.find((d) => d.friend.id === id)?.friend;
    console.log({ user });
    if (!user) return;
    show(user as unknown as User);
  };

  const {t} = useTranslation();

  return (
    <div className="max-h-[300px] overflow-auto">
      <Select
        icon={<IconSearch />}
        placeholder={isLoading ? t("loadingText") : t("searchText")}
        data={friends || []}
        onChange={(value) => handleShowMessDialog(Number.parseInt(value || ""))}
        className="mb-3"
      />
      {!messages?.length && <div className="text-center">{t("noDataText")}</div>}
      {messages?.map((mess) => {
        const userProfile = profile(mess);
        const { imgUrl, name } = userProfile;
        return (
          <div
            key={mess.id}
            onClick={() => show(userProfile)}
            className="cursor-pointer w-full px-2 py-1 text-gray-900 bg-white rounded-lg shadow border mb-2"
          >
            <div className="flex items-center">
              <div className="relative inline-block shrink-0">
                <Avatar
                  src={imgUrl}
                  className="w-12 h-12 rounded-full"
                  radius="xl"
                />
                <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"></path>
                  </svg>
                  <span className="sr-only">Message icon</span>
                </span>
              </div>
              <div className="ml-3 text-sm font-normal">
                <div className="text-sm font-semibold text-gray-900">
                  {name}
                </div>
                <div className="text-sm font-normal">{`${mess.sender.name}: ${mess.content}`}</div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                  {dayjs(mess.createdAt).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <button
        data-testid="loadMore"
        onClick={() => fetchPreviousPage()}
        disabled={!hasPreviousPage || isFetchingPreviousPage}
        className="px-4 py-2 text-teal-700 underline rounded disabled:opacity-50 w-full text-center"
      >
        {isFetchingPreviousPage
          ? t("loadingMoreText")
          : hasPreviousPage
          ? t("loadMoreText")
          : t("notifEndText")
          }
      </button>
    </div>
  );
};

export default Message;
