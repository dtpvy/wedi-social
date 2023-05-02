import { z } from "zod";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";
import { adminAuthProcedure, router } from "../trpc";
import { ERROR_MESSAGES } from "@/constants/error";
import { UserStatus, LocationStatus } from "@prisma/client";
import { request } from "https";

export const adminRouter = router({
  adminList: adminAuthProcedure.query(async () => {
    const admin = await prisma.admin.findMany();

    return {
      status: 200,
      result: admin,
    };
  }),
  deactive: adminAuthProcedure
    .input(
      z.object({
        id: z.number(),
        createdAt: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, createdAt } = input;
      const admin = await prisma.admin.findFirst({
        where: { email: ctx.user.email },
      });

      if (!admin || admin.createdAt >= createdAt) {
        throw new Error(ERROR_MESSAGES.dontHavePermission);
      }

      await prisma.admin.update({
        where: { id },
        data: { isDeleted: true, deletedAt: new Date() },
      });

      return {
        status: 201,
        message: "Action successfully",
        result: true,
      };
    }),
  deactiveLocation: adminAuthProcedure
    .input(
      z.object({
        id: z.number(),
        createdAt: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, createdAt } = input;
      const location = await prisma.location.findFirst({
        where: { id: input.id },
      });

      if (!location || location.createdAt >= createdAt) {
        throw new Error(ERROR_MESSAGES.dontHavePermission);
      }

      // await prisma.location.update({
      //   where: { id },
      //   data: { deletedAt: new Date() },
      // });

      return {
        status: 201,
        message: "Action successfully",
        result: true,
      };
    }),
  active: adminAuthProcedure
    .input(
      z.object({
        id: z.number(),
        createdAt: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, createdAt } = input;
      const admin = await prisma.admin.findFirst({
        where: { email: ctx.user.email },
      });

      if (!admin || admin.createdAt >= createdAt) {
        throw new Error(ERROR_MESSAGES.dontHavePermission);
      }

      await prisma.admin.update({
        where: { id },
        data: { isDeleted: false, deletedAt: null },
      });

      return {
        status: 201,
        message: "Action successfully",
        result: true,
      };
    }),
  userList: adminAuthProcedure.query(async () => {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    return {
      status: 200,
      result: users,
    };
  }),
  setUserStatus: adminAuthProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.nativeEnum(UserStatus).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let { id, status } = input;
      const admin = await prisma.admin.findFirst({
        where: { email: ctx.user.email },
      });
      const user = await prisma.user.findFirst({
        where: { id: id },
      });

      if (!admin) {
        throw new Error(ERROR_MESSAGES.dontHavePermission);
      }

      await prisma.user.update({
        where: { id },
        data: { status: status },
      });

      return {
        status: 201,
        message: "Action successfully",
        result: true,
      };
    }),

  setLocationStatus: adminAuthProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.nativeEnum(LocationStatus).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let { id, status } = input;
      const admin = await prisma.admin.findFirst({
        where: { email: ctx.user.email },
      });
      if (!admin) {
        throw new Error(ERROR_MESSAGES.dontHavePermission);
      }

      const location = await prisma.location.findFirst({
        where: { id: id },
      });

      await prisma.location.update({
        where: { id },
        data: { status: status },
      });

      return {
        status: 201,
        message: "Action successfully",
        result: true,
      };
    }),

  userDetail: adminAuthProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          posts: true,
        },
      });

      return user;
    }),
  requestList: adminAuthProcedure.query(async () => {
    const requests = await prisma.request.findMany({
      include: {
        reply: true,
        user: true,
      },
    });

    const replies = await prisma.reply.findMany({ include: { request: true } });

    return {
      requests: requests,
    };
  }),
  requestDetail: adminAuthProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const request = await prisma.request.findFirst({
        where: { id: input.id },
        include: { user: true },
      });
      return request;
    }),
  replyList: adminAuthProcedure
    .input(
      z.object({
        requestId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const replies = await prisma.reply.findMany({
        where: {
          requestId: input.requestId,
        },
      });
      return replies;
    }),
  sendRequestReply: adminAuthProcedure
    .input(
      z.object({
        requestId: z.number(),
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const admin = await prisma.admin.findFirst({
        where: { email: ctx.user.email },
      });

      if (!admin) {
        throw new Error(ERROR_MESSAGES.dontHavePermission);
      }

      await prisma.reply.create({
        data: {
          title: input.title,
          content: input.content,
          requestId: input.requestId,
          adminId: admin.id,
        },
      });

      return {
        status: 201,
        message: "Action successfully",
        result: true,
      };
    }),
  deleteReply: adminAuthProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const admin = await prisma.admin.findFirst({
        where: { email: ctx.user.email },
      });

      if (!admin) {
        throw new Error(ERROR_MESSAGES.dontHavePermission);
      }
      await prisma.reply.delete({
        where: {
          id: input.id,
        },
      });
      return {
        status: 201,
        message: "Action successfully",
        result: true,
      };
    }),
  trackingPage: adminAuthProcedure.input(z.object({})).query(async ({}) => {
    const trackingPage = await prisma.tracking.groupBy({
      by: ["page"],
      _sum: {
        amount: true,
      },
    });
    const trackingEvent = await prisma.tracking.groupBy({
      by: ["event"],
      _sum: {
        amount: true,
      },
    });
    console.log(trackingPage);
    return { trackingPage, trackingEvent };
  }),
  locationList: adminAuthProcedure.query(async () => {
    const locations = await prisma.location.findMany({
      include: {
        posts: true,
        reviews: true,
        schedules: true,
      },
    });
    return {
      status: 200,
      result: locations,
    };
  }),
  locationDetail: adminAuthProcedure
    .input(
      z.object({
        locationId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const location = prisma.location.findUnique({
        where: { id: input.locationId },
        include: {
          posts: true,
        },
      });
      return location;
    }),
  userPosts: adminAuthProcedure
    .input(
      z.object({
        userId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const posts = await prisma.post.findMany({
        where: {
          creatorId: input.userId,
        },
        include: {
          reactions: true,
          comments: true,
          trips: true,
          locations: true,
        },
      });

      return posts;
    }),
  // Recent7DaysPosts: adminAuthedProcedure.query(async () => {
  //   const currentDate = new Date();
  //   const lastSevenDays = new Date(
  //     currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  //   );
  //   type CustomScalarFieldEnum = (typeof Prisma.PostScalarFieldEnum)[] | "date";
  //   const recentData = await prisma.post.groupBy({
  //     where: {
  //       createdAt: {
  //         gt: lastSevenDays,
  //       },
  //     },
  //   });
  //   return recentData;
  // }),
});
