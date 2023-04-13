/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { Prisma, PrismaClient } from "@prisma/client";

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  prismaGlobal.prisma = prisma;
}

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof typeof Prisma[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export const excludeFields = <T extends Entity, K extends Keys<T>>(
  type: T,
  omit: K[]
) => {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
};
