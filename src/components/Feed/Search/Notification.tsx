import { trpc } from "@/utils/trpc";
import { Avatar } from "@mantine/core";
import type { Notification, User } from "@prisma/client";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

type NotificationDetail = Notification & { actor: User };

const Notification = () => {
  const notiQuery = trpc.notification.infinite.useInfiniteQuery(
    {},
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const utils = trpc.useContext();
  const { hasPreviousPage, isFetchingPreviousPage, fetchPreviousPage } =
    notiQuery;

  const [notifications, setNotifications] = useState(() => {
    const nts = notiQuery.data?.pages
      .map((page) => page.items as unknown as NotificationDetail)
      .flat();
    return nts;
  });

  const addNoti = useCallback((incoming?: NotificationDetail[]) => {
    setNotifications((current) => {
      const map: Record<NotificationDetail["id"], NotificationDetail> = {};
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
      console.error("Subscription error:", err);
      utils.notification.infinite.invalidate();
    },
  });

  return (
    <div className="max-h-[300px] overflow-auto">
      {!notifications?.length && <div className="text-center">No data</div>}
      {notifications?.map((noti) => (
        <div
          key={noti.id}
          className="w-full max-w-xs px-2 py-1 text-gray-900 bg-white rounded-lg shadow border mb-2"
        >
          <div className="flex items-center">
            <div className="relative inline-block shrink-0">
              <Avatar
                src={noti.actor.imgUrl}
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
                {noti.actor.name}
              </div>
              <div className="text-sm font-normal">{noti.content}</div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                {dayjs(noti.createdAt).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
          </div>
        </div>
      ))}
      <button
        data-testid="loadMore"
        onClick={() => fetchPreviousPage()}
        disabled={!hasPreviousPage || isFetchingPreviousPage}
        className="px-4 py-2 text-teal-700 underline rounded disabled:opacity-50 w-full text-center"
      >
        {isFetchingPreviousPage
          ? "Loading more..."
          : hasPreviousPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
};

export default Notification;
