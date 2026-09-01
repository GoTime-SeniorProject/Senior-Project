import { Db, MongoClient, ServerApiVersion } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

function getMongoClient() {
  console.log('[mongo-client] getMongoClient called, client cached:', Boolean(client));
  if (client) {
    return client;
  }

  const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_APP_NAME } = process.env;

  if (!DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_APP_NAME) {
    throw new Error('DB_USERNAME, DB_PASSWORD, DB_HOST, and DB_APP_NAME must be set.');
  }

  const uri = `mongodb+srv://${encodeURIComponent(DB_USERNAME)}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}/?appName=${encodeURIComponent(DB_APP_NAME)}`;
  const safeUri = uri.replace(/:([^@]+)@/, ':****@');
  console.log('[mongo-client] uri:', safeUri);

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  console.log('[mongo-client] MongoClient instance created');
  return client;
}

export async function getDb(): Promise<Db> {
  if (db) {
    return db;
  }

  console.log('[mongo-client] getDb called');
  console.log('[mongo-client] env:', {
    DB_USERNAME_SET: Boolean(process.env.DB_USERNAME),
    DB_PASSWORD_SET: Boolean(process.env.DB_PASSWORD),
    DB_HOST_SET: Boolean(process.env.DB_HOST),
    DB_APP_NAME_SET: Boolean(process.env.DB_APP_NAME),
    DB_NAME: process.env.DB_NAME,
  });

  const mongoClient = getMongoClient();
  console.log('[mongo-client] client created');

  console.log('[mongo-client] connecting...');
  await Promise.race([
    mongoClient.connect(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('mongoClient.connect() timed out after 6s')), 6000)
    ),
  ]);
  console.log('[mongo-client] connected, pinging admin...');
  await mongoClient.db('admin').command({ ping: 1 });

  const dbName = process.env.DB_NAME ?? 'greenlight';
  console.log('Connected to MongoDB Atlas. Using database:', dbName);

  db = mongoClient.db(dbName);

  return db;
}

export { getMongoClient };
