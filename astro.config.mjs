// @ts-check
import { defineConfig } from 'astro/config';

// Production: Wix keeps https://www.mbmapg.org/ ; Astro is mounted at /v2/
export default defineConfig({
  site: 'https://www.mbmapg.org',
  base: '/v2/',
  redirects: {
    '/': '/v2/home',
    '/our-mission': '/v2/about',
    '/copy-of-our-mission': '/v2/board',
    '/donate': '/v2/give',
    '/event-list': '/v2/events',
    '/parents-group-calendar': '/v2/calendar',
    '/event-details/welcome-back-meet-greet-2': '/v2/events/welcome-back-meet-greet',
  },
});
