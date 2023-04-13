import { publicProcedure, router } from "../trpc";
import { adminRouter } from "./admin";
import { friendRouter } from "./friend";
import { notificationRouter } from "./notification";
import { userRouter } from "./user";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),

  user: userRouter,
  admin: adminRouter,
  notification: notificationRouter,
  friend: friendRouter,
});

export type AppRouter = typeof appRouter;
