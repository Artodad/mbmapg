import {
  getProduct,
  getVariant,
  lineLabel,
  unitAmountCents,
  type CustomFieldId,
  type Product,
} from './products';

export const CART_STORAGE_KEY = 'mbmapg-cart';
export const CART_CHANGE_EVENT = 'mbmapg-cart-change';

export interface CartCustomFields {
  studentFirst?: string;
  studentLast?: string;
  room?: string;
  note?: string;
}

export interface CartItem {
  id: string;
  productSlug: string;
  variantId?: string;
  sliceCount?: number;
  quantity: number;
  custom?: CartCustomFields;
}

export interface Cart {
  items: CartItem[];
}

export interface AddItemInput {
  productSlug: string;
  variantId?: string;
  sliceCount?: number;
  quantity?: number;
  custom?: CartCustomFields;
}

/** localStorage key. Uses `mbmapg-cart` for this project base; suffixes other bases. */
export function getCartStorageKey(basePath: string = import.meta.env.BASE_URL): string {
  const normalized = (basePath || '/mbmapg/').replace(/\/+$/, '') || '/mbmapg';
  if (normalized === '/mbmapg' || normalized === 'mbmapg') {
    return CART_STORAGE_KEY;
  }
  return `${CART_STORAGE_KEY}:${normalized}`;
}

export function emptyCart(): Cart {
  return { items: [] };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseCustom(value: unknown): CartCustomFields | undefined {
  if (!isRecord(value)) return undefined;
  const custom: CartCustomFields = {};
  if (typeof value.studentFirst === 'string') custom.studentFirst = value.studentFirst;
  if (typeof value.studentLast === 'string') custom.studentLast = value.studentLast;
  if (typeof value.room === 'string') custom.room = value.room;
  if (typeof value.note === 'string') custom.note = value.note;
  return custom;
}

function parseSliceCount(value: unknown): number | undefined {
  const n = typeof value === 'number' ? value : typeof value === 'string' && value ? Number(value) : NaN;
  if (!Number.isFinite(n)) return undefined;
  return Math.floor(n);
}

function parseItem(value: unknown): CartItem | null {
  if (!isRecord(value) || typeof value.id !== 'string' || typeof value.productSlug !== 'string') {
    return null;
  }
  const quantity = Number(value.quantity ?? value.qty);
  if (!Number.isFinite(quantity) || quantity < 1) return null;
  const item: CartItem = {
    id: value.id,
    productSlug: value.productSlug,
    quantity: Math.floor(quantity),
  };
  if (typeof value.variantId === 'string' && value.variantId) item.variantId = value.variantId;
  const sliceCount = parseSliceCount(value.sliceCount);
  if (sliceCount != null) item.sliceCount = sliceCount;
  const custom = parseCustom(value.custom);
  if (custom) item.custom = custom;
  return item;
}

export function parseCart(raw: string | null): Cart {
  if (!raw) return emptyCart();
  try {
    const data = JSON.parse(raw) as unknown;
    if (!isRecord(data) || !Array.isArray(data.items)) return emptyCart();
    return { items: data.items.map(parseItem).filter((item): item is CartItem => item !== null) };
  } catch {
    return emptyCart();
  }
}

export function newLineId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isPersonalized(custom?: CartCustomFields): boolean {
  return Boolean(
    custom?.studentFirst?.trim() ||
      custom?.studentLast?.trim() ||
      custom?.room?.trim() ||
      custom?.note?.trim(),
  );
}

export function addItem(cart: Cart, input: AddItemInput): Cart {
  const quantity = Math.max(1, Math.floor(input.quantity ?? 1));
  const mergeable = !isPersonalized(input.custom);
  if (mergeable) {
    const existing = cart.items.find(
      (item) =>
        item.productSlug === input.productSlug &&
        (item.variantId ?? '') === (input.variantId ?? '') &&
        (item.sliceCount ?? null) === (input.sliceCount ?? null) &&
        !isPersonalized(item.custom),
    );
    if (existing) {
      return {
        items: cart.items.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      };
    }
  }
  const next: CartItem = {
    id: newLineId(),
    productSlug: input.productSlug,
    quantity,
  };
  if (input.variantId) next.variantId = input.variantId;
  if (input.sliceCount != null) next.sliceCount = input.sliceCount;
  if (input.custom) next.custom = { ...input.custom };
  return { items: [...cart.items, next] };
}

export function removeItem(cart: Cart, id: string): Cart {
  return { items: cart.items.filter((item) => item.id !== id) };
}

export function updateQty(cart: Cart, id: string, quantity: number): Cart {
  const nextQty = Math.floor(quantity);
  if (nextQty < 1) return removeItem(cart, id);
  return {
    items: cart.items.map((item) => (item.id === id ? { ...item, quantity: nextQty } : item)),
  };
}

export function updateItemCustom(cart: Cart, id: string, custom: CartCustomFields): Cart {
  return {
    items: cart.items.map((item) =>
      item.id === id ? { ...item, custom: { ...item.custom, ...custom } } : item,
    ),
  };
}

export function cartItemCount(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function lineTotalCents(item: CartItem, product?: Product): number {
  const resolved = product ?? getProduct(item.productSlug);
  if (!resolved) return 0;
  return unitAmountCents(resolved, item.variantId) * item.quantity;
}

export function cartTotalCents(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + lineTotalCents(item), 0);
}

export function requiresPizzaFields(product: Product): boolean {
  return product.requiredFields.includes('studentFirst');
}

export function sliceCountError(slices: number[]): string {
  if (slices.length === 0) return 'Choose an exact slice count';
  if (slices.length === 1) return `Choose ${slices[0]} slices`;
  if (slices.length === 2) return `Choose ${slices[0]} or ${slices[1]} slices`;
  const head = slices.slice(0, -1).join(', ');
  return `Choose ${head}, or ${slices[slices.length - 1]} slices`;
}

export function validateSliceCount(item: CartItem, product?: Product): string[] {
  const resolved = product ?? getProduct(item.productSlug);
  if (!resolved) return [];
  const slices = getVariant(resolved, item.variantId)?.slices;
  if (!slices?.length) return [];
  if (item.sliceCount == null || !slices.includes(item.sliceCount)) {
    return [sliceCountError(slices)];
  }
  return [];
}

export function validatePizzaFields(item: CartItem, product?: Product): string[] {
  const resolved = product ?? getProduct(item.productSlug);
  if (!resolved || !requiresPizzaFields(resolved)) return [];
  const errors: string[] = [];
  const first = item.custom?.studentFirst?.trim() ?? '';
  const last = item.custom?.studentLast?.trim() ?? '';
  const room = item.custom?.room?.trim() ?? '';
  if (!first) errors.push('Student first name is required');
  if (!last) errors.push('Student last name is required');
  if (!room) errors.push('Room is required');
  return errors;
}

export function validateCart(cart: Cart): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  for (const item of cart.items) {
    const product = getProduct(item.productSlug);
    if (!product) {
      errors.push(`Unknown product: ${item.productSlug}`);
      continue;
    }
    const fieldErrors = [...validateSliceCount(item, product), ...validatePizzaFields(item, product)];
    if (fieldErrors.length) {
      errors.push(`${lineLabel(product, item.variantId, item.sliceCount)}: ${fieldErrors.join('; ')}`);
    }
  }
  return { ok: errors.length === 0, errors };
}

