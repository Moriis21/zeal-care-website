#!/usr/bin/env bash
# Vercel Build Output API v3 build script.
# Produces .vercel/output/ which Vercel understands unambiguously as
# static-site + serverless function — no framework detection needed.
set -e

echo "→ Building Zeal Care frontend (Vite)..."
pnpm --filter @workspace/zeal-care run build

echo "→ Preparing Vercel Build Output API v3 structure..."
rm -rf .vercel/output
mkdir -p .vercel/output/static
mkdir -p ".vercel/output/functions/api.func"

echo "→ Copying static assets..."
cp -r artifacts/zeal-care/dist/public/. .vercel/output/static/

echo "→ Bundling API serverless function..."
./node_modules/.bin/esbuild api/index.ts \
  --bundle \
  --platform=node \
  --target=node20 \
  --format=cjs \
  --resolve-extensions=.ts,.tsx,.js,.jsx \
  --outfile=".vercel/output/functions/api.func/index.js"

echo "→ Writing function runtime config..."
cat > ".vercel/output/functions/api.func/.vc-config.json" << 'EOF'
{
  "runtime": "nodejs20.x",
  "handler": "index.js",
  "maxDuration": 30,
  "memory": 1024
}
EOF

echo "→ Writing routing config..."
cat > ".vercel/output/config.json" << 'EOF'
{
  "version": 3,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api"
    },
    {
      "src": "/assets/(.*)",
      "headers": { "cache-control": "public, max-age=31536000, immutable" },
      "continue": true
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOF

echo "✓ Vercel build complete — .vercel/output/ is ready"
