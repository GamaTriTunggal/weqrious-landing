# WeQRious Landing Page

Static landing page for WeQRious - Anti-counterfeit QR code solution for brand owners.

## Tech Stack

- Plain HTML5
- CSS3 (with CSS Custom Properties)
- Vanilla JavaScript
- Google Fonts (Inter)

## Project Structure

```
weqrious-landing/
├── index.html          # Main landing page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Smooth scroll & animations
├── images/
│   └── logo.png        # WeQRious logo
├── .gitignore
└── README.md
```

## Local Development

1. Open the project in WebStorm (or any IDE)
2. Right-click `index.html` → Open in Browser
3. Or use WebStorm's built-in Live Preview

No build step required - it's pure HTML/CSS/JS.

## Deployment to Cloudflare Pages

### Initial Setup

1. Push this repository to GitHub/GitLab

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages

3. Click "Create a project" → "Connect to Git"

4. Select your repository

5. Configure build settings:
   - **Build command:** (leave empty)
   - **Build output directory:** `/` or `.`

6. Click "Save and Deploy"

### Custom Domain

1. In Cloudflare Pages → Your project → Custom domains

2. Add domain: `weqrious.com`

3. Cloudflare will auto-configure DNS if domain is on Cloudflare

### Subsequent Deploys

Just push to `main` branch - Cloudflare Pages auto-deploys.

## Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --color-primary: #00a8e8;
    --color-primary-dark: #0077b6;
    /* ... */
}
```

### Content

Edit sections directly in `index.html`.

### Images

Replace files in `images/` folder:
- `logo.png` - Main logo (recommended: 200x200px PNG)
- Add screenshots when available

## Contact

- David Sutanto: +62 823 1087 2828
- Andrew Wijaya: +62 852 7000 4060

---

A product of PT. Multi Tekno Indonesia
