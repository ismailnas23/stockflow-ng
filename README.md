# StockFlow NG

StockFlow NG is a retail operations suite for Nigerian merchants. This monorepo includes:

- `backend`: Node.js + Express + TypeScript API with auth, inventory, sales, flyer, analytics, subscription, social, and notification modules.
- `frontend/web`: Next.js dashboard that mirrors the provided mobile-first UI language.
- `frontend/mobile`: Expo React Native app with dashboard, sales, inventory, marketing, and settings flows.
- `database`: PostgreSQL schema and seed data.

## Folder layout

```text
/frontend
  /mobile
  /web
/backend
  /src
    /auth
    /inventory
    /sales
    /flyer
    /analytics
    /subscription
    /social
    /notifications
/database
  /migrations
/scripts
```

## Getting started

1. Copy `.env.example` to `.env` and adjust values.
2. Start PostgreSQL locally or with `docker-compose up -d db`.
3. Apply `database/migrations/001_init.sql` and `database/seed.sql`.
4. Install dependencies once at the repo root:
   - `cd stockflow-ng && npm install`
5. Run the apps (from repo root):
   - Backend API: `npm run dev:backend` (http://localhost:4000/api/health)
   - Web: `npm run dev:web` (http://localhost:3014)
   - Web (prod after build): `npm run build && npm run start:web` (http://localhost:3014)
   - Mobile: `npm run dev:mobile`

Useful links (after web is running on port 3014):
- App: http://localhost:3014/
- ZIP design previews list: http://localhost:3014/designs
- Pricing ZIP screen embed: http://localhost:3014/subscription/unlock

## Product coverage

- Phone/OTP login flow
- Dashboard KPIs and weekly trend
- Sales/POS entry with stock deduction logic
- Inventory summary, alerts, restock action
- Bundle offer builder
- Flyer studio templates, preview payloads, branded export metadata
- Social posting queue payloads and caption templates
- Subscription pricing and founder plan upgrade stub
- Notification preferences and feed

## Notes

- The backend currently uses an in-memory store seeded from typed fixtures, plus PostgreSQL migrations for persistence setup.
- Stripe and social publishing are implemented as safe stubs so the project remains runnable without live credentials.
- The design ZIP in `design-source/stitch` was used as the UI reference for screen naming, hierarchy, and styling direction.
