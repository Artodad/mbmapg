/** Money routes served by live Wix. Prefix match, including trailing paths. */
export const MONEY_PATH_PREFIXES = [
  '/shop',
  '/donate',
  '/checkout',
  '/cart',
  '/my-account',
  '/_api',
  '/files/theme',
] as const;

export const DEFAULT_ASTRO_ORIGIN = 'https://artodad.github.io';
export const DEFAULT_ASTRO_BASE_PREFIX = '/mbmapg';
export const DEFAULT_WIX_ORIGIN = 'https://wix-origin.mbmapg.org';

export interface SplitEnv {
  ASTRO_ORIGIN?: string;
  ASTRO_BASE_PREFIX?: string;
  WIX_ORIGIN?: string;
}

export interface SplitConfig {
  astroOrigin: string;
  astroBasePrefix: string;
  wixOrigin: string;
}

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
]);

export function normalizeOrigin(raw: string, fallback: string): string {
  const value = (raw || fallback).trim();
  return value.replace(/\/+$/, '');
}

/** Empty / `/` means Astro is at the origin root (PUBLIC_BASE=/). */
export function normalizePrefix(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === '/') return '';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

export function resolveConfig(env: SplitEnv = {}): SplitConfig {
  const astroBasePrefix =
    env.ASTRO_BASE_PREFIX === undefined
      ? DEFAULT_ASTRO_BASE_PREFIX
      : normalizePrefix(env.ASTRO_BASE_PREFIX);

  return {
    astroOrigin: normalizeOrigin(env.ASTRO_ORIGIN ?? '', DEFAULT_ASTRO_ORIGIN),
    astroBasePrefix,
    wixOrigin: normalizeOrigin(env.WIX_ORIGIN ?? '', DEFAULT_WIX_ORIGIN),
  };
}

export function isMoneyPath(pathname: string): boolean {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return MONEY_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

/** Rewrite a Worker-root path onto the GH Pages project prefix when needed. */
export function rewriteAstroPath(pathname: string, prefix: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!prefix) return path;
  if (path === prefix || path.startsWith(`${prefix}/`)) return path;
  if (path === '/') return `${prefix}/`;
  return `${prefix}${path}`;
}

export function originHost(origin: string): string {
  return new URL(origin).host;
}

export function copyForwardHeaders(request: Request, host: string): Headers {
  const headers = new Headers();
  for (const [key, value] of request.headers) {
    if (HOP_BY_HOP.has(key.toLowerCase())) continue;
    headers.append(key, value);
  }
  headers.set('Host', host);
  return headers;
}

export function splitTarget(requestUrl: string | URL, env: SplitEnv = {}): URL {
  const incoming = new URL(requestUrl);
  const config = resolveConfig(env);
  const money = isMoneyPath(incoming.pathname);
  const origin = money ? config.wixOrigin : config.astroOrigin;
  const pathname = money
    ? incoming.pathname
    : rewriteAstroPath(incoming.pathname, config.astroBasePrefix);
  const target = new URL(origin);
  target.pathname = pathname;
  target.search = incoming.search;
  return target;
}
