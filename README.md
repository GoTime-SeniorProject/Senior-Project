# Senior Project

Base web application for the senior project. Built with a Vite + React + TypeScript frontend using Material UI, and a Node.js + GraphQL + MongoDB backend.

## Structure

- `data-access/` — GraphQL API and MongoDB data layer
- `ui/` — User-facing web application
- `api/graphql.ts` — Vercel serverless entry point for the GraphQL API
- `vercel.json` — Vercel deployment configuration

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

Fill in `.env.local` with your MongoDB credentials (`DB_USERNAME`, `DB_PASSWORD`, `DB_HOST`, `DB_APP_NAME`). The `DB_NAME` defaults to `senior-project`.

3. Start the backend and frontend (in separate terminals):

```bash
npm run dev -w data-access
npm run dev -w ui
```

The frontend dev server proxies `/graphql` to the backend at `http://localhost:7071`.

## Build

```bash
npm run build
```

`prebuild` automatically runs `format:check` and `lint:check` to catch issues before TypeScript/Vite run.

## Formatting and linting

This project uses [Biome](https://biomejs.dev/) for formatting and linting.

```bash
npm run format        # format all files
npm run format:check  # check formatting without writing
npm run lint          # lint and auto-fix issues
npm run lint:check    # lint without writing
npm run check         # format + lint with auto-fix
npm run check:ci      # format + lint checks for CI
```

## Deploy to Vercel

1. Link the project to Vercel:

```bash
vercel
```

2. Add the MongoDB environment variables in the Vercel dashboard.

3. Deploy:

```bash
vercel --prod
```

The frontend is served from `ui/dist`, and `/graphql` is routed to the serverless function in `api/graphql.ts`.

## Notes

- The frontend was migrated from Ant Design to Material UI.
- Domain-specific pages from the junior project were removed to leave a minimal base structure.
- The existing `greenlight` MongoDB database is still used by the backend.
