import { Admin, Reply, Request } from "@prisma/client";

export type RequestDetail = Request & {
  reply: (Reply & { admin: Admin })[];
};
