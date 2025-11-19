param()

if (-not $env:DATABASE_URL) {
  Write-Host "DATABASE_URL is not set. Please add it to your .env file or set as environment variable."
  exit 1
}

# Apply SQL migration for Supabase if present
if (Test-Path "./supabase/migrations/0001_init.sql") {
  Write-Host "Applying SQL migration: supabase/migrations/0001_init.sql"
  psql $env:DATABASE_URL -f "./supabase/migrations/0001_init.sql"
}

# Generate prisma client
npm run db:generate

# Run prisma migrate to ensure migrations are applied
npm run db:migrate -ErrorAction SilentlyContinue

# Seed the database
npm run db:seed

Write-Host 'Seed script complete.'
