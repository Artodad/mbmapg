# MBMA Parents Group — Wix store catalog archive

Read-only historical export of the old MBMA Parents Group Wix Stores catalog (site `a8a3d656-17b3-478f-80c3-a595c84c0cea`, Catalog V1), including hidden and historical products. Nothing was created, edited, or deleted in Wix, and no Zeffy campaign was started.

This folder is an offline backup only. It is not imported by the Astro site, shop pages, or any build or deploy path.

Exported 2026-09-21 19:14:25 UTC. The catalog has **27 products** (7 visible and 20 hidden at export time).

## Contents

- `catalog.json` — full structured product list (name, price, description, SKU, options/variants, categories, image URLs, and `localImages` filenames)
- `catalog.csv` — the same fields flattened for spreadsheets
- `images-web/` — web-sized JPEG thumbnails of every product image (56 files, about 9MB total)

Full-resolution originals are not in this commit. Only these web-sized JPEGs are stored here.

`localImages` in `catalog.json` and `catalog.csv` lists the original Wix media filename (`.png` or `.jpg`). The file in `images-web/` has the same name stem and a `.jpg` extension. Example: `localImages` entry `2025-2026-mbma-yearbook.png` is `images-web/2025-2026-mbma-yearbook.jpg`.

## How to recreate a Zeffy campaign from an entry later

Open `catalog.json` (or `catalog.csv`), pick the product row you want to revive, then in Zeffy create a new fundraising/ticket form and copy across: **title** = `name`, **amount(s)** from `price` / `variants` (for multi-tier sponsorships or sizes, make one Zeffy option or ticket type per variant choice@price), **description** from `description` plus any `customTextFields` as form questions, attach the matching file(s) from `images-web/` (same stem as `localImages`, `.jpg`), and set capacity/SKU notes from `sku` and `variantSummary` if needed — do this only when Chase asks for a new Zeffy campaign; this archive is intentionally passive.
