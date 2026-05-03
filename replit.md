# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Zeal Care Website (artifacts/zeal-care)

React + Vite nonprofit site for Zeal Care NGO (Liberia). Colors: deep navy `#061A32`, cobalt blue `#1A44C0`, golden yellow `#F5C619`. Font: Poppins.

### Multi-Page Structure
- **Home** (`/`) — scrolling landing page with Hero, StatsBar, About, WhyEmpowerment, Programs, Gallery, Stories, JoinUs, Partners, Contact, Footer
- **About Us** (`/about/*`) — Mission, Vision, Goals, Values, Belief, SDG Focus, Characteristics
- **Why Empowerment** (`/why-empowerment/*`) — Social Justice, Economic Development
- **Who We Are** (`/who-we-are/*`) — Leadership, Board, Beneficiaries, Partners, History, Awards, Protection, Finance, Work for Us, Tenders
- **What We Do** (`/what-we-do/*`) — How We Operate, Where We Operate, Programs, What Sets Us Apart, Impact
- **Igniting Potential** (`/igniting-potential/*`) — Ways to Give, Appeals, Become a Partner, FAQ
- **Media** (`/media/*`) — Newsroom, Success Stories, Video, Gallery, Events

### Key Files
- `src/lib/nav-config.ts` — navigation structure (all 6 sections + sub-items)
- `src/components/Navbar.tsx` — mega-dropdown navbar (desktop hover, mobile accordion)
- `src/components/PageLayout.tsx` — inner page layout (breadcrumb, sticky sidebar sub-nav, footer)
- `src/pages/AboutPage.tsx`, `WhoWeArePage.tsx`, `WhatWeDoPage.tsx`, `WhyEmpowermentPage.tsx`, `IgnitingPotentialPage.tsx`, `MediaPage.tsx` — section pages
- `src/App.tsx` — routing (Navbar rendered at app level, not in pages)
- Images from `attached_assets/pdf_images/img-XXX.jpg` via `@assets` alias

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
