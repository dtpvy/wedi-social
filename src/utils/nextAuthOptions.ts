import { verify } from "argon2";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/utils/prisma";
import { z } from "zod";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "mail@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const creds = await z
          .object({
            email: z.string().email(),
            password: z.string().min(4).max(12),
          })
          .parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        } as any;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = { email: token.email };
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
    newUser: "/sign-up",
  },
};
