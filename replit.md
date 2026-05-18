# JJ Plumbing Services and Tree Felling

Premium lead-generation website for a South African contractor offering plumbing installations, plumbing maintenance, tree felling, site clearing, and farm clearing. Quote requests are emailed to the business and to the customer via ZeptoMail.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API server (handles `/api/quote-request`, `/api/send-mail`, `/api/healthz`)
- `pnpm --filter @workspace/jj-plumbing run dev` — marketing website
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from `lib/api-spec/openapi.yaml`

## Required environment

- `ZEPTOMAIL_TOKEN` (secret) — ZeptoMail send-mail token. Stored as the bare token; the server prefixes `Zoho-enczapikey ` automatically.
- `MAIL_FROM` — sender address used on outgoing emails. **Must be a verified sender on your ZeptoMail account** or sends will fail with HTTP 401 / `SM_111 Sender address not verified`. Default: `noreply@jjplumbingpe.co.za`.
- `MAIL_FROM_NAME` — sender display name.
- `ADMIN_EMAIL` — inbox that receives new quote requests. Default: `info@jjplumbingpe.co.za`.
- `ADMIN_NAME` — admin display name.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5, ZeptoMail (REST)
- Web: React 19 + Vite + Tailwind + shadcn/ui + wouter
- Forms: react-hook-form + zod
- API codegen: Orval (from `lib/api-spec/openapi.yaml`)

## Where things live

- Brand assets: `artifacts/jj-plumbing/public/brand/` — `main-logo.png`, `favicon.png`, `lekker-logo.png`, `lekker-badge.png`
- Generated imagery: `artifacts/jj-plumbing/public/images/`
- API contract: `lib/api-spec/openapi.yaml`
- Email templates + ZeptoMail client: `artifacts/api-server/src/lib/zeptomail.ts`
- Lead routes (quote-request, send-mail): `artifacts/api-server/src/routes/leads.ts`
- Quote form: `artifacts/jj-plumbing/src/components/forms/QuoteForm.tsx`
- Footer (5-col with Lekker logo + verified badge): `artifacts/jj-plumbing/src/components/layout/Footer.tsx`
- WhatsApp floating button: `artifacts/jj-plumbing/src/components/ui/WhatsAppButton.tsx`
- SEO + GA page_view helper: `artifacts/jj-plumbing/src/components/seo/SEO.tsx`
- Google Analytics tag (`G-MXG4S9F4F8`) + JSON-LD LocalBusiness + Montserrat/Inter fonts: `artifacts/jj-plumbing/index.html`

## Architecture decisions

- Quote submissions go through **`POST /api/quote-request`**, which sends both the admin notification and the customer confirmation in parallel via ZeptoMail. The endpoint returns 200 as long as at least one of the two emails succeeds (the admin send is the critical path; user confirmation failure is logged as a warning).
- ZeptoMail is called via plain `fetch` (no SDK) to keep the dependency footprint small.
- No database: quote requests are not persisted server-side — the admin email is the system of record.
- Frontend types/enums (`QuoteRequestInputService`, `QuoteRequestInputPropertyType`) are imported from `@workspace/api-client-react` (re-exported barrel), never from the deep `src/generated/...` path.

## Product

A multi-service contractor site with a Home, About, Services overview, five service detail pages (Plumbing Installations, Plumbing Maintenance, Tree Felling, Site Clearing, Farm Clearing), Gallery, Areas We Serve, Contact, Privacy, and Terms. Every page includes the WhatsApp FAB and the 5-column footer with the Lekker Network logo and Verified Badge. Each service page is colour-themed: utility blue accents for plumbing, forest green / earth brown accents for the clearing services.

## User preferences

- No emojis anywhere in the UI.
- Brand colours: `#1F5E3B` forest green, `#1F2937` charcoal, `#FFFFFF`, `#F5F7FA`, `#7A4E2A` earth brown, `#2563EB` utility blue.
- Fonts: Montserrat for headings, Inter for body.

## Gotchas

- **ZeptoMail sender verification:** the value of `MAIL_FROM` must be verified in the ZeptoMail dashboard (Mail Agents → Domains/Senders). Until then every send returns HTTP 401 with code `SM_111`, and `/api/quote-request` will return 500. To test locally without verifying a domain, set `MAIL_FROM` (and `ADMIN_EMAIL`) to addresses already verified on your ZeptoMail account.
- The WhatsApp number (`27000000000`) and click-to-call number in the header are placeholders — swap them in `WhatsAppButton.tsx` and `Navbar.tsx` once the real number is provided.
- After editing `lib/api-spec/openapi.yaml`, always re-run `pnpm --filter @workspace/api-spec run codegen` before typechecking.
- Do not import from `@workspace/api-client-react/src/generated/...` — Vite cannot resolve that deep path. Always import from the `@workspace/api-client-react` barrel.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
- See the `react-vite` skill for frontend conventions.
