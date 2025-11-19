#!/usr/bin/env bash
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL is not set. Please add it to your .env file or set as environment variable."
  exit 1
fi

# Optionally apply raw SQL migrations for Supabase
if [ -f "./supabase/migrations/0001_init.sql" ]; then
  echo "Applying SQL migration: supabase/migrations/0001_init.sql"
  psql "$DATABASE_URL" -f "./supabase/migrations/0001_init.sql"
fi

# Generate prisma client
npm run db:generate

# Run prisma migrate to ensure migrations are applied
npm run db:migrate || true

# Seed the database
npm run db:seed

echo "Seed script complete."
