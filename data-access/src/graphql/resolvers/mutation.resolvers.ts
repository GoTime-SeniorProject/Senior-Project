import type { Db } from 'mongodb';
import { ObjectId } from 'mongodb';

type Context = {
  mongoDb: Db;
};

export const mutationResolvers = {
  // ─────────────────────────────
  // USER
  // ─────────────────────────────

  createUser: async (_: unknown, args: any, ctx: Context) => {
    const dbInput = args.input || {};

    const result = await ctx.mongoDb.collection('users').insertOne(dbInput);

    return ctx.mongoDb.collection('users').findOne({ _id: result.insertedId });
  },

  updateUser: async (_: unknown, args: any, ctx: Context) => {
    const dbInput = args.input || {};

    await ctx.mongoDb
      .collection('users')
      .updateOne({ _id: new ObjectId(args.id) }, { $set: dbInput });

    return ctx.mongoDb.collection('users').findOne({ _id: new ObjectId(args.id) });
  },

  deleteUser: async (_: unknown, args: any, ctx: Context) => {
    const result = await ctx.mongoDb.collection('users').deleteOne({ _id: new ObjectId(args.id) });

    return result.deletedCount > 0;
  },
};
