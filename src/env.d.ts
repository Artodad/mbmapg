/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
  readonly STRIPE_SECRET_KEY?: string;
  readonly STRIPE_WEBHOOK_SECRET?: string;
}
