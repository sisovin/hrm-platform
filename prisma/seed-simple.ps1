# Simple seed script - just runs the seeders
param()

Write-Host "🌱 Running database seeders..." -ForegroundColor Green

# Load .env file if it exists
if (Test-Path ".env") {
  Write-Host "`nLoading environment variables from .env file..."
  Get-Content ".env" | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]*)\s*=\s*(.*)$') {
      $key = $matches[1].Trim()
      $value = $matches[2].Trim().Trim('"')
      [Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
  }
  Write-Host "✓ Environment variables loaded"
}

if (-not $env:DATABASE_URL) {
  Write-Host "`n❌ DATABASE_URL is not set. Please add it to your .env file." -ForegroundColor Red
  exit 1
}

Write-Host "✓ DATABASE_URL is set"

# Run the seeders
Write-Host "`n🌱 Seeding database with test data..." -ForegroundColor Cyan
npm run db:seed:new

if ($LASTEXITCODE -eq 0) {
  Write-Host "`n✅ Database seeding completed successfully!" -ForegroundColor Green
}
else {
  Write-Host "`n❌ Database seeding failed!" -ForegroundColor Red
  exit 1
}
