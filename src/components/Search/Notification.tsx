import { trpc } from '@/utils/trpc';
import { Avatar } from '@mantine/core';
import type { Notification, User } from '@prisma/client';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import useTranslation from '@/hooks/useTranslation';

type NotificationDetail = Notification & { actor: User };

const Notification = () => {
  const notiQuery = trpc.notification.infinite.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const utils = trpc.useContext();
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = notiQuery;

  const [notifications, setNotifications] = useState(() => {
    const nts = notiQuery.data?.pages
      .map((page) => page.items as unknown as NotificationDetail)
      .flat();
    return nts;
  });

  const addNoti = useCallback((incoming?: NotificationDetail[]) => {
    setNotifications((current) => {
      const map: Record<NotificationDetail['id'], NotificationDetail> = {};
      for (const msg of current ?? []) {
        map[msg.id] = msg;
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg;
      }
      return Object.values(map).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    });
  }, []);

  useEffect(() => {
    const msgs = notiQuery.data?.pages
      .map((page) => page.items as unknown as NotificationDetail)
      .flat();
    addNoti(msgs);
  }, [notiQuery.data?.pages, addNoti]);

  trpc.notification.onPush.useSubscription(undefined, {
    onData(noti) {
      addNoti([noti as NotificationDetail]);
    },
    onError(err) {
      console.error(t('subscriptionErrorText'), err);
      utils.notification.infinite.invalidate();
    },
  });

  const { t } = useTranslation();

  return (
    <div className="max-h-[300px] overflow-auto">
      {!notifications?.length && <div className="text-center">No data</div>}
      {notifications?.map((noti) => (
        <div
          key={noti.id}
          className="w-full max-w-xs px-2 py-1 text-gray-900 bg-white rounded-lg shadow border mb-2"
        >
          <div className="flex items-center">
            <Avatar src={noti.imgUrl || ''} className="w-12 h-12 rounded-full" radius="xl" />
            <div className="ml-3 text-sm font-normal">
              <div className="text-sm font-semibold text-gray-900">{noti.actor?.name}</div>
              <div className="text-sm font-normal">{noti.content}</div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                {dayjs(noti.createdAt).format('DD/MM/YYYY HH:mm')}
              </span>
            </div>
          </div>
        </div>
      ))}
      <button
        data-testid="loadMore"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="cursor-pointer px-4 py-2 text-teal-700 underline rounded disabled:opacity-50 w-full text-center"
      >
        {isFetchingNextPage
          ? t('loadingMoreText')
          : hasNextPage
          ? t('loadMoreText')
          : t('notifEndText')
          }
      </button>
    </div>
  );
};

export default Notification;
