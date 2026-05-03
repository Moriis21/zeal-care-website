# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: File-based JSON stores (no external DB)
- **Validation**: Zod
- **Build**: esbuild

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

### Admin Panel (`/admin`)
- **Login** — JWT auth with `ADMIN_PASSWORD` env secret (default password: "zealcare")
- **Dashboard** — Live stats: children, donations, messages, newsletter subscribers
- **Children** — Full CRUD: add, edit, delete, toggle sponsored status
- **Donations** — View + search all donations, CSV export
- **Messages** — View + mark read + delete contact form submissions
- **Newsletter** — View subscribers, search, CSV export
- **Page Content** (`/admin/content`) — Full CMS: edit all website page text, programs, team, FAQs, news items
- **Email Settings** — Configure SMTP for sending emails

### CMS / Content System
- **Backend store**: `artifacts/api-server/src/lib/siteContentStore.ts` — JSON file-based store with deep-merge patching
- **API routes**: `GET /api/site-content` (public) + `PUT /api/admin/site-content` (admin-only)
- **Frontend hook**: `artifacts/zeal-care/src/hooks/useSiteContent.ts` — React Query hook with defaults
- **Editable content**: Organization info, contact details, social links, impact stats, hero text, all page copy, leadership team, board of advisors, news timeline, programs list, FAQs
- **Live public components**: Hero, StatsBar, Contact, Footer — all fetch from `/api/site-content` with fallback defaults

### Key Files
- `src/lib/nav-config.ts` — navigation structure (all 6 sections + sub-items)
- `src/components/Navbar.tsx` — mega-dropdown navbar (desktop hover, mobile accordion)
- `src/components/PageLayout.tsx` — inner page layout (breadcrumb, sticky sidebar sub-nav, footer)
- `src/hooks/useSiteContent.ts` — CMS content hook (React Query)
- `src/pages/admin/AdminContent.tsx` — Full CMS editor (7 tabs, array editors for team/programs/FAQs)
- `src/components/admin/AdminLayout.tsx` — Sidebar with logo + 7 nav items
- `src/App.tsx` — routing (Navbar rendered at app level, not in pages)
- Images from `attached_assets/pdf_images/img-XXX.jpg` via `@assets` alias

## API Server (artifacts/api-server)

Express server on port 8080. All routes prefixed with `/api`.

### Data Stores (file-based JSON)
- `childrenStore.ts` — children + sponsorship data
- `contactStore.ts` — contact form messages
- `newsletterStore.ts` — newsletter subscribers
- `donationsStore.ts` — donation logs
- `siteContentStore.ts` — all website page content + site settings

### Routes
- `GET /api/health` — health check
- `GET /api/site-content` — public: all website content
- `PUT /api/admin/site-content` — admin: update content (deep merge)
- `GET /api/admin/stats` — dashboard stats
- `GET/POST /api/admin/children` — children CRUD
- `GET /api/admin/donations` — donations list
- `GET /api/admin/messages` — contact messages
- `GET /api/admin/newsletter` — subscribers
- `POST /api/newsletter/subscribe` — public newsletter subscribe
- `POST /api/contact` — public contact form
- `POST /api/admin/login` — admin auth (JWT)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
