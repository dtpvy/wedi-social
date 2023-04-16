import useMessageStore from "@/stores/message";
import useUserStore from "@/stores/user";
import { MessageDetail } from "@/types/message";
import classNames from "@/utils/classNames";
import { trpc } from "@/utils/trpc";
import {
  ActionIcon,
  Avatar,
  Dialog,
  Indicator,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPhone, IconPhoto, IconSend, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { IKUpload } from "imagekitio-react";
import React, {
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const Message = () => {
  const userInfo = useUserStore.use.user();
  const opened = useMessageStore.use.opened();
  const user = useMessageStore.use.user();
  const setOpen = useMessageStore.use.setOpen();
  const send = trpc.message.send.useMutation();
  const [message, setMessage] = useState<{
    content?: string;
    mediaUrls?: string[];
  }>();

  const [firstLoad, setFirstLoad] = useState(false);

  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const messQuery = trpc.message.conversation.useInfiniteQuery(
    { userId: user?.id as number },
    {
      getNextPageParam: (d) => d.nextCursor,
      enabled: !!user?.id,
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
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    });
  }, []);

  useEffect(() => {
    const msgs = messQuery.data?.pages
      .map((page) => page.items as unknown as MessageDetail)
      .flat();
    addMess(msgs);
  }, [messQuery.data?.pages, addMess]);

  const scrollToBottomOfList = useCallback(() => {
    if (scrollTargetRef.current == null) {
      return;
    }

    scrollTargetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [scrollTargetRef]);

  useEffect(() => {
    if (!firstLoad) return;
    scrollToBottomOfList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoad]);

  useEffect(() => {
    setFirstLoad(opened);
  }, [opened]);

  trpc.message.onSend.useSubscription(undefined, {
    onData(noti) {
      addMess([noti as MessageDetail]);
    },
    onError(err) {
      console.error("Subscription error:", err);
      utils.notification.infinite.invalidate();
    },
  });

  const onSend = () => {
    if (!user) return;
    send.mutate(
      {
        userId: user.id,
        content: message?.content,
        mediaUrls: message?.mediaUrls,
      },
      { onSuccess: () => scrollToBottomOfList() }
    );
    setMessage({ content: "", mediaUrls: [] });
  };

  console.log(messages);

  return (
    <Dialog
      opened={opened}
      withCloseButton
      onClose={() => setOpen(false)}
      size="lg"
      radius="md"
      className="mr-6 h-[500px] relative w-[400px] shadow-lg border px-0 pt-0 overflow-hidden"
    >
      <div className="bg-gray-100 text-green-600 font-bold flex items-center gap-3 shadow-lg pb-2 px-2 pt-2">
        <Avatar radius="xl" size="md" src={user?.imgUrl} />
        <div>{user?.name}</div>
      </div>
      <div className="mb-[53px] h-[calc(100%-90px)] overflow-auto pt-4 px-4">
        {/* <button
          data-testid="loadMore"
          onClick={() => fetchPreviousPage()}
          disabled={!hasPreviousPage || isFetchingPreviousPage}
          className="px-4 py-2 text-white bg-green-600 rounded disabled:opacity-40"
        >
          {isFetchingPreviousPage ? "Loading more..." : "Load More"}
        </button> */}
        {messages?.map((mess) => {
          return (
            <div
              key={mess.id}
              className={classNames(
                "w-full max-w-xs px-2 py-1 text-gray-900 bg-white rounded-lg shadow border mb-2",
                {
                  "bg-green-600 text-white ml-auto":
                    mess.senderId === userInfo?.id,
                }
              )}
            >
              <div className="text-sm font-normal">
                <div className="text-sm font-normal">{mess.content}</div>
                <span className="text-xs font-medium">
                  {dayjs(mess.createdAt).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
            </div>
          );
        })}
        {!messages?.length && (
          <div className="bg-green-600 text-white mx-4 px-2 rounded text-center">
            Chưa có tin nhắn nào. Nhắn tin đầu đề bắt đầu mối quan hệ.
          </div>
        )}
        <div ref={scrollTargetRef}></div>
      </div>
      <div className="flex items-center gap-3 absolute bottom-0 left-0 right-0 py-2 px-2 border-t">
        <IKUpload className="hidden" />
        <ActionIcon color="teal" variant="filled">
          <IconPhoto />
        </ActionIcon>
        <TextInput
          onChange={(e) =>
            setMessage((prev) => ({ ...prev, content: e.target.value }))
          }
          value={message?.content}
          className="w-full"
          placeholder="Nhập"
          radius="xl"
        />
        <ActionIcon
          onClick={onSend}
          disabled={!message?.content && !message?.mediaUrls}
          radius="xl"
          className="p-1"
          color="blue"
          variant="filled"
        >
          <IconSend />
        </ActionIcon>
      </div>
    </Dialog>
  );
};

export default Message;
