/**
 * Documented stub for a future Stripe Checkout Session endpoint.
 *
 * GitHub Pages is static and will not run this as a live API. That is expected.
 *
 * When you add a server (Cloudflare Pages Function, Netlify Function, or an
 * Astro adapter), handle POST:
 *   1. If STRIPE_SECRET_KEY is missing, return 503 { error: "payments_not_connected" }.
 *   2. Otherwise create a Checkout Session from the JSON body produced by
 *      createCheckoutSessionPayload() in src/lib/stripe.ts.
 *   3. Verify the webhook with STRIPE_WEBHOOK_SECRET on a server — never in
 *      the static GitHub Pages deploy.
 *   4. Do not import a payments SDK at build time. Do not put live secret
 *      keys in the static deploy.
 *
 * This file only returns the not-connected payload. It does not call any
 * payment network APIs.
 */
import type { APIRoute } from 'astro';

function notConnected(): Response {
  const secret = import.meta.env.STRIPE_SECRET_KEY;
  if (typeof secret === 'string' && secret.trim().length > 0) {
    return new Response(JSON.stringify({ error: 'not_implemented' }), {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify({ error: 'payments_not_connected' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = () => notConnected();
