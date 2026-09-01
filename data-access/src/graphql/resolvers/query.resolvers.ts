import type { Db } from 'mongodb';
import { ObjectId } from 'mongodb';

import { findMongoDocuments, userCollections } from '../../db/mongoHelpers.js';

type Context = {
  mongoDb: Db;
};

function mapMongoUser(doc: any) {
  return {
    _id: String(doc._id),
    id: String(doc.id ?? doc._id),
    firstName: doc.first_name ?? doc.firstName ?? null,
    lastName: doc.last_name ?? doc.lastName ?? null,
    username: doc.username ?? null,
    password: doc.password ?? null,
    profileImg: doc.profile_img ?? doc.profileImg ?? null,
    role: doc.role ?? null,
    organization: doc.organizationId ?? doc.organization_id ?? doc.organization ?? null,
    organizationUsername: doc.organizationUsername ?? doc.organization_username ?? null,
    createdAt: doc.created_at ?? doc.createdAt ?? null,
    updatedAt: doc.updated_at ?? doc.updatedAt ?? null,
  };
}

function buildUserIdQuery(value: string) {
  const clauses: Record<string, any>[] = [{ id: value }, { username: value }];

  if (/^[a-fA-F0-9]{24}$/.test(value)) {
    clauses.push({ _id: new ObjectId(value) });
  }

  return { $or: clauses };
}

export const queryResolvers = {
  // ─────────────────────────────
  // USERS
  // ─────────────────────────────

  getUsers: async (_: unknown, args: any, ctx: Context) => {
    const query: any = {};

    if (args.username) query.username = args.username;

    const docs = await findMongoDocuments(userCollections(ctx.mongoDb), query);

    return docs.map(mapMongoUser);
  },

  getUser: async (_: unknown, args: any, ctx: Context) => {
    const value = args.id;
    const clauses: Record<string, any>[] = [{ id: value }, { username: value }];

    const numericValue = Number(value);
    if (value !== '' && !Number.isNaN(numericValue)) {
      clauses.push({ id: numericValue });
    }

    if (/^[a-fA-F0-9]{24}$/.test(value)) {
      clauses.push({ _id: new ObjectId(value) });
    }

    const docs = await findMongoDocuments(userCollections(ctx.mongoDb), { $or: clauses });

    const doc = docs[0];
    if (!doc) return null;

    return mapMongoUser(doc);
  },

  getUserByUsername: async (_: unknown, args: any, ctx: Context) => {
    const docs = await findMongoDocuments(userCollections(ctx.mongoDb), {
      username: args.username,
    });

    const doc = docs[0];
    if (!doc) return null;

    return mapMongoUser(doc);
  },
};
