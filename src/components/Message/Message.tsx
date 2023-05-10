import useMessageStore from '@/stores/message';
import useUserStore from '@/stores/auth';
import { MessageDetail } from '@/types/message';
import classNames from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { ActionIcon, Avatar, Dialog, Image, Loader, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPhoto, IconSend, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { IKUpload } from 'imagekitio-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import useTranslation from '@/hooks/useTranslation';

const Message = () => {
  const userInfo = useUserStore.use.user();
  const opened = useMessageStore.use.opened();
  const user = useMessageStore.use.user();
  const setOpen = useMessageStore.use.setOpen();
  const send = trpc.message.send.useMutation();
  const [message, setMessage] = useState('');

  const [firstLoad, setFirstLoad] = useState(false);

  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  const messQuery = trpc.message.conversation.useInfiniteQuery(
    { userId: user?.id as number },
    {
      getNextPageParam: (d) => d.nextCursor,
      enabled: !!user?.id,
    }
  );

  const utils = trpc.useContext();
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = messQuery;

  const [messages, setMessages] = useState(() => {
    const nts = messQuery.data?.pages
      .map((page) => page.items as unknown as MessageDetail[])
      .flat();
    return nts;
  });

  const addMess = useCallback((incoming?: MessageDetail[]) => {
    setMessages((current) => {
      const map: Record<MessageDetail['id'], MessageDetail> = {};
      for (const msg of current ?? []) {
        map[msg.id] = msg;
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg;
      }
      return Object.values(map).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    });
  }, []);

  useEffect(() => {
    const msgs = messQuery.data?.pages.map((page) => page.items as unknown as MessageDetail).flat();
    addMess(msgs);
  }, [messQuery.data?.pages, addMess]);

  const scrollToBottomOfList = useCallback(() => {
    if (scrollTargetRef.current == null) {
      return;
    }

    scrollTargetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [scrollTargetRef]);

  useEffect(() => {
    if (!firstLoad) return;
    scrollToBottomOfList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoad]);

  useEffect(() => {
    setFirstLoad(opened && !!messages?.length);
  }, [opened, messages, firstLoad]);

  trpc.message.onSend.useSubscription(undefined, {
    onData(noti) {
      addMess([noti as MessageDetail]);
    },
    onError(err) {
      console.error('Subscription error:', err);
      utils.notification.infinite.invalidate();
    },
  });

  const onSend = (mediaUrls?: string[]) => {
    if (!user) return;
    send.mutate(
      {
        userId: user.id,
        content: message,
        mediaUrls,
      },
      { onSuccess: () => scrollToBottomOfList() }
    );
    setMessage('');
  };
  
  const { t } = useTranslation();

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
        {isFetchingNextPage ? (
          <Loader size="sm" className="w-full" />
        ) : (
          hasNextPage && (
            <div
              data-testid="loadMore"
              onClick={() => fetchNextPage()}
              className="underline text-green-600 text-center cursor-pointer"
            >
              {t('loadMoreText')}
            </div>
          )
        )}

        {messages?.map((mess) => {
          return (
            <div
              key={mess.id}
              className={classNames(
                'w-full max-w-xs px-2 py-1 text-gray-900 bg-white rounded-lg shadow border mb-2',
                {
                  'bg-green-600 text-white ml-auto': mess.senderId === userInfo?.id,
                }
              )}
            >
              <div className="text-sm font-normal">
                {mess.mediaUrls?.[0] && (
                  <Image
                    src={mess.mediaUrls[0]}
                    alt=""
                    width={100}
                    height={100}
                    className="rounded overflow-hidden"
                  />
                )}
                <div className="text-sm font-normal">{mess.content}</div>
                <span className="text-xs font-medium">
                  {dayjs(mess.createdAt).format('DD/MM/YYYY HH:mm')}
                </span>
              </div>
            </div>
          );
        })}
        {!messages?.length && (
          <div className="bg-green-600 text-white mx-4 px-2 rounded text-center">
            {t('havenAnyMessageText')}
          </div>
        )}
        <div ref={scrollTargetRef}></div>
      </div>
      <div className="flex items-center gap-3 absolute bottom-0 left-0 right-0 py-2 px-2 border-t">
        <ActionIcon onClick={() => uploadRef.current?.click()} color="teal" variant="filled">
          <IconPhoto />
        </ActionIcon>

        <IKUpload
          inputRef={uploadRef}
          folder="/wedi"
          onSuccess={(file) => onSend([file.url])}
          onError={() =>
            notifications.show({
              message: t('errorTryAgainText'),
              color: 'red',
              icon: <IconX />,
            })
          }
          accept="image/*"
          className="hidden"
        />
        <TextInput
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="w-full"
          placeholder= {t('writeText')}
          radius="xl"
        />
        <ActionIcon
          onClick={() => onSend()}
          disabled={!message}
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
