# Brian Bett Kipkoech Portfolio

Recruiter-focused portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Prisma, Jest, and MDX.

## Local setup

Use Node.js 22 and npm 10.8 or newer.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The public site works without email credentials. The contact form displays its mailto fallback until Resend is configured. `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are only needed for the private analytics sign-in flow. The dashboard currently uses example chart data.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Absolute public origin used for canonical URLs, sitemap, RSS, and Open Graph. Example: `https://brianbett.dev`. |
| `RESEND_API_KEY` | For direct email | Resend API key for contact delivery and sender confirmation. |
| `RESEND_FROM_EMAIL` | For direct email | Verified Resend sender, for example `Portfolio <hello@example.com>`. |
| `NEXTAUTH_SECRET` | Dashboard sign-in | Secret used to sign NextAuth sessions. |
| `NEXTAUTH_URL` | Dashboard sign-in | Canonical origin for NextAuth callbacks. |
| `DATABASE_URL` | Prisma commands | SQLite connection for the existing Prisma schema, for example `file:./prisma/dev.db`. The current dashboard uses static sample data. |

Vercel Web Analytics is enabled through `@vercel/analytics`; it does not require a client key and does not set analytics cookies. The contact endpoint uses an in-memory per-process limiter (5 requests per minute per client address). Multi-instance deployments should put a shared limiter at the hosting edge or in a shared store.

Copy `.env.example` to `.env.local` and set values locally. Do not commit secret values.

## Docker

Build and run the production standalone image:

```bash
docker build -t brian-portfolio .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=replace-with-a-long-random-secret \
  brian-portfolio
```

The site is available at <http://localhost:3000>. Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to enable direct contact delivery. The image runs as an unprivileged user and contains the Next.js standalone server.

## Checks

```bash
npm run lint
npm test -- --runInBand
npm run build
```

## Content editing

- Update identity, availability, social links, experience, education, certifications, testimonials, and `/now` details in [`src/content/profile.ts`](src/content/profile.ts).
- Update project case studies in [`lib/projects.ts`](lib/projects.ts). Replace every `[TODO: ...]` value with verified information. Keep client-approved details only for private client work.
- Blog posts remain MDX files in [`content/blog`](content/blog). Frontmatter supports `title`, `description` or `summary`, `date`, `tags`, `draft`, `thumbnail`, and `canonicalUrl`. Drafts are visible during development and excluded from production pages, sitemap, and RSS.
- Drop the CV PDF at `public/cv/Brian-Bett-Kipkoech-CV.pdf`; the homepage download action appears when the file exists.

## Analytics

The private `/analytics` dashboard remains behind NextAuth. Vercel Web Analytics tracks privacy-friendly page views without cookies. Dashboard charts are currently static sample data and are not fed by Vercel Analytics.
