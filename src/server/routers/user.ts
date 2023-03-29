import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { hash } from "argon2";
import prisma from "../prisma";

export const userRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string(),
        phone: z.string(),
        name: z.string(),
        password: z.string().min(4).max(12),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, phone, name } = input;

      const exists = await prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        // throw new TRPCError({
        //   code: "CONFLICT",
        //   message: "User already exists.",
        // });
      }

      const hashedPassword = await hash(password);

      const result = await prisma.user.create({
        data: { email, password: hashedPassword, phone, name },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: email,
      };
    }),
});