export function cartHasPizza(cart: Cart): boolean {
  return cart.items.some((item) => getProduct(item.productSlug)?.slug === 'pizza-lunch');
}

export function cartIsTeachersOnlyFree(cart: Cart): boolean {
  if (cart.items.length === 0) return false;
  return cart.items.every((item) => {
    const product = getProduct(item.productSlug);
    return product?.slug === 'teachers-pizza' && unitAmountCents(product, item.variantId) === 0;
  });
}

export function cartChargeableCents(cart: Cart): number {
  return cart.items.reduce((sum, item) => {
    const product = getProduct(item.productSlug);
    if (!product) return sum;
    const unit = unitAmountCents(product, item.variantId);
    return unit > 0 ? sum + unit * item.quantity : sum;
  }, 0);
}

export function loadCart(): Cart {
  if (typeof localStorage === 'undefined') return emptyCart();
  return parseCart(localStorage.getItem(getCartStorageKey()));
}

export function saveCart(cart: Cart): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(getCartStorageKey(), JSON.stringify(cart));
  emitCartChange();
}

export function emitCartChange(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CART_CHANGE_EVENT));
}

export function loadAndMutate(mutator: (cart: Cart) => Cart): Cart {
  const next = mutator(loadCart());
  saveCart(next);
  return next;
}

export const PIZZA_FIELD_LABELS: Record<Exclude<CustomFieldId, 'note'>, string> = {
  studentFirst: 'Student first name',
  studentLast: 'Student last name',
  room: 'Room #',
};

