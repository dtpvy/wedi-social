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
});
