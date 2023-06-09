import ERROR_MESSAGES from '../../constants/errorMessage';
import { hash, verify } from 'argon2';
import { z } from 'zod';
import { prisma } from '../prisma';
import { authProcedure, publicProcedure, router } from '../trpc';

export const userRouter = router({
  findUser: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const { id } = input;

    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        posts: true,
        friends: {
          where: {
            status: 'ACCEPT',
          },
        },
        language: true,
        userFriends: {
          where: {
            status: 'ACCEPT',
          },
        },
        notification: {
          where: { seen: false },
        },
        requests: true,
        joinTrip: true,
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
        message: 'Account created successfully',
        result: result.name,
      };
    }),

  updateInfo: authProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        phone: z.string(),
        cityId: z.number().nullable(),
        countryId: z.number().nullable(),
        languageId: z.number().nullable(),
        districtId: z.number().nullable(),
        wardId: z.number().nullable(),
        street: z.string().nullable(),
        bio: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      await prisma.user.update({ where: { id: userId }, data: input });
      return true;
    }),
  updateImage: authProcedure
    .input(z.object({ imgUrl: z.string().optional(), bgUrl: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      await prisma.user.update({ where: { id: userId }, data: input });
      return true;
    }),
  updateLanguage: authProcedure
    .input(z.object({ languageId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      await prisma.user.update({ where: { id: userId }, data: input });
      return true;
    }),
  updatePassword: authProcedure
    .input(z.object({ password: z.string(), newPassword: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      const user = await prisma.user.findFirst({ where: { id: userId } });
      const isValidPassword = await verify(user?.password || '', input.password);
      if (!isValidPassword) throw new Error(ERROR_MESSAGES.invalidPassword);
      const password = await hash(input.newPassword);
      await prisma.user.update({
        where: { id: userId },
        data: { password },
      });
      return true;
    }),
  list: authProcedure.input(z.object({})).query(async ({ ctx }) => {
    const productsCount = await prisma.user.count();
    const skip = Math.floor(Math.random() * Math.max(productsCount - 10, 0));
    const user = await prisma.user.findMany({
      where: { id: { not: ctx.user.id } },
      include: {
        friends: { where: { status: 'ACCEPT', friendId: ctx.user.id } },
        userFriends: { where: { status: 'ACCEPT', userId: ctx.user.id } },
      },
      take: 10,
      skip,
    });

    return user;
  }),
  forgetPassword: publicProcedure
    .input(z.object({ email: z.string(), newPassword: z.string() }))
    .mutation(async ({ input }) => {
      const exist = await prisma.user.findFirst({ where: { email: input.email } });
      if (!exist) throw new Error('Not exist email');
      const hashedPassword = await hash(input.newPassword);
      await prisma.user.update({ where: { id: exist.id }, data: { password: hashedPassword } });
      return true;
    }),
});
