import { z } from "zod";
import { prisma } from "../prisma";
import { adminAuthedProcedure, router } from "../trpc";
import { ERROR_MESSAGES } from "@/constants/error";

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
    const user = await prisma.user.findMany();
    return {
      status: 200,
      result: user,
    };
  }),
  setUserStatus: adminAuthedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.any(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, status } = input;
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
      });

      return {
        result: user,
      };
    }),
});
