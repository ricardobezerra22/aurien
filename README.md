# Auren

Full-stack platform for autism and neurodivergence self-screening, connecting users with professionals.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Auth | NextAuth v5 — Google OAuth |
| Database | PostgreSQL + Prisma 6 |
| Payments | Stripe |
| Email | Resend |
| i18n | next-intl (en, pt-BR, es) |
| UI | shadcn/ui + Tailwind v4 |
| Tests | Vitest (≥80% coverage required) |

## Prerequisites

- Node.js 20+
- Yarn 1.22+
- PostgreSQL (local or [Supabase](https://supabase.com))
- Google OAuth app ([console.cloud.google.com](https://console.cloud.google.com))
- Stripe account ([dashboard.stripe.com](https://dashboard.stripe.com))
- Resend account ([resend.com](https://resend.com))

## Quick start

### 1. Install dependencies

```bash
yarn install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in each section of `.env`:

| Variable | Where to get it |
|----------|----------------|
| `DATABASE_URL` | Supabase → Project Settings → Database → Connection string; or local: `postgresql://postgres:postgres@localhost:54322/postgres` |
| `NEXTAUTH_URL` | `http://localhost:3000` for local dev |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID |
| `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | See [Stripe webhooks](#stripe-webhooks) below |
| `RESEND_API_KEY` | Resend Dashboard → API Keys |

> **Google OAuth redirect URI** — add `http://localhost:3000/api/auth/callback/google` to your OAuth app's authorised redirect URIs.

### 3. Set up the database

If using Supabase locally:

```bash
supabase start   # starts Postgres on port 54322
```

Then run migrations:

```bash
yarn prisma migrate dev
```

### 4. Start the dev server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Docker dev environment

Spins up Postgres + the Next.js app in watch mode with a single command:

```bash
yarn docker:dev
```

This uses `docker-compose.dev.yml` which:
- starts a `postgres:16` container on port `5432`
- builds the app from `Dockerfile.dev` and mounts source files for live reload
- overrides `DATABASE_URL` to point to the `db` service (`postgresql://postgres:postgres@db:5432/auren`)

> All other env vars are read from `.env`. Make sure it exists before running (`cp .env.example .env`).

To run migrations inside the running container:

```bash
docker compose -f docker-compose.dev.yml exec app yarn prisma migrate dev
```

To stop and remove containers:

```bash
yarn docker:dev:down
```

---

## Stripe webhooks

To receive Stripe events locally, forward them with the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret it prints and set it as `STRIPE_WEBHOOK_SECRET` in `.env`.

---

## Commands

```bash
yarn dev              # start dev server (http://localhost:3000)
yarn build            # production build
yarn test             # run tests once
yarn test:watch       # run tests in watch mode
yarn test:coverage    # run tests with coverage report (must be ≥80%)
yarn lint             # check lint + formatting (Biome)
yarn lint:fix         # auto-fix lint issues
yarn format           # auto-format with Biome
```

Database:

```bash
yarn prisma migrate dev   # apply pending migrations
yarn prisma generate      # regenerate Prisma client after schema changes
yarn prisma studio        # visual DB browser
```

---

## Project structure

```
app/
  [locale]/          # all user-facing pages (en, pt-BR, es)
  api/
    auth/            # NextAuth handler
    stripe/webhook/  # Stripe event processor
auth.ts              # NextAuth config (Google OAuth, JWT, Prisma adapter)
lib/
  errors.ts          # domain error classes (AppError hierarchy)
  mailer.ts          # Resend singleton + sendEmail helper
  prisma.ts          # Prisma singleton
  stripe.ts          # Stripe lazy singleton
  utils.ts           # cn() class merging utility
components/ui/       # shadcn/ui presentational components
prisma/
  schema.prisma      # User, Account, Session, VerificationToken models
messages/            # i18n translation strings (en.json, pt-BR.json, es.json)
tests/               # Vitest tests mirroring the source tree
```

---

## Sending email

```ts
import { sendEmail } from "@/lib/mailer";

await sendEmail({
  to: "user@example.com",
  subject: "Welcome to Auren",
  html: "<p>Hello!</p>",
});
```

The `from` field defaults to `Auren <no-reply@tryauren.com>`. Override it by passing `from`.
