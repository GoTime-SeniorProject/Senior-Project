import type { Collection, Db, Document } from 'mongodb';
import { ObjectId } from 'mongodb';

/* ─────────────────────────────
    COLLECTION HELPERS
───────────────────────────── */

export function userCollections(db: Db) {
  return db.collection('users');
}

/* ─────────────────────────────
    GENERIC FIND HELPERS
───────────────────────────── */

export async function findMongoDocuments(
  collections: Collection<Document> | Collection<Document>[],
  query: Record<string, any>
) {
  const list = Array.isArray(collections) ? collections : [collections];
  const docs = await Promise.all(
    list.map((collection) => collection.find(query).sort({ id: 1 }).toArray())
  );

  return docs.flat();
}

/* ─────────────────────────────
    OBJECT ID HELPERS
───────────────────────────── */

export function asObjectId(value: any) {
  if (value instanceof ObjectId) return value;
  if (typeof value === 'string' && ObjectId.isValid(value)) {
    return new ObjectId(value);
  }
  return null;
}

/* ─────────────────────────────
    RELATION QUERY BUILDER
───────────────────────────── */

export function relationQueryFromParent(parent: any, fieldNames: string[]) {
  for (const fieldName of fieldNames) {
    const value = parent?.[fieldName];
    if (value === null || value === undefined) continue;

    const objectId = asObjectId(value);

    if (objectId) {
      return {
        $or: [{ [fieldName]: objectId }, { [fieldName]: String(value) }],
      };
    }

    return {
      $or: [{ [fieldName]: value }, { [fieldName]: String(value) }],
    };
  }

  return {};
}
