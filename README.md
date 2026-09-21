# MBMA Parents Group

Static website for the Mission Bay Montessori Academy Parents Group Foundation.

- **Live (GitHub Pages):** https://artodad.github.io/mbmapg/
- **Custom domain (later, after DNS):** https://www.mbmapg.org/
- **Repo:** https://github.com/Artodad/mbmapg
- **Contact:** parentgroup@mbmapg.org

Built with [Astro](https://astro.build) and deployed with the official Astro GitHub Pages Action. Page bodies live in `src/content/*.md` so board members can edit copy without touching layout code.

```bash
npm install
npm run dev
npm run build
```

## Dual base

- **`npm run build`** — GitHub Pages project site (`base: /mbmapg/`, `site: https://artodad.github.io`). Dogfood stays at https://artodad.github.io/mbmapg/.
- **`PUBLIC_BASE=/ npm run build`** — Vercel / www root (`base: /`, `site: https://www.mbmapg.org`). `/` and `/shop` are at the site root; assets are `/_astro/...`.

`BASE_PATH=/` and `PUBLIC_BASE_PATH=/` are aliases for `PUBLIC_BASE=/`.

`vercel.json` sets `PUBLIC_BASE=/` for Vercel preview and production builds. Vercel also sets `VERCEL=1`, which this config treats as root when no base env is set. Do **not** use the root-base build for GitHub Pages — project Pages still needs `/mbmapg/`.

This repo change does not flip DNS, nameservers, or attach `www.mbmapg.org`.
