import { z } from "zod";
import { router, publicProcedure, TRPCError } from "../trpc";
import { hash } from "argon2";

const userRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string(),
        phone: z.string(),
        name: z.string(),
        password: z.string().min(4).max(12),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password, phone, name } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { email, password: hashedPassword, phone, name },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: email,
      };
    }),
});

export default userRouter;
