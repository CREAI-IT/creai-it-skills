---
name: poster-generator
description: Use when creating posters, flyers, banners, social media graphics, or any single-page visual content as HTML files. Triggers on requests to make a poster, create a flyer, design a banner, build a social graphic, or generate visual content at specific aspect ratios (9:16, 4:5, 1:1, 16:9). Includes event posters, quote cards, product showcases, announcements, and infographic-style visuals.
---

# Poster Generator

Generate high-design posters as HTML/CSS files at any standard aspect ratio. Each poster is a single HTML file with responsive viewport scaling and PDF export.

## Supported Aspect Ratios

| Ratio | Canvas (px) | Orientation | Use Cases |
|-------|------------|-------------|-----------|
| 9:16 | 1080 x 1920 | Vertical | Stories, phone wallpapers, event posters, vertical banners |
| 4:5 | 1080 x 1350 | Portrait | Instagram posts, portrait flyers, book covers |
| 1:1 | 1080 x 1080 | Square | Social media posts, album covers, profile banners |
| 16:9 | 1920 x 1080 | Landscape | Desktop wallpapers, YouTube thumbnails, banners |

## Process

### Step 1: Understand the Poster

Clarify with the user:
- **Content** — what the poster is about (event, product, quote, data, etc.)
- **Aspect ratio** — which ratio from the table above (default to 9:16 if unspecified)
- **Visual tone** — dark/light, bold/minimal, playful/corporate
- **Key elements** — headline, date, location, CTA, imagery, etc.

### Step 2: Create the Poster Folder

Create a folder with a descriptive kebab-case name:
```
design-conference-poster/
product-launch-banner/
monthly-stats-card/
```

Check if a folder already exists. Only create a new one if none exists.

### Step 3: Design the Theme

Before writing any HTML, decide:
1. **Color palette** — 3 colors max: background, text, accent. Set `--accent` CSS variable.
2. **Typography** — Pick 1-2 Google Fonts via `<link>` or `@import`.
3. **Layout approach** — centered, top-aligned, spread, split, etc.

### Step 4: Read the Assets

Read the following asset files:
- `~/.claude/skills/poster-generator/assets/poster-template.html` — Base poster template
- `~/.claude/skills/poster-generator/assets/base-styles.css` — Base CSS to customize

For poster type examples and design principles, read:
- `~/.claude/skills/poster-generator/references/design-guide.md`

### Step 5: Create the Files

Generate these files in the poster folder:

**`lib/`** — Copy the bundled PDF export libraries (required):
```bash
mkdir -p <poster-folder>/lib
cp ~/.claude/skills/poster-generator/assets/html2canvas.min.js <poster-folder>/lib/
cp ~/.claude/skills/poster-generator/assets/jspdf.umd.min.js <poster-folder>/lib/
```

**`styles.css`** — Copy from `assets/base-styles.css`, then customize:
- Set `--accent` color
- Add Google Font imports
- Override fonts, colors, backgrounds
- Add poster-specific classes

**`poster.html`** — Based on `assets/poster-template.html`:
- Replace all `{{CANVAS_WIDTH}}` with the pixel width for the chosen ratio
- Replace all `{{CANVAS_HEIGHT}}` with the pixel height for the chosen ratio
- Replace `{{POSTER_TITLE}}` with the poster title
- Replace `{{POSTER_STYLES}}` with `<link rel="stylesheet" href="styles.css">` plus any custom inline styles
- Replace `{{POSTER_CONTENT}}` with the poster content HTML
- The template already includes viewport scaling, fullscreen, and PDF export

### Step 6: Open in Browser

```bash
open <poster-folder>/poster.html
```

## Output Structure

```
poster-name/
├── poster.html             # The poster (viewable in browser, PDF export)
├── styles.css              # Poster theme styles
└── lib/
    ├── html2canvas.min.js  # PDF export (bundled, no CDN)
    └── jspdf.umd.min.js   # PDF export (bundled, no CDN)
```

## Poster Design Rules

1. **One message per poster** — if you need two, make two posters
2. **Canvas dimensions must match the ratio exactly** — use the pixel values from the table
3. **High-design, distinctive** — bold typography, dramatic scale contrast, avoid generic look
4. **3-color maximum** — background + text + accent
5. **Dramatic typography scale** — headline/caption ratio of at least 5:1
6. **Generous whitespace** — 60-120px padding, don't fill every corner
7. **Adapt layout to the ratio** — vertical stacks for 9:16, centered for 1:1, horizontal for 16:9

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Wrong canvas dimensions for the ratio | Always use the exact pixel values from the table |
| Too much text on the poster | One idea, one message. Cut everything else. |
| Small headline on a large canvas | Headlines should be 80-200px for poster impact |
| Using default system fonts | Always pick Google Fonts that match the tone |
| Forgetting to copy lib/ folder | PDF export will fail without local library files |
| Same layout for all ratios | 9:16 = vertical stack, 1:1 = centered, 16:9 = horizontal |
| Forgetting to open in browser | Always `open poster.html` at the end |
