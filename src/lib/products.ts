export type ProductSlug =
  | 'pizza-lunch'
  | 'tee-youth'
  | 'tee-adult'
  | 'paver-500'
  | 'paver-250'
  | 'paver-100'
  | 'teachers-pizza'
  | 'halloween-wristband';

export type CustomFieldId = 'studentFirst' | 'studentLast' | 'room' | 'note';

export interface ProductVariant {
  id: string;
  label: string;
  priceCents: number;
  /** Exact slice counts the buyer must pick inside this band. */
  slices?: number[];
}

export interface Product {
  slug: ProductSlug;
  name: string;
  priceCents: number;
  summary: string;
  details: string[];
  variants?: ProductVariant[];
  /** Pizza lunch: student first, last, and room are required. */
  requiredFields: CustomFieldId[];
  /** Optional note (student name / room for non-pizza items). */
  optionalNote: boolean;
  cheeseOnly?: boolean;
  /** Repo-hosted Wix original, path under public/. */
  image?: string;
}

export const products: Product[] = [
  {
    slug: 'pizza-lunch',
    image: 'images/products/pizza-lunch.png',
    name: 'Pizza Lunch Fridays — Fundraiser',
    priceCents: 18000,
    summary:
      'Cheese only. 31 lunches. Deadline Friday, September 11. First lunch Friday, September 18.',
    details: [
      'Annual MBMA PG fundraiser. Only cheese pizza is offered at this time.',
      '31 lunches throughout the year. Fill out one form for each child.',
      'Deadline to order: Friday, September 11. First pizza lunch: Friday, September 18.',
      'Vendor notes from the current site (both are listed; this catalog does not pick a winner): Lunches from Leucadia Pizzeria. Pizza is from a new vendor this year: The Pizza TapRoom in La Jolla.',
      'Children’s House, Primary and Elementary students will only get cheese slices.',
      'Slices are double cut (a large that is usually 8 slices is 16, so slices are slightly smaller).',
      'No refunds for a student who missed a pizza lunch. One-time charge for the year; can be pro-rated for new students starting after the start of the year. Single-day sign-ups are not available. Ki’s lunch will be available on Fridays until September 11.',
    ],
    variants: [
      { id: '1-2', label: '1–2 cheese slices', priceCents: 18000, slices: [1, 2] },
      { id: '3-5', label: '3–5 cheese slices', priceCents: 24000, slices: [3, 4, 5] },
      { id: '6-8', label: '6–8 cheese slices', priceCents: 30000, slices: [6, 7, 8] },
    ],
    requiredFields: ['studentFirst', 'studentLast', 'room'],
    optionalNote: false,
    cheeseOnly: true,
  },
  {
    slug: 'tee-youth',
    image: 'images/products/tee-youth.jpg',
    name: 'PE/Field Trip Tee — Youth Blue',
    priceCents: 1500,
    summary: 'Youth blue PE / field trip tee.',
    details: [],
    requiredFields: [],
    optionalNote: true,
  },
  {
    slug: 'tee-adult',
    image: 'images/products/tee-youth.jpg',
    name: 'PE/Field Trip Tee — Adult Blue',
    priceCents: 1800,
    summary: 'Adult blue PE / field trip tee.',
    details: [],
    requiredFields: [],
    optionalNote: true,
  },
  {
    slug: 'paver-500',
    image: 'images/products/paver-500.jpg',
    name: 'Path of Appreciation Paver $500',
    priceCents: 50000,
    summary: '12×12 inch, 7 lines (20 characters per line). Order by March 26, 2026.',
    details: [
      '12×12 inch paver, 7 lines, 20 characters per line.',
      'Color options: Tan or Gray.',
      'Order your paver by March 26, 2026.',
    ],
    variants: [
      { id: 'tan', label: 'Tan', priceCents: 50000 },
      { id: 'gray', label: 'Gray', priceCents: 50000 },
    ],
    requiredFields: [],
    optionalNote: true,
  },
  {
    slug: 'paver-250',
    image: 'images/products/paver-500.jpg',
    name: 'Path of Appreciation Paver $250',
    priceCents: 25000,
    summary: '8×8 inch, 5 lines (20 characters per line). Order by March 26, 2026.',
    details: [
      '8×8 inch paver, 5 lines, 20 characters per line.',
      'Color options: Gray or Beige.',
      'Order your paver by March 26, 2026.',
    ],
    variants: [
      { id: 'gray', label: 'Gray', priceCents: 25000 },
      { id: 'beige', label: 'Beige', priceCents: 25000 },
    ],
    requiredFields: [],
    optionalNote: true,
  },
  {
    slug: 'paver-100',
    image: 'images/products/paver-500.jpg',
    name: 'Path of Appreciation Paver $100',
    priceCents: 10000,
    summary: '4×8 inch, 2 lines (20 characters per line). Order by March 26, 2026.',
    details: [
      '4×8 inch paver, 2 lines, 20 characters per line.',
      'Color options: Tan or Beige.',
      'Order your paver by March 26, 2026.',
    ],
    variants: [
      { id: 'tan', label: 'Tan', priceCents: 10000 },
      { id: 'beige', label: 'Beige', priceCents: 10000 },
    ],
    requiredFields: [],
    optionalNote: true,
  },
  {
    slug: 'teachers-pizza',
    image: 'images/products/teachers-pizza.png',
    name: 'TEACHERS Pizza Lunch',
    priceCents: 0,
    summary: 'Cheese only. Choice of 1–2 or 3–5 slices. No charge.',
    details: [
      'Cheese only. Choice of 1–2 slices or 3–5 cheese-only slices.',
      'Slices are double cut (a large that is usually 8 slices is 16, so slices are slightly smaller).',
      'This item is $0 and must not be charged.',
    ],
    variants: [
      { id: '1-2', label: '1–2 cheese slices', priceCents: 0, slices: [1, 2] },
      { id: '3-5', label: '3–5 cheese slices', priceCents: 0, slices: [3, 4, 5] },
    ],
    requiredFields: [],
    optionalNote: true,
    cheeseOnly: true,
  },
  {
    slug: 'halloween-wristband',
    name: 'Halloween Wristband',
    priceCents: 5000,
    summary: 'Halloween wristband, $50.',
    details: [],
    requiredFields: [],
    optionalNote: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getVariant(product: Product, variantId?: string): ProductVariant | undefined {
  if (!product.variants?.length) return undefined;
  return product.variants.find((variant) => variant.id === variantId) ?? product.variants[0];
}

export function unitAmountCents(product: Product, variantId?: string): number {
  const variant = getVariant(product, variantId);
  return variant?.priceCents ?? product.priceCents;
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export function productPriceLabel(product: Product): string {
  const amounts = product.variants?.length
    ? product.variants.map((variant) => variant.priceCents)
    : [product.priceCents];
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  if (min === 0 && max === 0) return formatCents(0);
  if (min === max) return formatCents(min);
  return `${formatCents(min)} – ${formatCents(max)}`;
}

export function lineLabel(product: Product, variantId?: string, sliceCount?: number): string {
  const variant = getVariant(product, variantId);
  if (!variant) return product.name;
  const base = `${product.name} — ${variant.label}`;
  if (sliceCount == null || !Number.isFinite(sliceCount)) return base;
  const n = Math.floor(sliceCount);
  return `${base} (${n} ${n === 1 ? 'slice' : 'slices'})`;
}
