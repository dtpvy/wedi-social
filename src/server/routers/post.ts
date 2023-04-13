// import { ERROR_MESSAGES } from "@/constants/error";
// import dayjs from "dayjs";
// import { z } from "zod";
// import { prisma } from "../prisma";
// import { authedProcedure, router } from "../trpc";

// export const friendRouter = router({
//   add: authedProcedure
//     .input(z.object({ userId: z.number() }))
//     .query(async ({ input, ctx }) => {
//       const { id } = ctx.user;
//       const { userId } = input;
//       const request = await prisma.friend.findFirst({
//         where: { userId: id, friendId: userId },
//       });

//       if (
//         request?.status === "REJECT" &&
//         dayjs().diff(request.updatedAt, "days") < 1
//       ) {
//         return {
//           status: 302,
//           message: ERROR_MESSAGES.waitRejectedRequest,
//           time: dayjs().diff(request.updatedAt, "minute"),
//         };
//       }

//       const data = await prisma.friend.create({
//         data: { userId: id, friendId: userId, status: "PENDING" },
//       });

//       return {
//         status: 200,
//         data,
//       };
//     }),
//   reject: authedProcedure
//     .input(z.object({ userId: z.number() }))
//     .query(async ({ input, ctx }) => {
//       const { id } = ctx.user;
//       const { userId } = input;
//       await prisma.friend.update({
//         where: { userId_friendId: { userId, friendId: id } },
//         data: { status: "REJECT" },
//       });

//       return true;
//     }),
//   accept: authedProcedure
//     .input(z.object({ userId: z.number() }))
//     .query(async ({ input, ctx }) => {
//       const { id } = ctx.user;
//       const { userId } = input;
//       await prisma.friend.update({
//         where: { userId_friendId: { userId, friendId: id } },
//         data: { status: "ACCEPT" },
//       });

//       return true;
//     }),
//   delete: authedProcedure
//     .input(z.object({ userId: z.number() }))
//     .query(async ({ input, ctx }) => {
//       const { id } = ctx.user;
//       const { userId } = input;
//       await prisma.friend.delete({
//         where: { userId_friendId: { userId, friendId: id } },
//       });

//       return true;
//     }),
// });
