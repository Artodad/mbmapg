# MBMA Parents Group

Static website for the Mission Bay Montessori Academy Parents Group Foundation.

- **Live (GitHub Pages):** https://artodad.github.io/mbmapg/
- **Custom domain (after Cloudflare cutover):** https://www.mbmapg.org/
- **Repo:** https://github.com/Artodad/mbmapg
- **Contact:** info@mbmapg.org

Built with [Astro](https://astro.build) and deployed with the official Astro GitHub Pages Action. Page bodies live in `src/content/*.md` so board members can edit copy without touching layout code.

```bash
npm install
npm run dev
npm run build
```

## Dual base

The default build is a GitHub Pages **project** site (`base: /mbmapg/`). After the first green deploy, that site is at https://artodad.github.io/mbmapg/.

For Cloudflare / the custom domain at `www.mbmapg.org`, build with a root base so `/` and `/receipt` work at the domain root:

```bash
PUBLIC_BASE=/ npm run build
```

`BASE_PATH=/` is accepted as an alias for `PUBLIC_BASE=/`. That build sets `site` to `https://www.mbmapg.org` and emits root-relative `/_astro` and `/receipt` paths.

Do not use the root-base build for GitHub Pages — project Pages still needs `/mbmapg/`.

`vercel.json` keeps `/mbmapg` rewrites for the default `/mbmapg/` preview. `PUBLIC_BASE=/` builds do not need those rewrites.

Header Donate and nav Shop (and other checkout CTAs) point at the live Wix URLs `https://www.mbmapg.org/donate` and `https://www.mbmapg.org/shop`. Astro still has `/give` (PayPal) and `/shop` (catalog) in the tree.

## Cloudflare Worker (preview only)

`workers/mbmapg-split/` is a workers.dev dry-run that sends money paths to Wix and everything else to Astro (with `/mbmapg` prefix rewrite for GH Pages). See that folder's README for `npx wrangler deploy`. Do not attach `www.mbmapg.org` yet.
