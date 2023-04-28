/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from '@prisma/client';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

const softDeleteMiddleware = (models: string[]) => {
  /***********************************/
  /* SOFT DELETE MIDDLEWARE */
  /***********************************/

  prisma.$use(async (params, next) => {
    if (models.includes(params.model || '')) {
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst';
        params.args.where['isDeleted'] = false;
      }
      if (params.action === 'findMany') {
        if (params.args.where) {
          if (params.args.where.deleted == undefined) {
            params.args.where['isDeleted'] = false;
          }
        } else {
          params.args['where'] = { isDeleted: false };
        }
      }
    }
    return next(params);
  });

  prisma.$use(async (params, next) => {
    if (models.includes(params.model || '')) {
      if (params.action == 'update') {
        params.action = 'updateMany';
        params.args.where['isDeleted'] = false;
      }
      if (params.action == 'updateMany') {
        if (params.args.where != undefined) {
          params.args.where['isDeleted'] = false;
        } else {
          params.args['where'] = { isDeleted: false };
        }
      }
    }
    return next(params);
  });

  prisma.$use(async (params, next) => {
    if (models.includes(params.model || '')) {
      const deletedAt = new Date();
      if (params.action == 'delete') {
        params.action = 'update';
        params.args['data'] = { isDeleted: true, deletedAt };
      }
      if (params.action == 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data != undefined) {
          params.args.data['isDeleted'] = true;
          params.args.data['deletedAt'] = deletedAt;
        } else {
          params.args['data'] = { isDeleted: true, deletedAt };
        }
      }
    }
    return next(params);
  });
};

softDeleteMiddleware(['Post']);

if (process.env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = prisma;
}

// type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
// type Entity = A<keyof typeof Prisma>;
// type Keys<T extends Entity> = Extract<
//   keyof typeof Prisma[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
//   string
// >;

// export const excludeFields = <T extends Entity, K extends Keys<T>>(
//   type: T,
//   omit: K[]
// ) => {
//   type Key = Exclude<Keys<T>, K>;
//   type TMap = Record<Key, true>;
//   const result: TMap = {} as TMap;
//   for (const key in Prisma[`${type}ScalarFieldEnum`]) {
//     if (!omit.includes(key as K)) {
//       result[key as Key] = true;
//     }
//   }
//   return result;
// }
