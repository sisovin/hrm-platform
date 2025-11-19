#!/usr/bin/env bash
set -e

# Deploy the Supabase project (functions, static assets) and run database migrations
# Required environment variables:
# SUPABASE_PROJECT_REF  - your Supabase project ref
# SUPABASE_DB_URL       - full Postgres DB connection string for the Supabase project
# NEXTAUTH_URL          - the URL of your running app (supabase needs to know this for redirects)

if [ -z "$SUPABASE_PROJECT_REF" ]; then
  echo "SUPABASE_PROJECT_REF is not set. Please export it or add to .env."
  exit 1
fi

if [ -z "$SUPABASE_DB_URL" ]; then
  echo "SUPABASE_DB_URL is not set. Please export it or add to .env."
  exit 1
fi

# Make sure the Supabase CLI is logged in
if ! supabase status > /dev/null 2>&1; then
  echo "Supabase CLI not logged in. Running 'supabase login' interactively..."
  supabase login
fi

# Link project
supabase link --project-ref $SUPABASE_PROJECT_REF

# Deploy functions and other services if defined
echo "Deploying Supabase project (functions, static, etc.)..."
supabase deploy --project-ref $SUPABASE_PROJECT_REF

# Use the provided DB URL for Prisma migrations
export DATABASE_URL="$SUPABASE_DB_URL"

# Generate Prisma client
npx prisma generate

# Run Prisma migrations (non-interactive deploy)
npx prisma migrate deploy --schema=prisma/schema.prisma

# Optionally run seed script (JS fallback)
if [ -f "./prisma/seed.cjs" ]; then
  echo "Seeding database via node prisma/seed.cjs..."
  node prisma/seed.cjs
fi

echo "Supabase deploy completed successfully."