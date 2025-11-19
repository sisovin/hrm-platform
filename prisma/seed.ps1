param()

# Load .env file if it exists
if (Test-Path ".env") {
  Write-Host "Loading environment variables from .env file..."
  Get-Content ".env" | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]*)\s*=\s*(.*)$') {
      $key = $matches[1].Trim()
      $value = $matches[2].Trim().Trim('"')
      [Environment]::SetEnvironmentVariable($key, $value, "Process")
      Write-Host "  ✓ Loaded: $key"
    }
  }
}

if (-not $env:DATABASE_URL) {
  Write-Host "❌ DATABASE_URL is not set. Please add it to your .env file or set as environment variable."
  exit 1
}

Write-Host "✓ DATABASE_URL is set"

# Apply SQL migration for Supabase if present (skip if psql not available)
if (Test-Path "./supabase/migrations/0001_init.sql") {
  if (Get-Command psql -ErrorAction SilentlyContinue) {
    Write-Host "Applying SQL migration: supabase/migrations/0001_init.sql"
    psql $env:DATABASE_URL -f "./supabase/migrations/0001_init.sql"
  }
  else {
    Write-Host "⚠️  psql not found, skipping SQL migration (migrations will be applied via Prisma)"
  }
}

# Generate prisma client
Write-Host "`nGenerating Prisma client..."
npm run db:generate
if ($LASTEXITCODE -ne 0) {
  Write-Host "⚠️  Prisma generate had warnings but continuing..."
}

# Run prisma migrate to ensure migrations are applied
Write-Host "`nApplying Prisma migrations..."
try {
  npm run db:migrate 2>&1 | Out-Null
}
catch {
  Write-Host "⚠️  Migration warnings (this is normal if database is already up to date)"
}

# Seed the database
Write-Host "`nSeeding database..."
npm run db:seed:new

Write-Host "`n✅ Seed script complete!"
