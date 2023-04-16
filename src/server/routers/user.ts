import { ERROR_MESSAGES } from "@/constants/error";
import { hash } from "argon2";
import { z } from "zod";
import { prisma } from "../prisma";
import { authedProcedure, publicProcedure, router } from "../trpc";
import { use } from "react";

export const userRouter = router({
  findUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { id } = input;

      const user = await prisma.user.findFirst({
        where: { id },
        include: {
          posts: true,
          friends: true,
          userFriends: true,
          notification: {
            where: { seen: false },
          },
          receiveMessages: true,
        },
      });

      return user;
    }),
  signup: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        phone: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, name, phone } = input;
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (user) {
        throw new Error(ERROR_MESSAGES.userExist);
      }

      const hashedPassword = await hash(password);
      const result = await prisma.user.create({
        data: { email, password: hashedPassword, name, phone },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.name,
      };
    }),

  updateInfo: authedProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        phone: z.string(),
      })
    )
    .mutation(async ({}) => {}),
});
