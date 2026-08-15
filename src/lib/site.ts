export const siteName = 'MBMA Parents Group';
export const contactEmail = 'info@mbmapg.org';
export const calendarPdf =
  'https://www.mbmapg.org/_files/ugd/ae91bf_19cadddd69fd4ca8a5cc7e45f07433bb.pdf';

export function media(id: string): string {
  return `https://static.wixstatic.com/media/${id}`;
}

export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, '');
  return clean ? `${base}${clean}` : base;
}

export function asset(path: string): string {
  return withBase(path.replace(/^\//, ''));
}

export const logoSrc = asset('images/logo.png');

export const navItems = [
  { href: '', label: 'Home' },
  { href: 'events', label: 'Events' },
  { href: 'volunteer', label: 'Volunteer' },
  { href: 'shop', label: 'Shop' },
  { href: 'about', label: 'About' },
  { href: 'board', label: 'Board' },
] as const;
