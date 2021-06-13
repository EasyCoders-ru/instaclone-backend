import { PrismaClient, User } from ".prisma/client";

export type Context = {
  loggedInUser?: User;
  protectedResolver: (
    ourResolver: Resolver
  ) => (root: any, args: any, context: Context, info: any) => any;
  client: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
