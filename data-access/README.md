# data-access

GraphQL API service backed by MongoDB.

## Setup

1. Copy `.env.example` to `.env.local` in the workspace root and fill in the MongoDB credentials:
   - `DB_USERNAME`
   - `DB_PASSWORD`
   - `DB_HOST`
   - `DB_APP_NAME`
   - `DB_NAME` (defaults to `greenlight`)

2. Install dependencies:

```bash
npm install
```

## Development

Run the local GraphQL server:

```bash
npm run dev
```

The sandbox is available at http://localhost:7071/graphql by default.

## Production / Vercel

The root `vercel.json` routes `/graphql` to the serverless function in `api/graphql.ts`, which uses the built output of this package (`data-access/dist`). Make sure the Vercel project has the same MongoDB environment variables configured.

## Code generation

Regenerate TypeScript types from the GraphQL schema:

```bash
npm run gen
```

