# Supabase SQL Migrations

This folder contains SQL migrations and utilities to apply the database schema directly to Postgres (including Supabase local or remote projects).

## Applying migrations locally

1. Start Supabase (if using local stack):

```bash
supabase start
```

2. Ensure your `DATABASE_URL` points to your local Supabase database in `.env`. For example:

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54321/postgres"
```

3. Apply the SQL migration using `psql`:

```bash
psql "$DATABASE_URL" -f ./supabase/migrations/0001_init.sql
```

4. Or run the `prisma/seed.sh` script to automatically apply the SQL and seed the DB:

```bash
bash prisma/seed.sh
```

## Applying schema to Supabase remote

If you have a remote Supabase project, you can use the CLI to connect or use `psql` against the remote database URL:

```bash
# Using psql with remote URL
psql "$DATABASE_URL" -f ./supabase/migrations/0001_init.sql

# Alternatively, using Supabase CLI to connect to a remote DB (requires login and project setup):
# supabase db remote connect --project-ref <ref>
# Then run psql as above against the remote URL
```

## Notes
- The SQL provided as a migration is a canonical DDL. If you prefer using Prisma migrations you may use the Prisma workflow instead: `prisma migrate dev` and `prisma db seed`.
- This SQL migration can be used on any vanilla Postgres-compatible server.
