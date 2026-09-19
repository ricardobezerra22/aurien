# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Rules

- **Never create git commits.** Do not run `git commit`, `git push`, or any destructive git commands. Stage and diff are fine; committing is the user's responsibility.
- **After every feature, run lint then tests before reporting done:**
  ```bash
  yarn lint && yarn test:coverage
  ```
  Coverage must pass at ≥80% across `lib/**`, `app/api/**`, and `components/**`. If it doesn't, write the missing tests before finishing.

### SOLID & clean architecture

- **Domain errors live in `lib/errors.ts`** — `AppError` and its subclasses are framework-agnostic. API routes call `toErrorResponse(error)` at the boundary; they never construct `Response` error shapes manually.
- **`lib/` has no imports from `app/` or `components/`** — dependency arrows point inward only.
- **One class, one reason to change.** Don't add unrelated concerns to an existing class; create a new one.
- **Depend on abstractions at boundaries.** Functions that call external services (Prisma, Stripe) should accept the client as a parameter in tests, not import the singleton directly.
- **No smart components.** UI components in `components/` are dumb presentational; data-fetching and business logic belong in server components or route handlers, not in client components.

## Commands

```bash
yarn dev          # start dev server
yarn build        # production build (standalone output)
yarn test         # run tests once
yarn test:watch   # run tests in watch mode
yarn test:coverage
yarn lint         # biome check (lint + format check)
yarn lint:fix     # auto-fix lint issues
yarn format       # auto-format with biome
# run a single test file:
yarn vitest run tests/path/to/file.test.ts
```

Database:

```bash
yarn prisma migrate dev   # apply migrations
yarn prisma generate      # regenerate client after schema changes
yarn prisma studio        # browse data
```

Docker:

```bash
yarn docker:dev           # postgres + app in watch mode (infra/_local/)
yarn docker:dev:down      # stop and remove containers

# staging / production
docker compose -f infra/dev/docker-compose.yml up --build
docker compose -f infra/prd/docker-compose.yml up --build
```

## Architecture

**Next.js 16 App Router** — this version has breaking changes vs. training data. Read `node_modules/next/dist/docs/` before writing Next.js-specific code.

**i18n routing** — all user-facing pages live under `app/[locale]/`. The locale segment is injected by next-intl middleware; routing is configured in `i18n/routing.ts` (locales: `en`, `pt-BR`, `es`). Use `next-intl` navigation helpers (not `next/link` directly) inside `[locale]` routes.

**Auth** — `auth.ts` at the root exports `{ handlers, auth, signIn, signOut }` from NextAuth v5 (beta). Google OAuth only. JWT session strategy; `session.user.id` is set from `token.sub` in the callback. The Prisma adapter syncs users/accounts/sessions to the DB.

**Database** — PostgreSQL via Prisma. Use the singleton from `lib/prisma.ts`, never instantiate `PrismaClient` directly. `User.stripeCustomerId` links accounts to Stripe.

**Stripe** — lazy singleton via `getStripe()` from `lib/stripe.ts`. Webhook handler at `app/api/stripe/webhook/route.ts` verifies signatures and handles `checkout.session.completed` (writes `stripeCustomerId`). Subscription lifecycle events (`customer.subscription.*`) are stubbed with TODOs.

**Email** — lazy singleton via `getResend()` from `lib/mailer.ts`. Call `sendEmail({ to, subject, html })` from any route handler or server action. Pass a mock Resend client as the second param in tests (same DI pattern as Stripe).

**UI components** — shadcn/ui components live in `components/ui/`. Use `cn(...)` from `lib/utils.ts` for class merging (re-exports the `cn` package).

**Tests** — Vitest with `jsdom`-free node environment. Tests live in `tests/` mirroring the source tree (`tests/api/`, `tests/components/`, `tests/lib/`). Coverage is collected from `lib/**`, `app/api/**`, and `components/**`.

## Environment variables

| Variable                                | Used by                        |
| --------------------------------------- | ------------------------------ |
| `DATABASE_URL`                          | Prisma                         |
| `NEXTAUTH_URL`                          | NextAuth (canonical URL)       |
| `NEXTAUTH_SECRET`                       | NextAuth (JWT signing)         |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | NextAuth Google provider       |
| `STRIPE_SECRET_KEY`                     | `lib/stripe.ts`                |
| `STRIPE_PUBLISHABLE_KEY`                | Stripe client-side             |
| `STRIPE_WEBHOOK_SECRET`                 | webhook signature verification |
| `RESEND_API_KEY`                        | `lib/mailer.ts`                |
