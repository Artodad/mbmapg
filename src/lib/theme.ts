export type SiteTheme = 'default' | 'halloween';

export const THEME_STORAGE_KEY = 'mbmapg-theme';
export const THEME_QUERY = 'theme';

function normalize(value: string | null | undefined): string {
  return (value ?? '').trim().toLowerCase();
}

/** Query, env, or session values that force the Halloween skin. */
export function isForcedHalloween(value: string | null | undefined): boolean {
  const v = normalize(value);
  return v === 'halloween' || v === '1' || v === 'true' || v === 'on';
}

/** Values that force the default skin (useful in October for QA). */
export function isForcedOff(value: string | null | undefined): boolean {
  const v = normalize(value);
  return v === 'off' || v === 'default' || v === 'none' || v === '0' || v === 'false';
}

export function pacificMonth(now = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'numeric',
  }).formatToParts(now);
  return Number(parts.find((part) => part.type === 'month')?.value);
}

export function isOctoberPacific(now = new Date()): boolean {
  return pacificMonth(now) === 10;
}

/**
 * Resolve the seasonal site theme.
 *
 * Priority: `?theme=` query → session store → `PUBLIC_THEME` env → October
 * in America/Los_Angeles.
 */
export function resolveSiteTheme(options: {
  queryTheme?: string | null;
  envTheme?: string | null;
  storedTheme?: string | null;
  now?: Date;
} = {}): SiteTheme {
  const { queryTheme, envTheme, storedTheme, now = new Date() } = options;
  if (isForcedHalloween(queryTheme)) return 'halloween';
  if (isForcedOff(queryTheme)) return 'default';
  if (isForcedHalloween(storedTheme)) return 'halloween';
  if (isForcedOff(storedTheme)) return 'default';
  if (isForcedHalloween(envTheme)) return 'halloween';
  return isOctoberPacific(now) ? 'halloween' : 'default';
}
