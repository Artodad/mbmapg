export const siteName = 'MBMA Parents Group';
export const contactEmail = 'info@mbmapg.org';

/** Live Wix money doors. Header/nav/primary CTAs must use these, not Astro /give or /shop. */
export const wixDonateUrl = 'https://www.mbmapg.org/donate';
export const wixShopUrl = 'https://www.mbmapg.org/shop';

export function media(id: string): string {
  return `https://static.wixstatic.com/media/${id}`;
}

export function isAbsoluteUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function withBase(path = ''): string {
  if (isAbsoluteUrl(path)) return path;
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, '');
  return clean ? `${base}${clean}` : base;
}

export function asset(path: string): string {
  return withBase(path.replace(/^\//, ''));
}

export const logoSrc = asset('images/logo.png');
export const calendarPdf = asset('files/2025-26-school-calendar.pdf');
export const calendarPdfLabel = '2025–26 school calendar (PDF)';

export const navItems = [
  { href: '', label: 'Home' },
  { href: 'events', label: 'Events' },
  { href: 'volunteer', label: 'Volunteer' },
  { href: wixShopUrl, label: 'Shop' },
  { href: 'about', label: 'About' },
  { href: 'board', label: 'Board' },
] as const;
