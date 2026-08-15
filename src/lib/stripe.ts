import { cartChargeableCents } from './cart';
import type { Cart } from './cart';
import { getProduct, lineLabel, unitAmountCents } from './products';
import { withBase } from './site';

/**
 * True only when PUBLIC_STRIPE_PUBLISHABLE_KEY is a non-empty string.
 * The static GitHub Pages deploy leaves this empty on purpose.
 */
export function paymentsConnected(): boolean {
  const key = import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY;
  return typeof key === 'string' && key.trim().length > 0;
}

export interface StripeLineItem {
  price_data: {
    currency: 'usd';
    product_data: { name: string };
    unit_amount: number;
  };
  quantity: number;
}

export interface StripeCustomField {
  key: string;
  label: { type: 'custom'; custom: string };
  type: 'text';
  optional?: boolean;
}

export interface CheckoutSessionPayload {
  mode: 'payment';
  paymentRequired: boolean;
  line_items: StripeLineItem[];
  metadata: Record<string, string>;
  success_url: string;
  cancel_url: string;
  custom_fields: StripeCustomField[];
}

function absoluteUrl(path: string): string {
  const site = (import.meta.env.SITE || 'https://artodad.github.io').replace(/\/+$/, '');
  const rel = withBase(path);
  return `${site}${rel.startsWith('/') ? rel : `/${rel}`}`;
}

/**
 * JSON a future server would send to Stripe Checkout Sessions.
 * $0 lines (teachers pizza) are omitted so they are never charged.
 * Student / room map to metadata, custom_fields, and a company-style field.
 */
export function createCheckoutSessionPayload(cart: Cart): CheckoutSessionPayload {
  const line_items: StripeLineItem[] = [];
  const metadata: Record<string, string> = { source: 'mbmapg-shop' };
  let pizzaCount = 0;
  let teachersCount = 0;

  cart.items.forEach((item) => {
    const product = getProduct(item.productSlug);
    if (!product) return;
    const unit = unitAmountCents(product, item.variantId);
    if (unit > 0) {
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: { name: lineLabel(product, item.variantId) },
          unit_amount: unit,
        },
        quantity: item.quantity,
      });
    }
    if (product.slug === 'pizza-lunch') {
      pizzaCount += 1;
      const n = String(pizzaCount);
      const first = item.custom?.studentFirst?.trim() ?? '';
      const last = item.custom?.studentLast?.trim() ?? '';
      const room = item.custom?.room?.trim() ?? '';
      metadata[`studentFirst_${n}`] = first;
      metadata[`studentLast_${n}`] = last;
      metadata[`room_${n}`] = room;
      metadata[`company_${n}`] = [first, room].filter(Boolean).join(' ');
    }
    if (product.slug === 'teachers-pizza') {
      teachersCount += 1;
    }
    if (item.custom?.note?.trim()) {
      metadata[`note_${item.id}`] = item.custom.note.trim();
    }
  });

  if (teachersCount) metadata.teachersPizza = String(teachersCount);

  const custom_fields: StripeCustomField[] =
    pizzaCount > 0
      ? [
          {
            key: 'studentFirst',
            label: { type: 'custom', custom: 'Student first name' },
            type: 'text',
          },
          {
            key: 'studentLast',
            label: { type: 'custom', custom: 'Student last name' },
            type: 'text',
          },
          { key: 'room', label: { type: 'custom', custom: 'Room #' }, type: 'text' },
        ]
      : [
          {
            key: 'student_note',
            label: { type: 'custom', custom: 'Student first name & room # (optional)' },
            type: 'text',
            optional: true,
          },
        ];

  return {
    mode: 'payment',
    paymentRequired: cartChargeableCents(cart) > 0 && line_items.length > 0,
    line_items,
    metadata,
    success_url: absoluteUrl('checkout/success'),
    cancel_url: absoluteUrl('checkout/cancel'),
    custom_fields,
  };
}
