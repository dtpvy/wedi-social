import "next-auth";
import { User as UserModel } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: number;
    isAdmin: boolean;
    email: string;
  }

  interface Session {
    user: User;
    expires: string;
  }
}
