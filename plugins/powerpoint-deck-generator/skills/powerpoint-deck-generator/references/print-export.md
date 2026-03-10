# Print & Export Compatibility

> **When to read**: Before any PDF export — browser print or Playwright. Contains critical CSS/JS fixes for Chrome print rendering bugs.

---

## The `backdrop-filter` Problem

Chrome's print rendering engine (`window.print()`) **completely hides any element with `backdrop-filter`** — not just the blur effect, but the entire element AND all its children. This means "glass card" patterns (semi-transparent background + blur) will be invisible in browser-printed PDFs.

### How the Viewer Handles This

The viewer template (`viewer-template.html`) includes two automatic fixes:

1. **`@media print` CSS**: Globally disables `backdrop-filter` on all elements via `*, *::before, *::after { backdrop-filter: none !important; }`
2. **`exportPDF()` JS**: Before calling `window.print()`, scans all elements for computed `backdropFilter` values and temporarily replaces semi-transparent `rgba()` backgrounds with solid `#141420` (a dark surface color that blends naturally with dark slide themes).

### Design Implications

- You **can** freely use `backdrop-filter: blur()` for glass effects — the print fix handles it automatically
- Glass cards on dark slides need **sufficient border contrast** (not just the blur) so they're visible even without the blur effect
- The JS fix replaces semi-transparent backgrounds with `#141420`. If your deck uses a **light theme**, customize this fallback color in the viewer's `exportPDF()` function
- The Playwright-based `export_pdf.py` uses real Chromium rendering and does NOT have this bug — it always produces pixel-perfect output

---

## Flex Centering Breaks in Print

Chrome's print engine can misalign text that relies solely on flex `justify-content: center` for centering inside containers. This is especially visible on large hero numbers inside colored bars or boxes.

**Rule**: Never rely on flex centering alone for text inside visual containers. Always add explicit `text-align: center` as a failsafe:

```css
/* WRONG — flex-only centering, unreliable in print */
.bar-visual {
    display: flex;
    align-items: center;
    justify-content: center;
}
.bar-percent { /* inherits inline display, no text-align */ }

/* RIGHT — flex + explicit text centering fallback */
.bar-visual {
    display: flex;
    align-items: center;
    justify-content: center;
}
.bar-percent {
    display: block;
    width: 100%;
    text-align: center;
}
```

---

## Export Methods

### 1. Playwright Script (pixel-perfect, recommended)

`export_pdf.py` opens the **viewer (index.html)** in headless Chromium — the exact same page the user sees. It navigates through each slide using the viewer's own `showSlide()` function, screenshots at 2x resolution (3840×2160), and combines into a PDF.

```bash
# Requires: pip install playwright Pillow && playwright install chromium
python3 export_pdf.py                    # Export all slides (auto-starts server)
python3 export_pdf.py --output deck.pdf  # Custom output filename
python3 export_pdf.py --port 8731        # Custom port
python3 export_pdf.py --no-server        # Expects a running server
```

**No CSS restrictions.** Playwright uses real Chromium rendering. Use any CSS freely: `backdrop-filter`, `radial-gradient()`, CSS variables, `mix-blend-mode`, complex `clip-path`, etc.

### 2. Browser Print (quick export)

The viewer's `P` key triggers `window.print()` with `@media print` CSS. The viewer template includes the automatic `backdrop-filter` and flex centering fixes described above.

---

## BANNED CSS Properties (non-negotiable)

<CRITICAL>
These CSS properties create rectangular "drag mark" / "selection highlight" artifacts in Playwright PDF exports. They look correct in the browser but produce visible boxes, glows, and highlight rectangles in the exported PDF. This has been confirmed across multiple slides and is a fundamental Chromium screenshot compositing issue.

**DO NOT USE THESE PROPERTIES ANYWHERE IN ANY SLIDE. ZERO EXCEPTIONS.**
</CRITICAL>

### 1. `text-shadow` — BANNED

Any `text-shadow` with blur ≥ 2px creates a visible rectangular highlight box behind text in Playwright screenshots. It looks like the text was selected/dragged.

```css
/* BANNED — creates rectangular highlight artifact in PDF */
.hero-number { text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.label { text-shadow: 0 0 12px rgba(129,140,248,0.4); }

/* ALLOWED — zero blur, crisp offset only */
.text { text-shadow: 1px 1px 0 rgba(0,0,0,0.5); }
```

**Rule: Never use `text-shadow` with blur > 0px.**

### 2. `box-shadow` with blur on decorative/small elements — BANNED

`box-shadow` with blur on small elements (dots, circles, nodes, badges) creates rectangular glow artifacts that look like selection highlights in PDF export. The smaller the element, the worse the artifact.

```css
/* BANNED — creates highlight rectangle around small dot */
.bullet::before { box-shadow: 0 0 6px rgba(129,140,248,0.5); }
.node-circle { box-shadow: 0 0 24px rgba(129,140,248,0.15); }
.highlight-node { box-shadow: 0 0 32px rgba(129,140,248,0.3); }

/* ALLOWED — box-shadow on large containers (cards, panels) is fine */
.slide { box-shadow: 0 20px 80px rgba(0,0,0,0.6); }
.card { box-shadow: 0 4px 24px rgba(0,0,0,0.2); }
```

**Rule: Never use `box-shadow` with blur on elements smaller than 100px. For glowing effects on nodes/dots/badges, use a brighter `border` or `background` color instead.**

### 3. `backdrop-filter` in slide CSS — AVOID

While the viewer auto-fixes `backdrop-filter` for browser print, including it in slide-specific `<style>` blocks can cause subtle rendering differences between browser and Playwright export.

**Rule: Use solid `background` colors with low alpha (`rgba(14,14,20,0.6)`) instead. The visual difference is negligible on dark themes, and it exports cleanly every time.**

### Alternatives for visual depth

Instead of banned properties, use these export-safe alternatives:

| Desired Effect | Banned Approach | Export-Safe Alternative |
|---|---|---|
| Glowing text | `text-shadow: 0 0 Xpx` | Brighter `color` value or accent color |
| Glowing dot/node | `box-shadow: 0 0 Xpx` | Brighter `border` + slightly lighter `background` |
| Elevated card | `box-shadow: 0 0 30px` on small el | `border: 1px solid rgba(accent, 0.25)` + lighter bg |
| Glass blur | `backdrop-filter: blur(12px)` | `background: rgba(14,14,20,0.6)` (solid-ish) |
| Text prominence | `text-shadow` glow | `font-weight: 700` + accent `color` |

---

## Print-Safe CSS Checklist

| Pattern | Print-Safe? | Fix if not |
|---------|------------|------------|
| `text-shadow` (any blur > 0) | **BANNED** | Remove entirely. Use brighter color/weight instead. |
| `box-shadow` with blur on elements < 100px | **BANNED** | Remove. Use border/background color for glow effect. |
| `backdrop-filter: blur()` | Auto-fixed by viewer | Prefer solid `rgba()` background in slide CSS. |
| Semi-transparent `rgba()` backgrounds | Auto-fixed by `exportPDF()` JS | No action needed |
| Flex `justify-content: center` for text | Unreliable | Add `text-align: center; display: block; width: 100%` on text element |
| CSS Grid layouts | Safe | — |
| `position: absolute` elements | Safe | — |
| CSS `transform` | Disabled in `@media print` for `.slide-container` | — |
| Decorative grid lines (via `background-image`) | May render as artifacts | Add `.grid-lines { display: none !important; }` in `@media print` |
