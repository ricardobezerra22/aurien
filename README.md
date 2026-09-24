# next-neves-bp

A white-label Next.js 16 boilerplate with a customizable design system, i18n, auth, payments, and email. Scaffold a new branded project in one command.

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

---

## Scaffold a new project

```bash
npx create-next-neves-bp my-project
```

The CLI asks for your brand name, tagline, primary color, accent color, and background. It then clones the template, patches `brand.config.json`, regenerates design tokens, and runs `yarn install`.

> **Before using the CLI:** fork this repo, push it to GitHub, and update the `REPO` constant in `packages/create-next-neves-bp/index.mjs` to point to your fork.

---

## Customise the design system

All design tokens live in **`brand.config.json`** at the project root. Edit the values, then regenerate the CSS:

```bash
yarn tokens
```

This rewrites `app/generated-tokens.css`, which is imported by `app/globals.css`. Tailwind picks up the updated custom properties on the next build or hot-reload.

### Color structure

```jsonc
// brand.config.json
{
  "colors": {
    "primary":          "#173B36",  // dark anchor — buttons, headings, nav
    "primaryLight":     "#2F5A52",  // hover / active state of primary
    "accent":           "#7E9B91",  // mid-tone — eyebrows, progress bars
    "accentLight":      "#AEBDB4",  // light accent — dark-mode text
    "accentAccessible": "#436561",  // darkened accent for WCAG AA text (6:1)
    "bg":               "#F7F6F2",  // page background
    "surface":          "#FFFFFF",  // card / panel background
    ...
  },
  "darkColors": { ... }             // same keys, dark-mode overrides
}
```

**For a basic rebrand, change only four values:**

| Key | Role |
|-----|------|
| `colors.primary` | Brand anchor (dark) |
| `colors.accent` | Brand highlight (mid) |
| `colors.bg` | Page background |
| `colors.primaryFg` | Text on primary buttons (usually `#FFFFFF`) |

Then update `darkColors.primary` to the equivalent mid-tone for dark mode.

### Typography

Fonts are loaded in `app/layout.tsx` via `next/font/google`. The default pair is **Fraunces** (headings) + **Inter** (body). To swap them:

1. Replace the font imports in `app/layout.tsx`
2. Update the CSS variable names if changed (`--font-fraunces`, `--font-inter`)

The rest of the design system references `var(--font-fraunces, serif)` and `var(--font-sans)` — no other files need updating.

### Radius & spacing

```jsonc
"radius": {
  "card":  "16px",
  "pill":  "999px",
  "input": "12px"
}
```

Change in `brand.config.json` and re-run `yarn tokens`.

---

## Quick start (without the CLI)

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/next-neves-bp my-project
cd my-project
yarn install
```

### 2. Configure brand

Edit `brand.config.json`, then:

```bash
yarn tokens
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

| Variable | Where to get it |
|----------|----------------|
| `DATABASE_URL` | Supabase → Project Settings → Database → Connection string |
| `NEXTAUTH_URL` | `http://localhost:3000` for local dev |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google Cloud Console → OAuth 2.0 Client ID |
| `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → API keys |
| `STRIPE_WEBHOOK_SECRET` | See [Stripe webhooks](#stripe-webhooks) below |
| `RESEND_API_KEY` | Resend Dashboard → API Keys |

> **Google OAuth redirect URI** — add `http://localhost:3000/api/auth/callback/google` to your OAuth app's authorised redirect URIs.

### 4. Database

```bash
yarn prisma migrate dev
```

### 5. Start dev server

```bash
yarn dev   # http://localhost:3000
```

---

## Localising copy

Landing page text lives in `messages/en.json`, `messages/pt-BR.json`, and `messages/es.json`. After scaffolding, replace the default brand name throughout:

```bash
# replace "Auren" with your brand name across all message files
grep -rl "Auren" messages/ | xargs sed -i '' 's/Auren/MyApp/g'
```

---

## Docker dev environment

```bash
yarn docker:dev       # starts Postgres + Next.js in watch mode
yarn docker:dev:down  # stop and remove containers
```

To run migrations inside the container:

```bash
docker compose -f infra/_local/docker-compose.yml exec app yarn prisma migrate dev
```

---

## Stripe webhooks

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret and set it as `STRIPE_WEBHOOK_SECRET` in `.env`.

---

## Commands

```bash
yarn tokens           # regenerate design tokens from brand.config.json
yarn dev              # start dev server
yarn build            # production build
yarn test             # run tests once
yarn test:watch       # run tests in watch mode
yarn test:coverage    # coverage report (must be ≥80%)
yarn lint             # check lint + formatting (Biome)
yarn lint:fix         # auto-fix lint issues
yarn format           # auto-format with Biome
```

Database:

```bash
yarn prisma migrate dev   # apply pending migrations
yarn prisma generate      # regenerate Prisma client
yarn prisma studio        # visual DB browser
```

---

## Project structure

```
brand.config.json        ← design system config — edit this
brand.config.ts          ← typed wrapper (imported in the app)
scripts/
  generate-tokens.mjs    ← reads brand.config.json → writes generated-tokens.css
app/
  generated-tokens.css   ← auto-generated, do not edit manually
  globals.css            ← imports generated-tokens.css + shadcn mapping
  layout.tsx             ← reads brand.meta for title/description
  [locale]/              ← all user-facing pages (en, pt-BR, es)
  api/
    auth/                ← NextAuth handler
    stripe/webhook/      ← Stripe event processor
auth.ts                  ← NextAuth config
lib/
  errors.ts              ← AppError hierarchy
  mailer.ts              ← Resend singleton + sendEmail()
  prisma.ts              ← Prisma singleton
  stripe.ts              ← Stripe singleton
  utils.ts               ← cn() class merging
components/ui/           ← shadcn/ui components
prisma/schema.prisma     ← User, Account, Session, VerificationToken
messages/                ← i18n strings (en.json, pt-BR.json, es.json)
tests/                   ← Vitest tests mirroring the source tree
packages/
  create-next-neves-bp/  ← CLI scaffolder (publish to npm separately)
```

---

## Publishing the CLI

```bash
cd packages/create-next-neves-bp
# 1. Update REPO in index.mjs to your GitHub fork URL
# 2. npm publish --access public
```

After publishing, anyone scaffolds your boilerplate with:

```bash
npx create-next-neves-bp my-project
```

---

## Sending email

```ts
import { sendEmail } from "@/lib/mailer";

await sendEmail({
  to: "user@example.com",
  subject: "Welcome",
  html: "<p>Hello!</p>",
});
```

The `from` field defaults to `from_email` in `brand.config.json`. Override by passing `from`.
