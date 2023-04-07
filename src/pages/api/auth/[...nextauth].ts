import { prisma } from "@/server/prisma";
import { verify } from "argon2";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const EMAIL_WHITE_LIST = ["dtpvy0202@gmail.com", "cminhchanh2803@gmail.com"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials || {};
        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, password as string);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          isAdmin: false,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        if (
          !profile.email_verified ||
          !EMAIL_WHITE_LIST.includes(profile.email)
        )
          return false;
        const exist = await prisma.admin.findFirst({
          where: { email: profile.email },
        });

        if (!exist) {
          await prisma.admin.create({
            data: {
              email: profile.email,
              imgUrl: profile.picture,
              name: profile.name,
            },
          });
        }

        return !exist || !exist.isDeleted;
      }
      return true;
    },
    jwt: async ({ token, user, account }: any) => {
      if (user) {
        token.id = user.id;
        if (account.provider === "google") {
          token.user = { ...token.user, isAdmin: true };
        } else {
          token.user = { ...token.user, isAdmin: false };
        }
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.id = token.id;
        session.user = { ...session.user, ...token.user };
      }

      return session;
    },
  },
  pages: {
    signIn: "/admin/signin",
  },
};

export default NextAuth(authOptions);
