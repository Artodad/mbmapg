# mbmapg-split (preview only)

Cloudflare Worker that path-splits **money routes to Wix** and **everything else to Astro**. This is a workers.dev dry-run. Do **not** attach `www.mbmapg.org` (or any custom domain / route) in wrangler.toml or the dashboard.

## Deploy to workers.dev only

```bash
cd workers/mbmapg-split
npx wrangler deploy
```

That publishes `https://mbmapg-split.<your-account>.workers.dev`. Use `npx wrangler dev` for local proxying. Do not add a route for www.

## Env

| Var | Default | Role |
| --- | --- | --- |
| `ASTRO_ORIGIN` | `https://artodad.github.io` | Astro / GH Pages (or a future CF Pages URL) |
| `ASTRO_BASE_PREFIX` | `/mbmapg` | Prepended to non-money paths. Set to `""` when Astro is already at `/` (`PUBLIC_BASE=/`) |
| `WIX_ORIGIN` | `https://wix-origin.mbmapg.org` | Wix money origin. DNS-only hostname Chase will add later — not live yet |

Set vars in `wrangler.toml` `[vars]`, the dashboard, or `wrangler secret put` for overrides. Copy `.dev.vars.example` to `.dev.vars` for local secrets/overrides.

### Astro modes

1. **GH Pages project site (default):** `ASTRO_ORIGIN=https://artodad.github.io` and `ASTRO_BASE_PREFIX=/mbmapg`. Request `/receipt` fetches `https://artodad.github.io/mbmapg/receipt`.
2. **Astro at origin root:** `ASTRO_BASE_PREFIX=""`. Request `/receipt` fetches `${ASTRO_ORIGIN}/receipt`.

`WIX_ORIGIN` stays off www. Until `wix-origin.mbmapg.org` exists, a local dry-run can point `WIX_ORIGIN` at a known Wix URL in wrangler comments / `.dev.vars` — never `https://www.mbmapg.org`.

## Path split

**Wix** (prefix match, including trailing paths): `/shop`, `/donate`, `/checkout`, `/cart`, `/my-account`, `/_api`, `/files/theme`.

**Astro:** everything else, with `ASTRO_BASE_PREFIX` rewritten when set.

The Worker forwards method, body, and relevant headers, and sets `Host` to the origin host (not the workers.dev host).

```bash
node --experimental-strip-types --test src/split.test.ts
```
