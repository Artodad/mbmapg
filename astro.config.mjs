// @ts-check
import { defineConfig } from 'astro/config';

// Default: GitHub Pages project site (https://artodad.github.io/mbmapg/).
// Custom-domain / Cloudflare: PUBLIC_BASE=/ (or BASE_PATH=/) → base `/` and
// site https://www.mbmapg.org so / and /receipt work at the domain root.
// vercel.json /mbmapg rewrites stay for the default /mbmapg/ preview;
// PUBLIC_BASE=/ builds do not need those rewrites.
const rawBase = process.env.PUBLIC_BASE ?? process.env.BASE_PATH ?? '/mbmapg/';
const isRoot = rawBase === '/' || rawBase === '';
const base = isRoot ? '/' : '/mbmapg/';
const site = isRoot ? 'https://www.mbmapg.org' : 'https://artodad.github.io';

/** Internal redirect target that matches the active Astro base. */
function dest(path) {
  const clean = String(path).replace(/^\//, '');
  return `${base}${clean}`;
}

export default defineConfig({
  site,
  base,
  redirects: {
    '/our-mission': dest('about'),
    '/copy-of-our-mission': dest('board'),
    '/donate': dest('give'),
    '/event-list': dest('events'),
    '/parents-group-calendar': dest('calendar'),
    '/event-details/welcome-back-meet-greet-2': dest('events/welcome-back-meet-greet'),
  },
});
