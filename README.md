# MBMA Parents Group

Static website for the Mission Bay Montessori Academy Parents Group Foundation.

- **Current (GitHub Pages):** https://artodad.github.io/mbmapg/
- **Target:** Astro mounts at `/v2/home` on https://www.mbmapg.org once the host split exists (Wix remains at `/`)
- **Repo:** https://github.com/Artodad/mbmapg
- **Contact:** info@mbmapg.org

Built with [Astro](https://astro.build) and deployed with the official Astro GitHub Pages Action. Page bodies live in `src/content/*.md` so board members can edit copy without touching layout code.

```bash
npm install
npm run dev
npm run build
```

This repo is configured with `base: /v2/` so it can sit next to Wix at `/` after the host split. Home will be `/v2/home`. Until then, the public site is GitHub Pages; preview this branch via Vercel after a push.
