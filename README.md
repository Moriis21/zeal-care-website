# Zeal Care Website

pnpm monorepo for the Zeal Care nonprofit website, supporting public content, multilingual presentation, backend APIs, data storage, and administrative workflows.

Live application: [https://zeal-care-website-api-server.vercel.app](https://zeal-care-website-api-server.vercel.app)

## Status

Active monorepo

## Key capabilities

- React website for Zeal Care programs and impact
- English, French, and Arabic localization
- Express API services
- PostgreSQL access through Drizzle ORM
- Shared API contracts and generated clients
- Workspace and Vercel deployment configuration

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- Drizzle ORM and PostgreSQL
- Express
- Framer Motion
- Recharts

## Local development

Requirements: Node.js and pnpm.

```bash
pnpm install
pnpm run typecheck
pnpm run build
```

Run the website with `pnpm --filter @workspace/zeal-care dev`. Run the API service with `pnpm --filter @workspace/api-server dev`.

### Available commands

| Command | Purpose |
| --- | --- |
| `pnpm run preinstall` | `sh -c 'rm -f package-lock.json yarn.lock; case "$npm_config_user_agent" in pnpm/*) ;; *) echo "Use pnpm instead" >&2; exit 1 ;; esac'` |
| `pnpm run build` | `pnpm run typecheck && pnpm -r --if-present run build` |
| `pnpm run typecheck:libs` | `tsc --build` |
| `pnpm run typecheck` | `pnpm run typecheck:libs && pnpm -r --filter "./artifacts/**" --filter "./scripts" --if-present run typecheck` |

## Configuration

External service credentials must be supplied through local or deployment environment variables. Add a sanitized `.env.example` before onboarding additional developers. Keep all real credentials outside version control.

## Project structure

| Path | Purpose |
| --- | --- |
| `api/` | API entry points and server code |
| `artifacts/` | Deployable applications in the workspace |
| `lib/` | Shared libraries and workspace packages |
| `public/` | Static assets |
| `scripts/` | Maintenance and build scripts |

## Security

- Keep credentials and production environment files out of version control.
- Review authentication, authorization, database policies, and input validation before production use.
- Run the available lint, type checking, test, and build commands before deployment.

## License

No license file is currently included. All rights are reserved unless the repository owner states otherwise.

## Maintainer

Morris L. Dorley Jr, [@Moriis21](https://github.com/Moriis21)

