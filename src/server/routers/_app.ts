import { publicProcedure, router } from "../trpc";
import { adminRouter } from "./admin";
import { friendRouter } from "./friend";
import { locationRouter } from "./location";
import { messageRouter } from "./message";
import { notificationRouter } from "./notification";
import { requestRouter } from "./request";
import { userRouter } from "./user";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),

  user: userRouter,
  admin: adminRouter,
  notification: notificationRouter,
  friend: friendRouter,
  request: requestRouter,
  message: messageRouter,
  location: locationRouter,
});

export type AppRouter = typeof appRouter;
