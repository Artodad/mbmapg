# MBMA Parents Group

Static website for the Mission Bay Montessori Academy Parents Group Foundation.

- **Live (GitHub Pages):** https://artodad.github.io/mbmapg/
- **Repo:** https://github.com/Artodad/mbmapg
- **Contact:** info@mbmapg.org

Built with [Astro](https://astro.build) and deployed with the official Astro GitHub Pages Action. Page bodies live in `src/content/*.md` so board members can edit copy without touching layout code.

```bash
npm install
npm run dev
npm run build
```

The site is configured as a project Pages site (`base: /mbmapg/`). After the first green deploy, the site is at https://artodad.github.io/mbmapg/.


## Shop and checkout

The shop has a real cart (localStorage key `mbmapg-cart`) and checkout UI. It is ready for Stripe Checkout Sessions later, but **does not process payments** in this static GitHub Pages deploy.

### Connect payments later

Do **not** put live secret keys in the static GitHub Pages deploy. `PUBLIC_STRIPE_PUBLISHABLE_KEY` may be present in the browser bundle if you set it; `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` must stay on a server.

1. Copy `.env.example` to `.env` on a machine that is **not** the Pages static host.
2. Add a server that can keep secrets: a Cloudflare Pages Function, Netlify Function, or an Astro adapter (`output: 'server'` / hybrid). GitHub Pages will not run `src/pages/api/create-checkout-session.ts`.
3. On that server, create a Checkout Session from `createCheckoutSessionPayload()` in `src/lib/stripe.ts` (line items, student/room metadata, success/cancel URLs). `$0` teachers pizza must not be charged.
4. Point success / cancel URLs at `/checkout/success` and `/checkout/cancel`.
5. Add a webhook endpoint that verifies the signing secret on the server only.
6. `paymentsConnected()` is true only when `PUBLIC_STRIPE_PUBLISHABLE_KEY` is a non-empty string. The checkout page will then POST the payload to `/api/create-checkout-session`. If that public key is empty, the site never loads Stripe.js and never calls a payments API.

Until that server exists, checkout shows “Payments are not connected yet.” Families can email the board or pay at Meet & Greet. The cart and order summary still work.
