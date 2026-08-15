// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://artodad.github.io/mbmapg/
export default defineConfig({
  site: 'https://artodad.github.io',
  base: '/mbmapg/',
  redirects: {
    '/our-mission': '/mbmapg/about',
    '/copy-of-our-mission': '/mbmapg/board',
    '/donate': '/mbmapg/give',
    '/event-list': '/mbmapg/events',
    '/parents-group-calendar': '/mbmapg/calendar',
    '/event-details/welcome-back-meet-greet-2': '/mbmapg/events/welcome-back-meet-greet',
  },
});
