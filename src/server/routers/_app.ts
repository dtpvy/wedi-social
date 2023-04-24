import { publicProcedure, router } from "../trpc";
import { adminRouter } from "./admin";
import { commentRouter } from "./comment";
import { friendRouter } from "./friend";
import { locationRouter } from "./location";
import { messageRouter } from "./message";
import { notificationRouter } from "./notification";
import { postRouter } from "./post";
import { reactionRouter } from "./reaction";
import { requestRouter } from "./request";
import { reviewRouter } from "./review";
import { scheduleRouter } from "./schedule";
import { tripRouter } from "./trip";
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
  post: postRouter,
  comment: commentRouter,
  reaction: reactionRouter,
  review: reviewRouter,
  trip: tripRouter,
  schedule: scheduleRouter,
});

export type AppRouter = typeof appRouter;
