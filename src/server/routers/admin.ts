import { z } from "zod";
import { prisma } from "../prisma";
import { adminAuthedProcedure, router } from "../trpc";
import { ERROR_MESSAGES } from "@/constants/error";
import { UserStatus } from "@prisma/client";
import { request } from "https";

export const adminRouter = router({
  adminList: adminAuthedProcedure.query(async () => {
    const admin = await prisma.admin.findMany();

    return {
      status: 200,
      result: admin,
    };
  }),
  deactive: adminAuthedProcedure
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
  active: adminAuthedProcedure
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
  userList: adminAuthedProcedure.query(async () => {
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
  setUserStatus: adminAuthedProcedure
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
  userDetail: adminAuthedProcedure
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
  requestList: adminAuthedProcedure.query(async () => {
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
  requestDetail: adminAuthedProcedure
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
  replyList: adminAuthedProcedure
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
  sendRequestReply: adminAuthedProcedure
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
  deleteReply: adminAuthedProcedure
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
  trackingPage: adminAuthedProcedure.input(z.object({})).query(async ({}) => {
    const tracking = await prisma.tracking.groupBy({
      by: ["page"],
      _sum: {
        amount: true,
      },
    });
    console.log(tracking);
    return tracking;
  }),
});
