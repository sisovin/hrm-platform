param()

# PowerShell deploy script for Supabase
# Required env vars: SUPABASE_PROJECT_REF, SUPABASE_DB_URL
if (-not $env:SUPABASE_PROJECT_REF) {
  Write-Host "SUPABASE_PROJECT_REF is not set. Please export it or add to .env."
  exit 1
}
if (-not $env:SUPABASE_DB_URL) {
  Write-Host "SUPABASE_DB_URL is not set. Please export it or add to .env."
  exit 1
}

# Ensure CLI login
try {
  supabase status | Out-Null
} catch {
  Write-Host "Supabase CLI not logged in. Running 'supabase login' interactively..."
  supabase login
}

# Link project
supabase link --project-ref $env:SUPABASE_PROJECT_REF

# Deploy functions & static
Write-Host "Deploying Supabase project (functions, static, etc.)..."
supabase deploy --project-ref $env:SUPABASE_PROJECT_REF

# Run prisma migrations
$env:DATABASE_URL = $env:SUPABASE_DB_URL
Write-Host "Running prisma migrate deploy..."
$npx = "npx prisma generate"
Invoke-Expression $npx
$npx2 = "npx prisma migrate deploy --schema=prisma/schema.prisma"
Invoke-Expression $npx2

# Seed using node JS seed fallback
if (Test-Path "./prisma/seed.cjs") {
  Write-Host "Seeding DB via node prisma/seed.cjs"
  node prisma/seed.cjs
}

Write-Host "Supabase deployment script completed."