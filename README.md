# WeQRious Landing Page

Multi-language static landing page for WeQRious — an anti-counterfeit QR code platform for brand owners.

Live site: [weqrious.com](https://weqrious.com)

## Tech Stack

- [Hugo Extended](https://gohugo.io/) (static site generator, v0.151.0+)
- Vanilla CSS (CSS custom properties, no framework)
- Vanilla JavaScript
- Google Fonts (Inter + conditional Noto Sans per CJK/Thai/Khmer locale)
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com/)

## Supported Languages (12)

| Code | Language | URL |
|------|----------|-----|
| `en` | English (default) | `/` |
| `id` | Bahasa Indonesia | `/id/` |
| `ms` | Bahasa Melayu | `/ms/` |
| `fil` | Tagalog | `/fil/` |
| `vi` | Tiếng Việt | `/vi/` |
| `zh-cn` | 简体中文 (Mainland) | `/zh-cn/` |
| `zh-hk` | 繁體中文 (Hong Kong) | `/zh-hk/` |
| `zh-tw` | 繁體中文 (Taiwan) | `/zh-tw/` |
| `ko` | 한국어 | `/ko/` |
| `ja` | 日本語 | `/ja/` |
| `km` | ភាសាខ្មែរ | `/km/` |
| `th` | ภาษาไทย | `/th/` |

Users are auto-suggested their browser language via a dismissible banner. Explicit selection (via the nav switcher) is persisted in `localStorage`.

## Project Structure

```
weqrious-landing/
├── hugo.toml                 Hugo config + languages
├── content/
│   └── _index.*.md           Per-language home page stubs
├── layouts/
│   ├── _default/
│   │   ├── baseof.html       Base HTML wrapper
│   │   ├── 404.html          Branded 404 page
│   │   └── sitemap.xml       Custom sitemap (multilang)
│   ├── index.html            Home layout
│   └── partials/             Header, nav, sections, footer, JSON-LD, hreflang, fonts
├── i18n/                     Translation files (one per language)
│   ├── en.toml               English — source of truth
│   ├── id.toml, ms.toml, ...
│   └── ...
├── static/                   Served as-is
│   ├── css/style.css
│   ├── js/main.js
│   ├── favicon.ico
│   └── images/
├── .gitignore
└── README.md
```

## Local Development

Install Hugo Extended (≥ v0.128). On Linux:
```bash
curl -sL https://github.com/gohugoio/hugo/releases/download/v0.151.0/hugo_extended_0.151.0_linux-amd64.tar.gz | tar -xz -C ~/.local/bin hugo
```

Run the dev server:
```bash
hugo server
```
Then open [http://localhost:1313](http://localhost:1313).

Production build:
```bash
hugo --minify
```
Output goes to `public/`.

## Deployment (Cloudflare Pages)

### Initial Setup

1. Push this repository to GitHub.
2. Cloudflare Dashboard → **Pages** → **Create a project** → **Connect to Git**.
3. Select the repo.
4. Configure build settings:
   - **Framework preset:** Hugo
   - **Build command:** `hugo --minify`
   - **Build output directory:** `public`
   - **Environment variables:**
     - `HUGO_VERSION` = `0.151.0`
     - `HUGO_ENV` = `production`
5. **Save and Deploy**.

### Custom Domain

Cloudflare Pages → Your project → **Custom domains** → add `weqrious.com`. DNS is auto-configured if the domain is on Cloudflare.

### Subsequent Deploys

Push to `main` — Cloudflare Pages auto-deploys. Preview deploys are created for every branch/PR.

## Editing Content

All user-facing strings live in `i18n/*.toml`, keyed identically across files. `en.toml` is the source of truth — when you add/change a string, update all language files.

Example:
```toml
[hero_title]
other = "Stop Counterfeits Before They Cost You."
```

The Hugo template references it with `{{ i18n "hero_title" }}`.

HTML snippets (e.g. with `<strong>`) are rendered via `{{ i18n "key" | safeHTML }}` in the partials.

## Assets

- `static/images/logo.png` — Brand logo (512×512)
- `static/images/logo-qr.svg` — Hero logo
- `static/images/hero-illustration.png` — Hero visual
- `static/images/dashboard-preview.png` — Product mockup
- `static/images/og-image.png` — Social preview (1200×630, generated from hero-illustration)
- `static/images/favicon-*.png`, `apple-touch-icon.png`, `favicon.ico` — Generated from `logo.png`

To regenerate favicon/og assets after replacing the logo:
```bash
python3 scripts/generate-assets.py   # if script added; otherwise use PIL inline
```

## SEO

- Each language has `<html lang>`, meta title/description/keywords, Open Graph + Twitter Card, canonical, and per-language `hreflang` alternates (including `x-default`).
- `Organization` + `WebSite` JSON-LD structured data (schema.org) in `<head>`.
- `sitemap.xml` at root is a **sitemap index**; per-language sitemaps at `/{lang}/sitemap.xml`.
- Submit `https://weqrious.com/sitemap.xml` in Google Search Console once live.

## Translation Quality Notes

- **Khmer (`km.toml`) and Thai (`th.toml`)** — initial translations are AI-generated and flagged in a file-level comment. Recommend native-speaker review before a production push to those markets.
- **Tagalog/Filipino (`fil.toml`)** — also AI-generated; Philippines market often uses Taglish (Tagalog + English) so tech terms are kept in English where natural.
- All other languages use formal business register.

## Contact

Operated by **PT. Multi Tekno Indonesia**.
Primary contact: +62 852 7000 4060 (WhatsApp).
